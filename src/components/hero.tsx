"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Sprout } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const ROLES = ["CS student", "engineer", "advocate", "builder for good"];

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
  const reduce = useReducedMotion();

  // Pointer position, normalized to -0.5 … 0.5 across the viewport.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const { scrollY } = useScroll();

  // Blobs drift opposite/with the cursor and ease apart as the page scrolls.
  const blob1x = useTransform(px, [-0.5, 0.5], [30, -30]);
  const blob1y = useTransform([py, scrollY], ([p, s]: number[]) => p * -56 + s * 0.18);
  const blob2x = useTransform(px, [-0.5, 0.5], [-38, 38]);
  const blob2y = useTransform([py, scrollY], ([p, s]: number[]) => p * 40 - s * 0.12);

  function handlePointer(e: React.PointerEvent) {
    if (reduce) return;
    px.set(e.clientX / window.innerWidth - 0.5);
    py.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section
      id="home"
      onPointerMove={handlePointer}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden py-12 md:py-8"
    >
      {/* Soft Grove gradient blobs (parallax with cursor + scroll) */}
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: blob1x, y: blob1y }}
        className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { x: blob2x, y: blob2y }}
        className="pointer-events-none absolute -bottom-32 right-0 size-96 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-6 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground">
            <Sprout className="size-4 text-primary" />
            Incoming Symbolic Systems @ Stanford · SWE/AI Intern @ Amazon
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            Hi, I&apos;m Emily Bedolla — <br className="hidden sm:block" />
            <span className="text-primary">
              {typed}
              <span className="animate-caret ml-1 inline-block w-[3px] bg-primary align-middle">
                &nbsp;
              </span>
            </span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I build with technology, and I care deeply about whether it helps
            people and the planet. Looking ahead, I hope to work in AI research,
            start or work at a tech nonprofit, or shape public policy that keeps
            it from harming people or the environment.
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
                  "size-10 rounded-full",
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
                  "size-10 rounded-full",
                )}
              >
                <LinkedinIcon className="size-5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Photo cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="grid h-80 grid-cols-2 gap-3 sm:h-[440px]">
            <div className="relative row-span-2 overflow-hidden rounded-2xl border-4 border-card shadow-lg">
              <Image
                src="/photos/tree.jpg"
                alt="Emily smiling beside a willow tree"
                fill
                priority
                sizes="(max-width: 768px) 50vw, 220px"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl border-4 border-card shadow-lg">
              <Image
                src="/photos/cottage.jpg"
                alt="Emily at a storybook cottage doorway"
                fill
                sizes="(max-width: 768px) 50vw, 220px"
                className="object-cover"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl border-4 border-card shadow-lg">
              <Image
                src="/photos/sunset.jpg"
                alt="Emily at golden hour"
                fill
                sizes="(max-width: 768px) 50vw, 220px"
                className="object-cover"
              />
            </div>
          </div>
          <span className="absolute -bottom-3 -left-3 grid size-10 rotate-[-8deg] place-items-center rounded-full bg-primary text-primary-foreground shadow-md">
            <Sprout className="size-5" />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
