import { Braces, Boxes, Brain, Award, Languages, Wrench } from "lucide-react";
import { Section } from "@/components/section";

const groups = [
  {
    icon: Braces,
    title: "Languages",
    items: ["Java", "Python", "JavaScript", "SQL", "R", "HTML", "CSS"],
  },
  {
    icon: Boxes,
    title: "Frameworks & tools",
    items: [
      "React",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Next.js",
      "Tailwind CSS",
      "Git",
      "Jira",
    ],
  },
  {
    icon: Wrench,
    title: "Hardware & design",
    items: ["Arduino", "Fusion 360", "Onshape", "Mapbox GL JS"],
  },
  {
    icon: Brain,
    title: "Focus areas",
    items: ["Applied AI / ML", "Full-stack web", "Data visualization", "AI ethics & policy"],
  },
  {
    icon: Award,
    title: "Credentials",
    items: [
      "PCEP — Certified Entry-Level Python Programmer",
      "Java IT Specialist",
      "Autodesk Certified User — Fusion 360",
    ],
  },
  {
    icon: Languages,
    title: "Languages spoken",
    items: ["English (fluent)", "Spanish (fluent)"],
  },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 font-semibold">
              <g.icon className="size-5 text-primary" />
              {g.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-secondary px-2.5 py-1 text-sm text-secondary-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
