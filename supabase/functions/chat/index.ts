import { convertToModelMessages, streamText, stepCountIs, tool, type UIMessage } from "npm:ai";
import { createOpenAI } from "npm:@ai-sdk/openai";
import { z } from "npm:zod";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayResponseHeaders,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "../_shared/ai-gateway.ts";
import { SYSTEM_PROMPT } from "./system-prompt.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const CREDIT_FALLBACK_MESSAGE =
  "CREDITS_EXHAUSTED: Sorry, community credits have run out for today. Please try the ChatGPT version of College Degree GPT while credits refresh.";

const getErrorStatus = (error: unknown) => {
  if (!error || typeof error !== "object") return undefined;
  const err = error as Record<string, unknown>;
  const status = err.status ?? err.statusCode ?? err.code;
  return typeof status === "number" ? status : undefined;
};

const getErrorText = (error: unknown) => {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error);
  } catch {
    return "";
  }
};

const isCreditOrLimitError = (status: number | undefined, text: string) => {
  const normalized = text.toLowerCase();
  return (
    status === 402 ||
    ((status === 403 || status === 429) &&
      /(credit|credits|balance|limit|quota|billing|spending cap|insufficient)/.test(normalized))
  );
};

const safeGatewayErrorMessage = (error: unknown) => {
  const status = getErrorStatus(error);
  const text = getErrorText(error);
  if (isCreditOrLimitError(status, text)) return CREDIT_FALLBACK_MESSAGE;
  if (status === 429) return "Lovable AI is receiving too many requests right now. Please wait a moment and try again.";
  if (status && status >= 500) return "Lovable AI is temporarily unavailable. Please try again shortly.";
  return text || "The AI lesson could not finish. Please try again.";
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const rawMessages: UIMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    // Base64 lesson images and long transcripts blow past the model's context window.
    // Strip image payloads out of history and keep only the most recent turns.
    const MAX_HISTORY_MESSAGES = 24;
    const MAX_TEXT_CHARS = 6000;

    const sanitize = (msg: any) => {
      const parts = Array.isArray(msg?.parts) ? msg.parts : [];
      const cleaned = parts
        .map((part: any) => {
          if (part?.type === "text" && typeof part.text === "string") {
            return part.text.length > MAX_TEXT_CHARS
              ? { ...part, text: `${part.text.slice(0, MAX_TEXT_CHARS)}\n\n[…earlier lesson text trimmed…]` }
              : part;
          }
          if (typeof part?.type === "string" && part.type.startsWith("tool-")) {
            const output = part.output ?? part.result;
            if (output && typeof output === "object" && (output as any).dataUrl) {
              return {
                ...part,
                output: { generated: true, prompt: String((output as any).prompt ?? "").slice(0, 300) },
                result: undefined,
              };
            }
            return part;
          }
          if (part?.type === "reasoning") return null;
          return part;
        })
        .filter(Boolean);
      return { ...msg, parts: cleaned.length ? cleaned : [{ type: "text", text: "" }] };
    };

    const trimmed = rawMessages.slice(-MAX_HISTORY_MESSAGES);
    const messages: UIMessage[] = trimmed.map(sanitize) as UIMessage[];

    const initialRunId = getLovableAiGatewayRunId(req);
    const runIdFetch = createLovableAiGatewayRunIdFetch(initialRunId);
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: {
        "Lovable-API-Key": apiKey,
        "X-Lovable-AIG-SDK": "vercel-ai-sdk",
      },
      fetch: runIdFetch.fetch,
    });
    const model = lovable.responses("openai/gpt-6-astra");

    const modelMessages = await convertToModelMessages(messages);

    const generateImage = tool({
      description:
        "Generate an educational image (DALL-E style) that visually sums up the current lesson segment. Use this after teaching each lesson segment, and for course cover images. Returns an image the user will see inline.",
      inputSchema: z.object({
        prompt: z.string().describe("Detailed visual description of the image to generate. No text in the image."),
      }),
      execute: async ({ prompt }) => {
        try {
          const res = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              model: "openai/gpt-image-2.5-sunburst",
              prompt: `${prompt}\n\nVisual style: magical, inspiring, clear educational illustration. Include a small non-readable College Degree GPT / AI Web Tools logo mark in one corner. No readable text in the image.`,
              size: "1024x1024",
              n: 1,
            }),
          });
          if (!res.ok) {
            const txt = await res.text();
            console.error("image gen failed", res.status, txt);
            if (isCreditOrLimitError(res.status, txt)) return { error: CREDIT_FALLBACK_MESSAGE };
            return { error: `Image generation failed (${res.status})` };
          }
          const data = await res.json();
          const image = data?.data?.[0];
          const b64 = image?.b64_json;
          const url = image?.url;
          if (b64) return { dataUrl: `data:image/png;base64,${b64}`, prompt };
          if (url) return { dataUrl: url, prompt };
          return { error: "No image returned" };
        } catch (e) {
          console.error("image gen exception", e);
          return { error: e instanceof Error ? e.message : String(e) };
        }
      },
    });

    const result = streamText({
      model,
      system: SYSTEM_PROMPT +
        "\n\nIMAGE TOOL: When your instructions call for a DALL-E image (course cover, end-of-segment recap image, degree completion cert), call the tool `generate_image` with a vivid descriptive prompt. Do not describe the image in text — actually call the tool so the user sees it. YOUTUBE LINKS: When sharing YouTube resources, ALWAYS include them as full clickable markdown links like [Title](https://youtube.com/watch?v=...) so the user can click them.",
      messages: modelMessages,
      tools: { generate_image: generateImage },
      stopWhen: stepCountIs(20),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "medium",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const response = result.toUIMessageStreamResponse({
      sendReasoning: true,
      headers: getLovableAiGatewayResponseHeaders(undefined, {
        ...corsHeaders,
        ...(initialRunId ? { "X-Lovable-AIG-Run-ID": initialRunId } : {}),
      }),
      onError: safeGatewayErrorMessage,
    });

    return withLovableAiGatewayRunIdHeader(response, runIdFetch, corsHeaders);
  } catch (err) {
    console.error("chat error", err);
    const msg = safeGatewayErrorMessage(err);
    const status = msg.startsWith("CREDITS_EXHAUSTED") ? 402 : 500;
    return new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
