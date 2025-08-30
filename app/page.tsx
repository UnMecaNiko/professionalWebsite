import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { SpeakingCarousel } from "@/components/speaking-carousel"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Hero />
        <About />
        <SpeakingCarousel />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
