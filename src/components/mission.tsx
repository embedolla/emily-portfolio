import { Landmark, Leaf, HeartHandshake } from "lucide-react";
import { Section } from "@/components/section";

const pillars = [
  {
    icon: Landmark,
    title: "Responsible AI & policy",
    body: "I want to help create legislation that reduces AI's harms so the technology serves people instead of displacing them, and the people affected by it actually have a voice.",
  },
  {
    icon: Leaf,
    title: "AI & the environment",
    body: "AI's water use and the footprint of data centers fall hardest on nearby communities. I want to research how to measure and mitigate those environmental effects.",
  },
  {
    icon: HeartHandshake,
    title: "Technology for good",
    body: "Whether by starting or joining a tech nonprofit, I want to build tools that uplift marginalized people and give back to the communities that shaped me.",
  },
];

export function Mission() {
  return (
    <Section id="mission" eyebrow="My mission" title="What I care about">
      <p className="max-w-2xl text-xl font-medium leading-relaxed">
        The systems I love building also pull water from communities and can put
        people out of work. I want to build — and help govern — AI so its
        benefits reach people without those costs landing on the most vulnerable.
      </p>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        I&apos;m drawn to AI in an interdisciplinary context, where engineering
        meets public policy and ethics. Here&apos;s where I want to make a
        difference:
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.title}
            className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          >
            <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <p.icon className="size-5" />
            </div>
            <h3 className="mt-4 font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
