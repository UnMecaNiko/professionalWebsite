import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { SpeakingCarousel } from "@/components/speaking-carousel"
import { ProjectsList } from "@/components/projects-list"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { getAllProjects } from "@/lib/github"

/**
 * The projects are fetched here, on the server, so they ship inside the HTML.
 * Loading them from the client left crawlers looking at a spinner.
 */
export default async function Home() {
  const projects = await getAllProjects()

  return (
    <main className="min-h-screen">
      <Header />
      <div className="pt-16">
        <Hero />
        <About />
        <SpeakingCarousel />
        <ProjectsList projects={projects} />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
