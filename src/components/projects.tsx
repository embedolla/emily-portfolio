import { ArrowUpRight, Sprout } from "lucide-react";
import { Section } from "@/components/section";
import { GithubIcon } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  period: string;
  blurb: string;
  tags: string[];
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
    featured: true,
  },
  {
    title: "Full-Stack E-Commerce Site",
    period: "2025 – Present",
    blurb:
      "A complete e-commerce application with dynamic product listings, user authentication, and a shopping cart. I designed RESTful APIs for users, products, and orders, and structured the database to track inventory and order history.",
    tags: ["React", "Node.js", "Express", "PostgreSQL"],
    featured: true,
  },
  {
    title: "Python Chat Bot",
    period: "2025",
    blurb:
      "An interactive chatbot that simulates human-like conversation through structured dialogue flow and conditional logic — with keyword recognition, branching responses, and input validation.",
    tags: ["Python", "Conversational logic"],
  },
  {
    title: "Finances Tracker",
    period: "2024",
    blurb:
      "A personal finance program in Python to monitor income and expenses, with input validation, categorized expense logging, and dynamic balance updates.",
    tags: ["Python"],
  },
];

export function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <article
            key={p.title}
            className={cn(
              "group flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg",
              p.featured && "sm:col-span-1 ring-1 ring-primary/10",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  {p.featured && <Sprout className="size-4 text-primary" />}
                  {p.title}
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
                  <ArrowUpRight className="size-5" />
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
          </article>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="https://github.com/embedolla"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg", variant: "outline" }))}
        >
          <GithubIcon className="size-4" />
          See all my code on GitHub
        </a>
      </div>
    </Section>
  );
}
