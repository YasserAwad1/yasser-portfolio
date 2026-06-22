import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Work } from "@/components/work";
import { Stack } from "@/components/stack";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-canvas text-ink">
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Stack />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
