import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import PageMeta from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  GraduationCap,
  Plus,
  LogOut,
  Trash2,
  Send,
  Loader2,
  ArrowLeft,
  Menu,
  X,
  Play,
  Pause,
  Sparkles,
  ArrowDown,
  Copy,
  Check,
  Square,
  ExternalLink,
  Download,
  Printer,
  FileText,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { createTimePortalEffect } from "@/utils/timeEffects";

type Thread = { id: string; title: string; updated_at: string };

const CHATGPT_VERSION_URL = "https://chatgpt.com/g/g-zF3j9G3Wd-college-degree-gpt";

const CREDIT_FALLBACK_COPY =
  "Sorry, community credits have run out for today. Please try the ChatGPT version of College Degree GPT while credits refresh.";

const isCreditFallbackError = (message: string) => {
  const normalized = message.toLowerCase();
  return normalized.includes("credits_exhausted") || (
    normalized.includes("credit") &&
    /(run out|insufficient|limit|quota|billing|balance|spending cap)/.test(normalized)
  );
};

const stripCreditPrefix = (message: string) =>
  message.replace(/^credits_exhausted:\s*/i, "").trim();

export default function Chat() {
  const { threadId } = useParams<{ threadId?: string }>();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [initialMessages, setInitialMessages] = useState<UIMessage[] | null>(null);
  const [loadingThread, setLoadingThread] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- Auth gate ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/auth", { replace: true });
      else setSession(data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate("/auth", { replace: true });
      else setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  // Lock body scroll so the chat owns the viewport on mobile
  useEffect(() => {
    const prev = document.body.style.overscrollBehavior;
    document.body.style.overscrollBehavior = "none";
    return () => {
      document.body.style.overscrollBehavior = prev;
    };
  }, []);

  // Close the drawer when returning to desktop widths
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const onChange = () => mql.matches && setSidebarOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // --- Thread list ---
  const loadThreads = async (): Promise<Thread[]> => {
    const { data, error } = await supabase
      .from("threads")
      .select("id,title,updated_at")
      .order("updated_at", { ascending: false });
    if (error) {
      toast.error(error.message);
      return [];
    }
    setThreads(data ?? []);
    return data ?? [];
  };

  useEffect(() => {
    if (!session) return;
    loadThreads().then((list) => {
      if (!threadId) {
        if (list && list.length > 0) navigate(`/chat/${list[0].id}`, { replace: true });
        else void createThread();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const createThread = async () => {
    if (!session) return;
    const { data, error } = await supabase
      .from("threads")
      .insert({ user_id: session.user.id, title: "New conversation" })
      .select("id,title,updated_at")
      .single();
    if (error) return toast.error(error.message);
    setThreads((prev) => [data, ...prev]);
    navigate(`/chat/${data.id}`);
  };

  const deleteThread = async (id: string) => {
    const { error } = await supabase.from("threads").delete().eq("id", id);
    if (error) return toast.error(error.message);
    const remaining = threads.filter((t) => t.id !== id);
    setThreads(remaining);
    if (threadId === id) {
      if (remaining.length > 0) navigate(`/chat/${remaining[0].id}`, { replace: true });
      else void createThread();
    }
  };

  // --- Load messages for active thread ---
  useEffect(() => {
    if (!threadId || !session) return;
    setLoadingThread(true);
    setInitialMessages(null);
    (async () => {
      // Page through all rows so very long classes are never cut off
      const PAGE = 1000;
      const all: { id: string; role: string; parts: unknown }[] = [];
      let error: { message: string } | null = null;
      for (let from = 0; ; from += PAGE) {
        const res = await supabase
          .from("messages")
          .select("id,role,parts,created_at")
          .eq("thread_id", threadId)
          .order("created_at", { ascending: true })
          .range(from, from + PAGE - 1);
        if (res.error) { error = res.error; break; }
        all.push(...(res.data ?? []));
        if (!res.data || res.data.length < PAGE) break;
      }
      if (error) {
        toast.error(error.message);
        setInitialMessages([]);
      } else {
        setInitialMessages(
          all.map((m) => ({
            id: m.id,
            role: m.role as UIMessage["role"],
            parts: (m.parts as UIMessage["parts"]) ?? [],
          })),
        );
      }
      setLoadingThread(false);
    })();
  }, [threadId, session]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/", { replace: true });
  };

  const selectThread = (id: string) => {
    setSidebarOpen(false);
    navigate(`/chat/${id}`);
  };

  return (
    <div className="h-[100dvh] flex bg-background text-foreground overflow-hidden">
      <PageMeta
        title="Free AI Class Chat — Learn Any Degree | College Degree GPT"
        description="Start a free class with your AI professor. Any college degree, course, or lesson taught step by step at no cost."
        path="/chat"
        noindex
      />
      <h1 className="sr-only">College Degree GPT — Free AI Professor Virtual Classroom</h1>
      {/* Magical background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-32 h-96 w-96 rounded-full bg-red-500/10 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar / mobile drawer */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-[84vw] max-w-[20rem] md:w-72 border-r border-border flex flex-col bg-card transform transition-transform duration-200 md:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">College Degree GPT</div>
            <div className="text-xs text-muted-foreground truncate">{session?.user.email}</div>
          </div>
          <button
            className="md:hidden text-muted-foreground h-10 w-10 -mr-2 flex items-center justify-center rounded-md hover:bg-accent"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-3">
          <Button onClick={() => { setSidebarOpen(false); void createThread(); }} className="w-full h-11">
            <Plus className="h-4 w-4 mr-2" /> New conversation
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`group flex items-center gap-1 rounded-md px-2 py-3 md:py-2 text-sm cursor-pointer hover:bg-accent ${
                t.id === threadId ? "bg-accent" : ""
              }`}
              onClick={() => selectThread(t.id)}
            >
              <span className="flex-1 truncate">{t.title || "New conversation"}</span>
              <button
                type="button"
                aria-label="Delete conversation"
                className="md:opacity-0 md:group-hover:opacity-100 text-muted-foreground hover:text-destructive h-9 w-9 flex items-center justify-center shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm("Delete this conversation?")) void deleteThread(t.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-border space-y-2">
          <Button variant="outline" className="w-full h-11" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to site
          </Button>
          <Button variant="ghost" className="w-full h-11" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="relative flex-1 flex flex-col min-w-0 w-full">
        {/* Mobile top bar */}
        <div
          className="md:hidden flex items-center gap-2 px-2 py-2 border-b border-border bg-card/90 backdrop-blur shrink-0"
          style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open conversations"
            className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-accent active:scale-95 transition"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <GraduationCap className="h-5 w-5 text-primary shrink-0" />
            <span className="font-semibold text-sm truncate">College Degree GPT</span>
          </div>
          <button
            onClick={() => void createThread()}
            aria-label="New conversation"
            className="h-11 w-11 flex items-center justify-center rounded-lg hover:bg-accent active:scale-95 transition text-primary"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>

        {threadId && !loadingThread && initialMessages ? (
          <ChatWindow
            key={threadId}
            threadId={threadId}
            userId={session!.user.id}
            initialMessages={initialMessages}
            onFirstUserMessage={async (text) => {
              const title = text.slice(0, 60);
              await supabase.from("threads").update({ title }).eq("id", threadId);
              setThreads((prev) =>
                prev.map((t) => (t.id === threadId ? { ...t, title } : t)),
              );
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </main>
    </div>
  );
}

const QUICK_ACTIONS = [
  "YES — begin",
  "Continue the next lesson",
  "Quiz me on this lesson",
  "Explain that more simply",
];

const STARTERS = [
  "I want a Bachelor of Computer Science based on MIT",
  "Teach me a Business Administration degree from Harvard",
  "Psychology degree based on Stanford",
];

function ChatWindow({
  threadId,
  userId,
  initialMessages,
  onFirstUserMessage,
}: {
  threadId: string;
  userId: string;
  initialMessages: UIMessage[];
  onFirstUserMessage: (text: string) => void;
}) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [creditFallbackMessage, setCreditFallbackMessage] = useState<string | null>(null);
  const persistedIdsRef = useRef<Set<string>>(new Set(initialMessages.map((m) => m.id)));
  const hadUserMessageRef = useRef<boolean>(
    initialMessages.some((m) => m.role === "user"),
  );

  const transport = useMemo(
    () => new DefaultChatTransport({
      api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const response = await fetch(input, init);
        if (response.status === 402 || response.status === 403 || response.status === 429) {
          const text = await response.clone().text();
          if (response.status === 402 || isCreditFallbackError(text)) {
            setCreditFallbackMessage(stripCreditPrefix(text) || CREDIT_FALLBACK_COPY);
          }
        }
        return response;
      },
    }),
    [],
  );

  const { messages, sendMessage, status, error, stop } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (e) => {
      if (isCreditFallbackError(e.message)) {
        setCreditFallbackMessage(stripCreditPrefix(e.message) || CREDIT_FALLBACK_COPY);
        toast.error("Community credits have run out for today.");
        return;
      }
      toast.error(e.message);
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  // Track whether the user is pinned to the bottom
  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 120);
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  // Auto-scroll only while pinned to the bottom (never yank the page away from a reader)
  useEffect(() => {
    if (atBottom) scrollToBottom(isLoading ? "auto" : "smooth");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, status]);

  useLayoutEffect(() => {
    scrollToBottom("auto");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId]);

  // Auto-grow composer
  const autoGrow = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  useEffect(() => {
    autoGrow();
  }, [input, autoGrow]);

  // Persist new messages once they finish streaming
  useEffect(() => {
    if (status === "streaming" || status === "submitted") return;
    (async () => {
      for (const m of messages) {
        if (persistedIdsRef.current.has(m.id)) continue;
        if (m.role !== "user" && m.role !== "assistant") continue;
        const { error: insErr } = await supabase.from("messages").insert({
          thread_id: threadId,
          user_id: userId,
          role: m.role,
          parts: m.parts as never,
        });
        if (insErr) {
          console.error("persist message failed", insErr);
          continue;
        }
        persistedIdsRef.current.add(m.id);
      }
    })();
  }, [messages, status, threadId, userId]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || isLoading) return;
    setCreditFallbackMessage(null);
    setInput("");
    setAtBottom(true);
    if (!hadUserMessageRef.current) {
      hadUserMessageRef.current = true;
      onFirstUserMessage(text);
    }
    await sendMessage({ text });
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    await send(input);
  };

  const copyMessage = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId((c) => (c === id ? null : c)), 1500);
    } catch {
      toast.error("Couldn't copy");
    }
  };

  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [loadingVoiceId, setLoadingVoiceId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const speakMessage = async (id: string, text: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (speakingId === id) {
        setSpeakingId(null);
        return;
      }
      setLoadingVoiceId(id);
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ text, voice: "onyx" }),
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || `TTS failed (${res.status})`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setSpeakingId((cur) => (cur === id ? null : cur));
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => {
        setSpeakingId((cur) => (cur === id ? null : cur));
        URL.revokeObjectURL(url);
      };
      await audio.play();
      setLoadingVoiceId(null);
      setSpeakingId(id);
    } catch (e) {
      console.error("tts error", e);
      toast.error(e instanceof Error ? e.message : "Voice playback failed");
      setSpeakingId(null);
      setLoadingVoiceId(null);
    }
  };

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const openChatGptVersion = () => {
    createTimePortalEffect(CHATGPT_VERSION_URL, "College Degree GPT ChatGPT Version (External)");
  };

  // ---- Export helpers: take the whole class with you ----
  const exportItems = () =>
    messages.map((m) => {
      const texts: string[] = [];
      const images: string[] = [];
      for (const p of m.parts as any[]) {
        if (p?.type === "text" && p.text) texts.push(p.text);
        if (typeof p?.type === "string" && p.type.startsWith("tool-")) {
          const out = p.output ?? p.result;
          if (out?.dataUrl) images.push(out.dataUrl);
        }
      }
      return { role: m.role === "user" ? "You" : "Professor (College Degree GPT)", text: texts.join("\n\n"), images };
    });

  const fileBase = () =>
    `college-degree-gpt-class-${new Date().toISOString().slice(0, 10)}`;

  const saveBlob = (content: string, type: string, name: string) => {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const DISCLAIMER =
    "College Degree GPT — self-taught learning. Not accredited, not formal education. https://college-degree-gpt.lovable.app";

  const buildMarkdown = () =>
    `# My College Degree GPT Class\n\n_${DISCLAIMER}_\n\n---\n\n` +
    exportItems()
      .map((i) => `## ${i.role}\n\n${i.text}${i.images.length ? `\n\n_[${i.images.length} lesson image(s) — see the HTML download]_` : ""}`)
      .join("\n\n---\n\n");

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const buildHtml = () => {
    const body = exportItems()
      .map(
        (i) => `<section class="${i.role === "You" ? "you" : "prof"}"><h2>${escapeHtml(i.role)}</h2><div class="t">${escapeHtml(i.text)
          .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')}</div>${i.images
          .map((src) => `<img src="${src}" alt="Lesson image"/>`)
          .join("")}</section>`,
      )
      .join("");
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>My College Degree GPT Class</title><style>body{font-family:Georgia,serif;max-width:800px;margin:2rem auto;padding:0 1rem;line-height:1.6;color:#111}h1{color:#b91c1c}.note{font-size:.85rem;color:#555;border-left:3px solid #b91c1c;padding-left:.75rem}section{border-top:1px solid #ddd;padding:1rem 0;page-break-inside:auto}section.you h2{color:#b91c1c}h2{font-size:1rem;margin:0 0 .5rem}.t{white-space:pre-wrap}img{max-width:100%;border-radius:8px;margin-top:.75rem}</style></head><body><h1>My College Degree GPT Class</h1><p class="note">${DISCLAIMER}</p>${body}</body></html>`;
  };

  const downloadMarkdown = () => {
    if (!messages.length) return toast.error("Nothing to download yet.");
    saveBlob(buildMarkdown(), "text/markdown;charset=utf-8", `${fileBase()}.md`);
    toast.success("Class notes downloaded");
  };
  const downloadHtml = () => {
    if (!messages.length) return toast.error("Nothing to download yet.");
    saveBlob(buildHtml(), "text/html;charset=utf-8", `${fileBase()}.html`);
    toast.success("Full class with images downloaded");
  };
  const printPdf = () => {
    if (!messages.length) return toast.error("Nothing to save yet.");
    const w = window.open("", "_blank");
    if (!w) return toast.error("Allow pop-ups to save as PDF, or use the HTML download.");
    w.document.write(buildHtml());
    w.document.close();
    setTimeout(() => w.print(), 600);
  };
  const copyAll = async () => {
    if (!messages.length) return;
    await navigator.clipboard.writeText(buildMarkdown());
    toast.success("Whole class copied");
  };

  const toolBtn =
    "min-w-0 flex flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-1.5 rounded-xl sm:rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 active:scale-95 transition px-1 sm:px-3 h-11 sm:h-9 text-[10px] sm:text-xs font-medium leading-tight";

  return (
    <>
      <div className="shrink-0 border-b border-border bg-card/70 backdrop-blur">
        <div className="max-w-3xl mx-auto grid grid-cols-5 gap-1.5 sm:flex sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2">
          <button type="button" onClick={downloadHtml} className={toolBtn} aria-label="Download full class with images">
            <Download className="h-3.5 w-3.5" /> <span className="truncate max-w-full"><span className="sm:hidden">Download</span><span className="hidden sm:inline">Download class</span></span>
          </button>
          <button type="button" onClick={printPdf} className={toolBtn} aria-label="Save class as PDF">
            <Printer className="h-3.5 w-3.5" /> <span className="truncate max-w-full">PDF<span className="hidden sm:inline"> (save)</span></span>
          </button>
          <button type="button" onClick={downloadMarkdown} className={toolBtn} aria-label="Download notes as text">
            <FileText className="h-3.5 w-3.5" /> <span className="truncate max-w-full">Notes</span>
          </button>
          <button type="button" onClick={() => void copyAll()} className={toolBtn} aria-label="Copy whole class">
            <Copy className="h-3.5 w-3.5" /> <span className="truncate max-w-full">Copy all</span>
          </button>
          <button type="button" onClick={openChatGptVersion} className={toolBtn} aria-label="Open ChatGPT version">
            <ExternalLink className="h-3.5 w-3.5" /> <span className="truncate max-w-full"><span className="sm:hidden">ChatGPT</span><span className="hidden sm:inline">CHATGPT VERSION / EXTERNAL</span></span>
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="relative flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-webkit-overflow-scrolling:touch]"
      >
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-5 sm:py-8 space-y-5 sm:space-y-6 w-full">
          {messages.length === 0 && (
            <div className="text-center py-10 sm:py-16 space-y-3">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">Ready for class, Master?</h2>
              <p className="text-muted-foreground max-w-md mx-auto px-2 text-sm sm:text-base">
                Tap a starter below or say hi. I'll ask what degree you want and what college to
                base it on, then teach the entire program lesson by lesson.
              </p>
              <div className="flex flex-col gap-2 pt-2 max-w-md mx-auto">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void send(s)}
                    className="text-left text-sm rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 active:scale-[0.99] transition px-4 py-3"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m) => {
            if (m.role === "user") {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[88%] sm:max-w-[85%] rounded-2xl bg-primary text-primary-foreground px-4 py-2.5 shadow-lg shadow-primary/20">
                    <div className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{text}</div>
                  </div>
                </div>
              );
            }
            const assistantText = m.parts
              .map((p) => (p.type === "text" ? (p as any).text : ""))
              .join("\n")
              .trim();
            const isSpeaking = speakingId === m.id;
            const isVoiceLoading = loadingVoiceId === m.id;
            return (
              <div key={m.id} className="space-y-3 group animate-fade-in">
                {m.parts.map((p, i) => {
                  if (p.type === "text") {
                    return (
                      <div
                        key={i}
                        className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words prose-pre:overflow-x-auto prose-pre:text-xs prose-img:rounded-xl prose-headings:scroll-mt-16 [&_table]:block [&_table]:overflow-x-auto [&_table]:whitespace-nowrap"
                      >
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline hover:opacity-80 break-all"
                              />
                            ),
                          }}
                        >
                          {(p as any).text}
                        </ReactMarkdown>
                      </div>
                    );
                  }
                  const anyPart = p as any;
                  if (anyPart.type === "tool-generate_image" || anyPart.type?.startsWith?.("tool-generate_image")) {
                    const output = anyPart.output ?? anyPart.result;
                    const state = anyPart.state;
                    if (output?.dataUrl) {
                      return (
                        <figure key={i} className="rounded-xl overflow-hidden border border-primary/30 bg-card shadow-xl shadow-primary/10 animate-scale-in">
                          <img
                            src={output.dataUrl}
                            alt={output.prompt ?? "Generated lesson image"}
                            loading="lazy"
                            className="w-full h-auto"
                          />
                          {output.prompt && (
                            <figcaption className="text-xs text-muted-foreground px-3 py-2 line-clamp-3">
                              {output.prompt}
                            </figcaption>
                          )}
                        </figure>
                      );
                    }
                    if (output?.error) {
                      return (
                        <div key={i} className="text-xs text-destructive">Image failed: {output.error}</div>
                      );
                    }
                    if (state === "input-available" || state === "call" || state === "partial-call" || state === "input-streaming") {
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground italic">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Conjuring lesson image…
                        </div>
                      );
                    }
                  }
                  return null;
                })}
                {assistantText && (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakMessage(m.id, assistantText)}
                      className="inline-flex items-center gap-1.5 text-xs px-3 h-9 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary transition-all active:scale-95"
                      aria-label={isSpeaking ? "Stop voice" : "Play professor voice"}
                    >
                      {isVoiceLoading ? (
                        <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading voice…</>
                      ) : isSpeaking ? (
                        <><Pause className="h-3.5 w-3.5" /> Stop</>
                      ) : (
                        <><Play className="h-3.5 w-3.5" /> Play professor voice</>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => copyMessage(m.id, assistantText)}
                      className="inline-flex items-center gap-1.5 text-xs px-3 h-9 rounded-full border border-border bg-muted/40 hover:bg-muted text-muted-foreground transition-all active:scale-95"
                      aria-label="Copy lesson text"
                    >
                      {copiedId === m.id ? (
                        <><Check className="h-3.5 w-3.5" /> Copied</>
                      ) : (
                        <><Copy className="h-3.5 w-3.5" /> Copy</>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="text-muted-foreground text-sm italic flex items-center gap-2">
              <Sparkles className="h-4 w-4 animate-pulse text-primary" /> Professor is thinking…
            </div>
          )}

          {(creditFallbackMessage || (error && !isCreditFallbackError(error.message))) && (
            <div className={creditFallbackMessage ? "rounded-2xl border border-amber-300 bg-amber-100/90 p-4 text-amber-950 shadow-lg" : "text-destructive text-sm"}>
              {creditFallbackMessage ? (
                <div className="space-y-3">
                  <p className="text-sm font-semibold">{creditFallbackMessage}</p>
                  <Button
                    type="button"
                    size="sm"
                    onClick={openChatGptVersion}
                    className="rounded-full bg-red-500 hover:bg-red-600 text-white"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" /> Open College Degree GPT (CHATGPT VERSION / EXTERNAL)
                  </Button>
                </div>
              ) : (
                <>Error: {error?.message}</>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Jump to latest */}
      {!atBottom && (
        <button
          type="button"
          onClick={() => { setAtBottom(true); scrollToBottom(); }}
          aria-label="Jump to latest message"
          className="absolute left-1/2 -translate-x-1/2 bottom-32 z-20 h-10 px-4 rounded-full bg-card/95 border border-primary/30 shadow-lg text-xs text-primary flex items-center gap-1.5 backdrop-blur active:scale-95"
        >
          <ArrowDown className="h-4 w-4" /> Latest
        </button>
      )}

      <form
        onSubmit={submit}
        className="border-t border-border bg-card/90 backdrop-blur shrink-0"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-3xl mx-auto px-3 sm:px-4 pt-2 pb-3 space-y-2">
          {/* One-tap quick actions — no typing needed on phone */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {QUICK_ACTIONS.map((q) => (
              <button
                key={q}
                type="button"
                disabled={isLoading}
                onClick={() => void send(q)}
                className="shrink-0 text-xs h-9 px-3 rounded-full border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 disabled:opacity-40 active:scale-95 transition whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
          <div className="flex gap-2 items-end">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type YES to begin, or ask anything…"
              rows={1}
              enterKeyHint="send"
              inputMode="text"
              className="flex-1 min-w-0 resize-none rounded-2xl border border-input bg-background px-4 py-3 text-base leading-snug min-h-[48px] max-h-40 outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void submit();
                }
              }}
            />
            {isLoading ? (
              <Button
                type="button"
                size="icon"
                variant="outline"
                onClick={() => stop()}
                aria-label="Stop generating"
                className="shrink-0 h-12 w-12 rounded-2xl"
              >
                <Square className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim()}
                aria-label="Send message"
                className="shrink-0 h-12 w-12 rounded-2xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
