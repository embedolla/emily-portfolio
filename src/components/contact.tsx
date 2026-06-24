"use client";

import * as React from "react";
import { Check, Copy, Loader2, Mail, Send } from "lucide-react";
import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const EMAIL = "emily.e.bedolla@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30";

export function Contact() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("sent");
        form.reset();
        return;
      }

      if (data.fallback) {
        // Email service not wired up yet — open the user's mail client.
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
          `Hello from ${payload.name}`,
        )}&body=${encodeURIComponent(payload.message)}`;
        setStatus("idle");
        return;
      }

      setError(data.error ?? "Something went wrong.");
      setStatus("error");
    } catch {
      setError("Network error — please try again, or email me directly.");
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Let's get in touch">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Whether it&apos;s a role, a collaboration, a nonprofit idea, or just a
            hello — I&apos;d love to hear from you. 🌱
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <Mail className="size-4" />
              {EMAIL}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
            >
              {copied ? (
                <Check className="size-4 text-primary" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Name
              </label>
              <input id="name" name="name" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className={cn(inputClass, "resize-y")}
            />
          </div>

          {status === "sent" ? (
            <p className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm text-primary">
              <Check className="size-4" />
              Thank you! Your message is on its way. Expect a reply within 2
              business days! 🌱
            </p>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send message
                </>
              )}
            </button>
          )}

          {status === "error" && error && (
            <p className="text-sm text-destructive">{error}</p>
          )}
        </form>
      </div>
    </Section>
  );
}
