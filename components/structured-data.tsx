import type { Project } from "@/lib/github"
import { SITE_URL } from "@/lib/site"

/**
 * Structured data for search engines and for the AI crawlers that now answer
 * "who is this person" without ever rendering the page.
 *
 * Every field here mirrors something the site already states or that the
 * project front-matter already declares. Nothing is inferred: a schema is a
 * machine-readable claim, and an invented one is still a lie.
 */

const PERSON_ID = `${SITE_URL}/#person`

export function PersonJsonLd({ description }: { description: string }) {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Nicolas Velasquez Lopez",
    alternateName: "unmecaniko",
    url: SITE_URL,
    image: `${SITE_URL}/nicolas-profile.jpg`,
    jobTitle: "Cloud & AI Solutions Architect",
    description,
    sameAs: [
      "https://www.linkedin.com/in/unmecaniko/",
      "https://github.com/UnMecaNiko",
      "https://www.youtube.com/@unmecaniko",
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
}

export function ProjectJsonLd({ project }: { project: Project }) {
  const { metadata } = project

  const work = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: metadata.title,
    description: metadata.description,
    url: `${SITE_URL}/projects/${metadata.slug}`,
    ...(metadata.cover ? { image: metadata.cover } : {}),
    ...(metadata.startDate ? { dateCreated: metadata.startDate } : {}),
    ...(metadata.lastUpdated ? { dateModified: metadata.lastUpdated } : {}),
    ...(metadata.technologies.length ? { keywords: metadata.technologies.join(", ") } : {}),
    ...(metadata.categories.length ? { genre: metadata.categories } : {}),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(work) }} />
}
