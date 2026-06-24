import {
  BookOpen,
  Cake,
  Church,
  Code2,
  Dumbbell,
  Sprout,
  Tv,
  Users,
} from "lucide-react";
import { Section } from "@/components/section";

const interests = [
  { label: "Catholic faith", icon: Church },
  { label: "Baking & cooking", icon: Cake },
  { label: "Reading", icon: BookOpen },
  { label: "Friends & family", icon: Users },
  { label: "Volleyball & roller skating", icon: Dumbbell },
  { label: "The gym", icon: Dumbbell },
  { label: "Gardening", icon: Sprout },
  { label: "Watching shows", icon: Tv },
  { label: "Building little apps", icon: Code2 },
];

export function About() {
  return (
    <Section id="about" eyebrow="About me" title="Hi, I'm Emily 👋">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
          <p>
            My interest for computer science began during quarantine, when I
            started learning Python; that&apos;s the moment I knew this was my
            field. Later, playing around with ChatGPT sparked my fascination with
            AI, and I set my sights on becoming an AI engineer.
          </p>
          <p>
            Even so, the more I learned, the more I saw the other side. Friends
            told me how their parents were laid off because of AI. I read about
            its water consumption and the toll data centers take on surrounding
            communities. I watched AI being used to replace genuine human effort.
            AI is powerful, and it can be harmful. That issue is exactly what I
            want to work on.
          </p>
          <p>
            What drives me is giving back to everyone who helped me get here,
            building a safer world for future generations, and uplifting
            marginalized people and minorities by giving them a voice. My Catholic
            faith grounds all of it: keeping God at the center, acting selflessly
            and kindly, and trying to be a mirror of God&apos;s love in the work I
            do.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-semibold">
            <Sprout className="size-5 text-primary" />
            Beyond the code
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            A few things that make me, me:
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {interests.map((it) => (
              <li
                key={it.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground"
              >
                <it.icon className="size-3.5 text-primary" />
                {it.label}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-muted-foreground">
            Currently reading{" "}
            <span className="font-medium text-foreground">The Secret Garden</span>
            , watching{" "}
            <span className="font-medium text-foreground">The Walking Dead</span>,
            and building a Bible app for a friend. 🌱
          </p>
        </div>
      </div>
    </Section>
  );
}
