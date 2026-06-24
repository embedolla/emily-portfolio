import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Code2, GraduationCap, Tv } from "lucide-react";

export const metadata: Metadata = {
  title: "Now — Emily Bedolla",
  description: "What Emily is focused on, building, reading, and watching right now.",
};

const now = [
  {
    icon: GraduationCap,
    text: "Getting ready to start in Symbolic Systems at Stanford this fall.",
  },
  {
    icon: Code2,
    text: "Interning at the Child Poverty Action Lab — and building a Bible app for a friend on the side.",
  },
  {
    icon: BookOpen,
    text: "Reading The Secret Garden.",
  },
  {
    icon: Tv,
    text: "Watching The Walking Dead.",
  },
];

const reading = [
  {
    title: "The Secret Garden",
    author: "Frances Hodgson Burnett",
    note: "Currently reading 🌱",
  },
];

const influences = [
  "Responsible & ethical AI",
  "AI's environmental footprint",
  "Technology for social good",
  "AI policy & governance",
];

export default function NowPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20 sm:py-28">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back home
      </Link>

      <h1 className="mt-6 text-4xl font-bold tracking-tight">Now</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        A snapshot of what I&apos;m focused on at the moment.{" "}
        <span className="text-sm">(Inspired by{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          nownownow.com
        </a>
        .)</span>
      </p>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary">
          Right now
        </h2>
        <ul className="mt-5 space-y-4">
          {now.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                <item.icon className="size-4" />
              </span>
              <p className="text-muted-foreground">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary">
          On my reading list
        </h2>
        <ul className="mt-5 space-y-3">
          {reading.map((b) => (
            <li key={b.title} className="rounded-xl border border-border bg-card p-4">
              <p className="font-medium">{b.title}</p>
              <p className="text-sm text-muted-foreground">{b.author}</p>
              {b.note && <p className="mt-1 text-sm text-primary">{b.note}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-medium uppercase tracking-widest text-primary">
          Ideas I&apos;m thinking about
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {influences.map((t) => (
            <li
              key={t}
              className="rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
