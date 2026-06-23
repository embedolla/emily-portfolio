import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Mission />
      <Skills />
      <Experience />

      {/* Placeholder anchor — Projects & Contact come next */}
      <section
        id="projects"
        className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 pb-28"
      >
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Coming next
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Projects & Contact 🌱
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            Up next we&apos;ll turn your GitHub repos into polished case studies
            and wire up a working contact form.
          </p>
          <span id="contact" className="sr-only">
            Contact
          </span>
        </div>
      </section>
    </>
  );
}
