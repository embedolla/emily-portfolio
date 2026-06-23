"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What is Emily passionate about?",
  "Tell me about her experience at CPAL.",
  "What's her mission with AI?",
];

export function AskPortfolio() {
  const [messages, setMessages] = React.useState<Msg[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || loading) return;
    setError(null);
    setInput("");
    const history = messages.slice(-8);
    setMessages((m) => [...m, { role: "user", content: q }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } else if (data.fallback) {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              "The AI demo isn't switched on yet — but I'd still love to hear from you! Reach Emily at emily.e.bedolla@gmail.com. 🌱",
          },
        ]);
      } else {
        setError(data.error ?? "Something went wrong.");
      }
    } catch {
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section id="ask" eyebrow="Ask my portfolio" title="Curious? Just ask 🤖">
      <p className="max-w-2xl text-muted-foreground">
        This little assistant knows about my background, work, and mission. Ask
        it anything — it&apos;s powered by Claude.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <div ref={scrollRef} className="max-h-96 space-y-4 overflow-y-auto p-5">
          {messages.length === 0 && (
            <div className="py-6 text-center">
              <Sparkles className="mx-auto size-7 text-primary" />
              <p className="mt-3 text-sm text-muted-foreground">
                Try one of these to start:
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                )}
              >
                {m.content}
              </div>
            </motion.div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-secondary px-4 py-2.5 text-secondary-foreground">
                <Loader2 className="size-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
          className="flex items-center gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Emily…"
            maxLength={500}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send"
            className={cn(buttonVariants({ size: "icon" }))}
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </Section>
  );
}
