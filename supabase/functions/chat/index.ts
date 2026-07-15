import { convertToModelMessages, streamText, stepCountIs, tool, type UIMessage } from "npm:ai";
import { z } from "npm:zod";
import { createLovableAiGatewayProvider } from "../_shared/ai-gateway.ts";
import { SYSTEM_PROMPT } from "./system-prompt.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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
    const messages: UIMessage[] = Array.isArray(body?.messages) ? body.messages : [];

    const gateway = createLovableAiGatewayProvider(apiKey);
    const model = gateway("google/gemini-3-flash-preview");

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
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: "openai/gpt-image-2",
              prompt,
              size: "1024x1024",
              quality: "low",
              n: 1,
            }),
          });
          if (!res.ok) {
            const txt = await res.text();
            console.error("image gen failed", res.status, txt);
            return { error: `Image generation failed (${res.status})` };
          }
          const data = await res.json();
          const b64 = data?.data?.[0]?.b64_json;
          if (!b64) return { error: "No image returned" };
          return { dataUrl: `data:image/png;base64,${b64}`, prompt };
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
    });

    return result.toUIMessageStreamResponse({ headers: corsHeaders });
  } catch (err) {
    console.error("chat error", err);
    const msg = err instanceof Error ? err.message : String(err);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
