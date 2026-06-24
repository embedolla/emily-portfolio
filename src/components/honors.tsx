import { Trophy, Users } from "lucide-react";
import { Section } from "@/components/section";

const honors = [
  "QuestBridge Match Finalist & College Prep Scholar",
  "National Hispanic Recognition Program",
  "National First-Generation Recognition Program",
  "Aerial Drone Competition — Nationals Champion (Communications Mission) + 6 awards",
];

const leadership = [
  {
    role: "Founding Officer — Head of Finances & Events",
    org: "GAINS (Girls Advancing in STEM)",
    detail: "Co-founded my school's first chapter, mentoring 20+ girls in STEM.",
  },
  {
    role: "Lead Software Engineer & Team Manager",
    org: "Aerial Drone Competition",
    detail:
      "Led a team coding autonomous drone missions across 15+ competitions; qualified for Nationals two years running.",
  },
  {
    role: "Vice President",
    org: "HSI Student Council",
    detail: "Directed 50+ members and raised over $3K for student activities.",
  },
  {
    role: "Co-Captain",
    org: "Varsity Girls Volleyball",
    detail: "Led the team to playoff qualification over two seasons. 🏐",
  },
];

export function Honors() {
  return (
    <Section id="honors" eyebrow="Honors & leadership" title="A few things I'm proud of">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-2 font-semibold">
            <Trophy className="size-5 text-primary" />
            Honors & awards
          </h3>
          <ul className="mt-4 space-y-2">
            {honors.map((h) => (
              <li
                key={h}
                className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="flex items-center gap-2 font-semibold">
            <Users className="size-5 text-primary" />
            Leadership & community
          </h3>
          <ul className="mt-4 space-y-4">
            {leadership.map((l) => (
              <li key={l.org}>
                <p className="text-sm font-medium text-foreground">{l.role}</p>
                <p className="text-sm text-primary">{l.org}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {l.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
