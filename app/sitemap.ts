import type { MetadataRoute } from "next"
import { getAllProjects } from "@/lib/github"
import { SITE_URL } from "@/lib/site"

/** Same cadence as the project pages: the content repository is the source. */
export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getAllProjects()

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.metadata.slug}`,
      /** `last_updated` comes from the project front-matter; never invented. */
      lastModified: project.metadata.lastUpdated ? new Date(project.metadata.lastUpdated) : undefined,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]
}
