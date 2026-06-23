import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Honors } from "@/components/honors";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Mission />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Honors />

      {/* Contact form comes next */}
      <section
        id="contact"
        className="mx-auto w-full max-w-5xl scroll-mt-20 px-6 pb-28"
      >
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-10 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Coming next
          </p>
          <h2 className="mt-3 text-2xl font-semibold">A working contact form 🌱</h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            For now, reach me at{" "}
            <a
              href="mailto:emily.e.bedolla@gmail.com"
              className="font-medium text-foreground underline underline-offset-4"
            >
              emily.e.bedolla@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
