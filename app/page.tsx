import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Career } from "@/components/career"
import { Speaking } from "@/components/speaking"
import { ProjectsList } from "@/components/projects-list"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { PersonJsonLd } from "@/components/structured-data"
import { getAllProjects } from "@/lib/github"
import { SITE_DESCRIPTION } from "@/lib/site"

/**
 * The projects are fetched here, on the server, so they ship inside the HTML.
 * Loading them from the client left crawlers looking at a spinner.
 */
export default async function Home() {
  const projects = await getAllProjects()

  return (
    <main id="main" className="min-h-screen">
      <PersonJsonLd description={SITE_DESCRIPTION} />
      <Header />
      <div className="pt-16">
        {/* The project count is passed in rather than written down: a number
            on the page that can drift from reality is a number that will. */}
        <Hero projectCount={projects.length} />
        <About />
        <ProjectsList projects={projects} />
        <Career />
        <Speaking />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}
