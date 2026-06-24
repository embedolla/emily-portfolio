import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { Projects } from "@/components/projects";
import { GithubActivity } from "@/components/github-activity";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Honors } from "@/components/honors";
import { Contact } from "@/components/contact";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Mission />
      <SectionDivider />
      <Projects />
      <GithubActivity />
      <SectionDivider />
      <Skills />
      <Experience />
      <Education />
      <SectionDivider />
      <Honors />
      <Contact />
    </>
  );
}
