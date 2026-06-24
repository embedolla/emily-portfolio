import { GraduationCap } from "lucide-react";
import { Section } from "@/components/section";

type School = {
  school: string;
  credential: string;
  detail: string;
  period: string;
  upcoming?: boolean;
};

const schools: School[] = [
  {
    school: "Stanford University",
    credential: "B.S. in Symbolic Systems (planned)",
    detail: "Incoming freshman excited to dive into CS, AI, and its intersection with policy and society. I'm planning to major in Symbolic Systems, minor in Public Policy, and complete a master's in Computer Science.",
    period: "2026 – 2030 · Incoming",
    upcoming: true,
  },
  {
    school: "Harmony School of Innovation, Fort Worth",
    credential: "High School Diploma with Distinction · Computer Science Pathway",
    detail: "GPA 3.96 (UW) / 4.60 (W). Coursework: AP CS Principles, AP CS A, AP Physics C, AP Calculus AB, Dual-Credit Statistics.",
    period: "Graduated May 2026",
  },
];

export function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I'm learning">
      <div className="grid gap-5 sm:grid-cols-2">
        {schools.map((s) => (
          <div
            key={s.school}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="size-5" />
              </div>
              {s.upcoming && (
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent-foreground dark:text-accent">
                  Incoming
                </span>
              )}
            </div>
            <h3 className="mt-4 font-semibold">{s.school}</h3>
            <p className="mt-1 text-sm font-medium text-foreground">
              {s.credential}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">{s.period}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {s.detail}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
