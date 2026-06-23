import { Hero } from "@/components/hero";

const upcoming = [
  { id: "about", label: "About" },
  { id: "mission", label: "Mission" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Placeholder anchors for sections we'll build next */}
      <section className="mx-auto w-full max-w-5xl px-6 py-24">
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Coming next
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            More sections are on the way 🌱
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The foundation is live. Up next we&apos;ll build out these sections:
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {upcoming.map((s) => (
              <span
                key={s.id}
                id={s.id}
                className="rounded-full bg-secondary px-4 py-1.5 text-sm text-secondary-foreground"
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
