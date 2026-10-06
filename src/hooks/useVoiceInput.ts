import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type State = "idle" | "recording" | "transcribing";

/** Records the user's voice and turns it into text via the stt function. */
export function useVoiceInput(onText: (text: string) => void) {
  const [state, setState] = useState<State>("idle");
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  const cleanup = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  useEffect(() => () => { recRef.current?.state === "recording" && recRef.current.stop(); cleanup(); }, []);

  const transcribe = async (blob: Blob) => {
    setState("transcribing");
    try {
      const ext = blob.type.includes("mp4") ? "m4a" : blob.type.includes("ogg") ? "ogg" : "webm";
      const audioType = blob.type.startsWith("audio/") ? blob.type.split(";")[0] : `audio/${ext === "m4a" ? "mp4" : ext}`;
      const form = new FormData();
      form.append("file", new File([blob], `voice.${ext}`, { type: audioType }));
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stt`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: form,
      });
      if (!res.ok || !res.body) {
        const t = await res.text();
        let msg = t;
        try { msg = JSON.parse(t)?.error?.message ?? JSON.parse(t)?.error ?? t; } catch { /* keep */ }
        throw new Error(res.status === 402 ? "Sorry, community credits have run out for today." : msg || `Voice failed (${res.status})`);
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let text = "";
      let final: string | null = null;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          const l = line.trim();
          if (!l.startsWith("data:")) continue;
          const data = l.slice(5).trim();
          if (!data || data === "[DONE]") continue;
          try {
            const ev = JSON.parse(data);
            if (ev.type === "transcript.text.delta" && ev.delta) text += ev.delta;
            else if (ev.type === "transcript.text.done") final = ev.text ?? text;
            else if (ev.type === "error" || ev.error) throw new Error(ev.error?.message ?? "Transcription failed");
          } catch (e) {
            if (e instanceof Error && e.message !== "Unexpected end of JSON input" && !(e instanceof SyntaxError)) throw e;
          }
        }
      }
      const out = (final ?? text).trim();
      if (!out) toast.error("Didn't catch that — try speaking again.");
      else onText(out);
    } catch (e) {
      console.error("voice error", e);
      toast.error(e instanceof Error ? e.message : "Voice input failed");
    } finally {
      setState("idle");
    }
  };

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      toast.error("Voice input isn't supported in this browser. Try Chrome or Safari.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mime = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg"].find((m) => MediaRecorder.isTypeSupported?.(m));
      const rec = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        cleanup();
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || mime || "audio/webm" });
        if (blob.size < 1000) { setState("idle"); toast.error("Recording too short — hold on a bit longer."); return; }
        void transcribe(blob);
      };
      recRef.current = rec;
      rec.start();
      setState("recording");
    } catch {
      cleanup();
      toast.error("Microphone access was blocked. Allow the mic to talk to your professor.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stop = useCallback(() => {
    if (recRef.current?.state === "recording") recRef.current.stop();
  }, []);

  return { state, start, stop, toggle: () => (state === "recording" ? stop() : state === "idle" ? void start() : undefined) };
}
