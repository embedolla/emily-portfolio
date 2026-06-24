"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowRight, Sprout } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const ROLES = ["engineer", "advocate", "builder for good"];

function useTypewriter(words: string[], typingMs = 90, pauseMs = 1600) {
  const [index, setIndex] = React.useState(0);
  const [text, setText] = React.useState("");
  const [deleting, setDeleting] = React.useState(false);

  React.useEffect(() => {
    const current = words[index % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          );
        },
        deleting ? typingMs / 2 : typingMs,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingMs, pauseMs]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden"
    >
      {/* Soft Grove gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
            <Sprout className="size-4 text-primary" />
            Incoming CS @ Stanford · SWE/AI Intern @ Amazon
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m Emily Bedolla — <br className="hidden sm:block" />
            <span className="text-primary">
              {typed}
              <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-primary align-middle">
                &nbsp;
              </span>
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I build with technology — and I care deeply about whether it helps
            people and the planet. Looking ahead, I hope to work in AI research
            and public policy that keep it from harming people or the
            environment.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className={cn(buttonVariants({ size: "lg" }))}>
              View my work
              <ArrowRight className="size-4" />
            </a>
            <a
              href="#contact"
              className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
            >
              Get in touch
            </a>
            <div className="ml-1 flex items-center gap-1">
              <a
                href="https://github.com/embedolla"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-full",
                )}
              >
                <GithubIcon className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-full",
                )}
              >
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
