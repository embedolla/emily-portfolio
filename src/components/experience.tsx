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

// NOTE: refine these from Emily's résumé (titles, dates, education).
const timeline: Item[] = [
  {
    role: "Software / AI Engineer Intern",
    org: "Amazon",
    period: "Summer 2027 · Incoming",
    description:
      "Joining Amazon as an engineering intern to build at scale and deepen my software and AI experience.",
    upcoming: true,
  },
  {
    role: "Applied AI Cohort",
    org: "Code2College",
    period: "Summer 2026",
    description:
      "Hands-on applied-AI training — building practical machine-learning and AI projects.",
  },
  {
    role: "Tech Intern",
    org: "Sepall",
    period: "Summer 2026",
    description:
      "Returning for a second summer to build software and contribute to the team's technical work.",
  },
  {
    role: "Tech Intern",
    org: "Sepall",
    period: "Summer 2025",
    description:
      "First internship — gained hands-on experience building and shipping real software.",
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've been heading">
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
