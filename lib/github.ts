import matter from "gray-matter"

export interface GalleryImage {
  url: string
  caption?: string
}

export interface Video {
  provider: string
  id: string
  title?: string
}

export interface ProjectMetadata {
  title: string
  slug: string
  description: string
  status: string
  startDate: string
  endDate?: string
  categories: string[]
  tech: string[]
  tags: string[]
  cover: string
  gallery?: GalleryImage[]
  videos?: Video[]
  team?: string[]
  client?: string
  location?: string
  budget?: string
  website?: string
  github?: string
}

export interface Project {
  metadata: ProjectMetadata
  content: string
}

const GITHUB_API_BASE = "https://api.github.com"
const REPO_OWNER = "UnMecaNiko"
const REPO_NAME = "unmecaniko-projects"

export async function getProjectSlugs(): Promise<string[]> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/projects`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 300 }, // Revalidar cada 5 minutos
    })

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`)
    }

    const contents = await response.json()

    // Filtrar solo directorios
    return contents.filter((item: any) => item.type === "dir").map((item: any) => item.name)
  } catch (error) {
    console.error("Error fetching project slugs:", error)
    return []
  }
}

export async function getProject(slug: string): Promise<Project | null> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/projects/${slug}/index.md`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 },
      },
    )

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    const content = Buffer.from(data.content, "base64").toString("utf-8")

    const { data: frontmatter, content: markdownContent } = matter(content)

    return {
      metadata: {
        ...frontmatter,
        slug,
      } as ProjectMetadata,
      content: markdownContent,
    }
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getProjectSlugs()
  const projects = await Promise.all(slugs.map((slug) => getProject(slug)))

  return projects.filter((project): project is Project => project !== null)
}
