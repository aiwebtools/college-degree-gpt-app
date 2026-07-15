import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { GraduationCap, Plus, LogOut, Trash2, Send, Loader2, ArrowLeft, Menu, X, Play, Pause, Sparkles } from "lucide-react";
import type { Session } from "@supabase/supabase-js";

type Thread = { id: string; title: string; updated_at: string };

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
      const { data, error } = await supabase
        .from("messages")
        .select("id,role,parts,created_at")
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });
      if (error) {
        toast.error(error.message);
        setInitialMessages([]);
      } else {
        setInitialMessages(
          (data ?? []).map((m) => ({
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
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 border-r border-border flex flex-col bg-card transform transition-transform duration-200 md:transform-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-border flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">College Degree GPT</div>
            <div className="text-xs text-muted-foreground truncate">{session?.user.email}</div>
          </div>
          <button
            className="md:hidden text-muted-foreground"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-3">
          <Button onClick={() => { setSidebarOpen(false); void createThread(); }} className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" /> New conversation
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
          {threads.map((t) => (
            <div
              key={t.id}
              className={`group flex items-center gap-1 rounded-md px-2 py-2 text-sm cursor-pointer hover:bg-accent ${
                t.id === threadId ? "bg-accent" : ""
              }`}
              onClick={() => selectThread(t.id)}
            >
              <span className="flex-1 truncate">{t.title || "New conversation"}</span>
              <button
                type="button"
                aria-label="Delete conversation"
                className="md:opacity-0 md:group-hover:opacity-100 text-muted-foreground hover:text-destructive"
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
          <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to site
          </Button>
          <Button variant="ghost" size="sm" className="w-full" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-2 p-3 border-b border-border bg-card">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="p-1.5 rounded-md hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <GraduationCap className="h-5 w-5 text-primary shrink-0" />
            <span className="font-semibold text-sm truncate">College Degree GPT</span>
          </div>
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
  const persistedIdsRef = useRef<Set<string>>(new Set(initialMessages.map((m) => m.id)));
  const hadUserMessageRef = useRef<boolean>(
    initialMessages.some((m) => m.role === "user"),
  );

  const transport = useRef(
    new DefaultChatTransport({
      api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
    }),
  ).current;

  const { messages, sendMessage, status, error } = useChat({
    id: threadId,
    messages: initialMessages,
    transport,
    onError: (e) => toast.error(e.message),
  });

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  // Focus composer
  useEffect(() => {
    textareaRef.current?.focus();
  }, [threadId, status]);

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

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || status === "streaming" || status === "submitted") return;
    setInput("");
    if (!hadUserMessageRef.current) {
      hadUserMessageRef.current = true;
      onFirstUserMessage(text);
    }
    await sendMessage({ text });
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <>
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Ready for class, Master?</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Say hi to start. I'll ask what degree you want and what college to base it on,
                then teach the entire program lesson by lesson.
              </p>
            </div>
          )}

          {messages.map((m) => {
            if (m.role === "user") {
              const text = m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");
              return (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl bg-primary text-primary-foreground px-4 py-2.5">
                    <div className="whitespace-pre-wrap break-words">{text}</div>
                  </div>
                </div>
              );
            }
            return (
              <div key={m.id} className="space-y-3">
                {m.parts.map((p, i) => {
                  if (p.type === "text") {
                    return (
                      <div key={i} className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            a: ({ node, ...props }) => (
                              <a
                                {...props}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline hover:opacity-80"
                              />
                            ),
                          }}
                        >
                          {p.text}
                        </ReactMarkdown>
                      </div>
                    );
                  }
                  // Tool call for image generation
                  const anyPart = p as any;
                  if (anyPart.type === "tool-generate_image" || anyPart.type?.startsWith?.("tool-generate_image")) {
                    const output = anyPart.output ?? anyPart.result;
                    const state = anyPart.state;
                    if (output?.dataUrl) {
                      return (
                        <figure key={i} className="rounded-xl overflow-hidden border border-border bg-card">
                          <img
                            src={output.dataUrl}
                            alt={output.prompt ?? "Generated lesson image"}
                            className="w-full h-auto"
                          />
                          {output.prompt && (
                            <figcaption className="text-xs text-muted-foreground px-3 py-2">
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
                    if (state === "input-available" || state === "call" || state === "partial-call") {
                      return (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground italic">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating lesson image…
                        </div>
                      );
                    }
                  }
                  return null;
                })}
              </div>
            );
          })}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="text-muted-foreground text-sm italic">Professor is thinking…</div>
          )}

          {error && (
            <div className="text-destructive text-sm">Error: {error.message}</div>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="border-t border-border bg-card">
        <div className="max-w-3xl mx-auto p-4 flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type YES to begin, or ask anything…"
            rows={1}
            className="resize-none min-h-[44px] max-h-40"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void submit();
              }
            }}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </>
  );
}
