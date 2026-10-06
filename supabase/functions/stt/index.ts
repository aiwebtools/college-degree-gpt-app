const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const MAX_BYTES = 20 * 1024 * 1024;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "Missing LOVABLE_API_KEY" }, 500);

    const declared = Number(req.headers.get("content-length") ?? 0);
    if (declared > MAX_BYTES) return json({ error: "Recording is too long. Please keep it under a few minutes." }, 413);

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !file.size) return json({ error: "No audio received" }, 400);
    if (file.size > MAX_BYTES) return json({ error: "Recording is too long." }, 413);

    const type = file.type.startsWith("audio/") ? file.type : "audio/webm";
    const audio = new File([await file.arrayBuffer()], file.name || "voice.webm", { type });

    const upstream = new FormData();
    upstream.append("model", "openai/gpt-transcribe");
    upstream.append("file", audio, audio.name);
    upstream.append("response_format", "json");
    upstream.append("stream", "true");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
      method: "POST",
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "fetch" },
      body: upstream,
      signal: req.signal,
    });

    return new Response(res.body, {
      status: res.status,
      headers: {
        ...corsHeaders,
        "Content-Type": res.headers.get("content-type") ?? "text/event-stream",
      },
    });
  } catch (err) {
    if (req.signal.aborted) return new Response(null, { status: 499, headers: corsHeaders });
    console.error("stt error", err);
    return json({ error: err instanceof Error ? err.message : String(err) }, 500);
  }
});
