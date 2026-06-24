import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Mission } from "@/components/mission";
import { Projects } from "@/components/projects";
import { GithubActivity } from "@/components/github-activity";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Honors } from "@/components/honors";
import { AskPortfolio } from "@/components/ask-portfolio";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Mission />
      <Projects />
      <GithubActivity />
      <Skills />
      <Experience />
      <Education />
      <Honors />
      <AskPortfolio />
      <Contact />
    </>
  );
}
