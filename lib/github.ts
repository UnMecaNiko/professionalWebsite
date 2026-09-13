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

export interface ImpactMetric {
  name: string
  value: string
  unit?: string
}

export interface ProjectLink {
  key: string
  url: string
}

export interface ProjectMetadata {
  title: string
  slug: string
  description: string
  status: string
  /** Normalized from `date_start`. May be a partial date such as "2026". */
  startDate: string
  /** Normalized from `date_end`. Empty while the project is ongoing. */
  endDate: string
  /** Sortable key derived from startDate; partial dates are padded. */
  sortKey: string
  categories: string[]
  /** Normalized from `tech`. */
  technologies: string[]
  tags: string[]
  role: string[]
  team: string[]
  cover: string
  gallery: GalleryImage[]
  videos: Video[]
  links: ProjectLink[]
  /** Normalized from `links.demo`. */
  website?: string
  /** Normalized from `links.repo`. */
  github?: string
  highlights: string[]
  metrics: ImpactMetric[]
  lastUpdated?: string
  featured?: boolean
}

export interface Project {
  metadata: ProjectMetadata
  content: string
}

const GITHUB_API_BASE = "https://api.github.com"
const REPO_OWNER = "UnMecaNiko"
const REPO_NAME = "unmecaniko-projects"

/**
 * The content repository writes snake_case front-matter (`date_start`, `tech`,
 * `links.repo`). The components read camelCase. Everything is normalized here,
 * in one place, so a rename in the content never has to touch a component.
 */

/** YAML gives us strings, numbers, null or a malformed value. Coerce to a list of strings. */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item) => item != null).map((item) => String(item))
  }
  if (typeof value === "string" && value.trim() !== "") return [value]
  return []
}

/** `videos: {}` and `gallery:` (empty) both appear in the content. Only keep real arrays. */
function toObjectArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

/**
 * Dates are written as `YYYY-MM-DD`, but partial values exist (`"2026"`,
 * `"2021-10-5"`). Pad to a comparable `YYYY-MM-DD` so sorting is stable.
 */
function toSortKey(date: unknown): string {
  if (typeof date !== "string" || date.trim() === "") return "0000-00-00"
  const [year = "0000", month = "00", day = "00"] = date.trim().split("-")
  return `${year.padStart(4, "0")}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
}

/** `links:` is sometimes empty (null). Flatten it into an ordered list. */
function toLinks(value: unknown): ProjectLink[] {
  if (value == null || typeof value !== "object" || Array.isArray(value)) return []
  return Object.entries(value as Record<string, unknown>)
    .filter(([, url]) => typeof url === "string" && url.trim() !== "")
    .map(([key, url]) => ({ key, url: String(url) }))
}

function toMetrics(value: unknown): ImpactMetric[] {
  return toObjectArray<Record<string, unknown>>(value)
    .filter((metric) => metric && metric.name != null && metric.value != null)
    .map((metric) => ({
      name: String(metric.name),
      value: String(metric.value),
      unit: metric.unit != null && String(metric.unit).trim() !== "" ? String(metric.unit) : undefined,
    }))
}

function normalize(frontmatter: Record<string, any>, slug: string): ProjectMetadata {
  const links = toLinks(frontmatter.links)
  const impact = frontmatter.impact ?? {}

  return {
    title: String(frontmatter.title ?? slug),
    slug,
    description: String(frontmatter.description ?? ""),
    status: String(frontmatter.status ?? ""),
    startDate: typeof frontmatter.date_start === "string" ? frontmatter.date_start.trim() : "",
    endDate: typeof frontmatter.date_end === "string" ? frontmatter.date_end.trim() : "",
    sortKey: toSortKey(frontmatter.date_start),
    categories: toStringArray(frontmatter.categories),
    technologies: toStringArray(frontmatter.tech),
    tags: toStringArray(frontmatter.tags),
    role: toStringArray(frontmatter.role),
    team: toStringArray(frontmatter.team),
    cover: String(frontmatter.cover ?? ""),
    gallery: toObjectArray<GalleryImage>(frontmatter.gallery),
    videos: toObjectArray<Video>(frontmatter.videos),
    links,
    website: links.find((link) => link.key === "demo")?.url,
    github: links.find((link) => link.key === "repo")?.url,
    highlights: toStringArray(impact?.highlights),
    metrics: toMetrics(impact?.metrics),
    lastUpdated: typeof frontmatter.last_updated === "string" ? frontmatter.last_updated : undefined,
    featured: frontmatter.featured === true,
  }
}

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
      metadata: normalize(frontmatter, slug),
      content: markdownContent,
    }
  } catch (error) {
    console.error(`Error fetching project ${slug}:`, error)
    return null
  }
}

const VERSIONED_SLUG = /^(.*)-v(\d+)$/i

/** Same family, different version: newest version first (v3, v2, v1). */
function compareProjectSlugs(a: string, b: string): number {
  const left = a.match(VERSIONED_SLUG)
  const right = b.match(VERSIONED_SLUG)
  if (left && right && left[1].toLowerCase() === right[1].toLowerCase()) {
    return Number(right[2]) - Number(left[2])
  }
  return a.localeCompare(b)
}

/**
 * Featured projects first, then most recent by start date, and versioned slugs
 * newest-first when the dates tie. The GitHub API lists directories
 * alphabetically, which would open the portfolio with a 2021 build.
 */
export async function getAllProjects(): Promise<Project[]> {
  const slugs = await getProjectSlugs()
  const projects = await Promise.all(slugs.map((slug) => getProject(slug)))

  return projects
    .filter((project): project is Project => project !== null)
    .sort((a, b) => {
      if (a.metadata.featured !== b.metadata.featured) return a.metadata.featured ? -1 : 1
      const byDate = b.metadata.sortKey.localeCompare(a.metadata.sortKey)
      if (byDate !== 0) return byDate
      return compareProjectSlugs(a.metadata.slug, b.metadata.slug)
    })
}
