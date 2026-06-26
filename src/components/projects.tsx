"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Sprout } from "lucide-react";
import { Section } from "@/components/section";
import { GithubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "AI" | "Web" | "Data & impact" | "Python";

type Project = {
  title: string;
  period: string;
  blurb: string;
  tags: string[];
  themes: Theme[];
  href?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "Birth Rate Explorer",
    period: "2025 · @ Child Poverty Action Lab",
    blurb:
      "A data-driven web app visualizing birth-rate statistics to support efforts against child poverty. I built a reusable ZIP-code map filter, fixed a Mapbox rendering bug affecting geospatial overlays, and refactored the CSS for consistent, cross-browser performance.",
    tags: ["React", "Mapbox GL JS", "Data viz", "Social impact"],
    themes: ["Web", "Data & impact"],
    featured: true,
  },
  {
    title: "Full-Stack E-Commerce Site",
    period: "2025 – Present",
    blurb:
      "A complete e-commerce application with dynamic product listings, user authentication, and a shopping cart. I designed RESTful APIs for users, products, and orders, and structured the database to track inventory and order history.",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    themes: ["Web"],
    featured: true,
  },
  {
    title: "Python Chat Bot",
    period: "2025",
    blurb:
      "An interactive chatbot that simulates human-like conversation through structured dialogue flow and conditional logic — with keyword recognition, branching responses, and input validation.",
    tags: ["Python", "Conversational logic"],
    themes: ["AI", "Python"],
  },
  {
    title: "Finances Tracker",
    period: "2024",
    blurb:
      "A personal finance program in Python to monitor income and expenses, with input validation, categorized expense logging, and dynamic balance updates.",
    tags: ["Python"],
    themes: ["Python"],
  },
];

const THEMES: Theme[] = ["AI", "Web", "Data & impact", "Python"];
type Filter = "All" | Theme;
const FILTERS: Filter[] = ["All", ...THEMES];

export function Projects() {
  const [active, setActive] = React.useState<Filter>("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((p) => p.themes.includes(active));

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div
        role="group"
        aria-label="Filter projects by theme"
        className="mb-6 flex flex-wrap gap-2"
      >
        {FILTERS.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((p) => (
          <motion.article
            layout
            key={p.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
              "group flex flex-col rounded-2xl border bg-card p-6 transition-shadow hover:-translate-y-1 hover:shadow-lg",
              p.featured
                ? "border-primary/30 hover:border-primary/50"
                : "border-border hover:border-primary/40",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="flex flex-wrap items-center gap-2 font-semibold">
                  {p.title}
                  {p.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      <Sprout className="size-3" aria-hidden />
                      Featured
                    </span>
                  )}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{p.period}</p>
              </div>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.title} on GitHub`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowUpRight className="size-5" aria-hidden />
                </a>
              )}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.blurb}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                >
                  {t}
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No projects tagged “{active}” yet — check back soon. 🌱
        </p>
      )}

      <div className="mt-10">
        <a
          href="https://github.com/embedolla"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
        >
          <GithubIcon className="size-4" aria-hidden />
          See all my code on GitHub
        </a>
      </div>
    </Section>
  );
}
