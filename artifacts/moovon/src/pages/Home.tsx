import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { About } from "@/components/sections/About";
import { Solutions } from "@/components/sections/Solutions";
import { Differentials } from "@/components/sections/Differentials";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Mentoria } from "@/components/sections/Mentoria";
import { EbookCapture } from "@/components/sections/EbookCapture";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Solutions />
        <Differentials />
        <Process />
        <Testimonials />
        <Mentoria />
        <EbookCapture />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}