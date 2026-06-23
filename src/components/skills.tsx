import { Braces, Boxes, Brain } from "lucide-react";
import { Section } from "@/components/section";

const groups = [
  {
    icon: Braces,
    title: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    icon: Boxes,
    title: "Frameworks & tools",
    items: ["React", "Next.js", "Tailwind CSS", "Node.js", "Git & GitHub"],
  },
  {
    icon: Brain,
    title: "Focus areas",
    items: ["Applied AI / ML", "Web development", "AI ethics & policy"],
  },
];

export function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="What I work with">
      <div className="grid gap-5 sm:grid-cols-3">
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
