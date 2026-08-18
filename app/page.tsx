import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ImpactStrip } from "@/components/sections/ImpactStrip";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

/**
 * Single-page portfolio.
 *
 * Section order follows the recruiter's question sequence:
 * who are you → what have you done → what can you do → how do I reach you.
 *
 * To reorder, move a component here. To rename a section anchor, update both
 * the `id` on the section and its entry in NAV_LINKS (components/layout/Navbar.tsx).
 */
export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main">
        <Hero />
        <ImpactStrip />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
