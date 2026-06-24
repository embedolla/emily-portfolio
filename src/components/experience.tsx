import { Download } from "lucide-react";
import { Section } from "@/components/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Item = {
  role: string;
  org: string;
  period: string;
  description: string;
  upcoming?: boolean;
};

const timeline: Item[] = [
  {
    role: "Software / AI Engineer Intern",
    org: "Amazon",
    period: "Summer 2027 · Incoming",
    description:
      "Joining Amazon to build software and AI at scale — and to keep growing as an engineer.",
    upcoming: true,
  },
  {
    role: "Full Stack Development Intern",
    org: "Child Poverty Action Lab (CPAL)",
    period: "Summer 2025 & Summer 2026",
    description:
      "Engineered enhancements to the Birth Rate Explorer platform — improving UI/UX responsiveness and backend data retrieval, resolving bugs in JavaScript and React, and shipping a ZIP-code search tool. Collaborated cross-functionally and presented work to executive leadership, including the CEO and CTO.",
  },
  {
    role: "Software Engineering Programs",
    org: "Code2College",
    period: "Aug 2024 – Present",
    description:
      "Selected for competitive software programs — Software Development Essentials I, Elite 101, and Full Stack Development II. Built Python projects, learned Git/Jira and testing, won 1st place at DRW's STEM Case Competition, and earned a paid internship at CPAL through a technical interview.",
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="My journey so far">
      <div className="relative border-l border-border pl-8">
        {timeline.map((item, i) => (
          <div key={`${item.org}-${i}`} className="relative pb-10 last:pb-0">
            <span
              className={cn(
                "absolute -left-[2.4rem] top-1 grid size-5 place-items-center rounded-full border-2 border-background",
                item.upcoming ? "bg-accent" : "bg-primary",
              )}
              aria-hidden
            >
              <span className="size-1.5 rounded-full bg-background" />
            </span>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-semibold">{item.role}</h3>
              <span className="text-primary">·</span>
              <span className="font-medium text-foreground">{item.org}</span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">{item.period}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }))}
        >
          <Download className="size-4" />
          Download résumé
        </a>
      </div>
    </Section>
  );
}
