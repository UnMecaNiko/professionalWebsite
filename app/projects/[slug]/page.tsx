import { notFound } from "next/navigation"
import { getProject, getAllProjects } from "@/lib/github"
import { ProjectDetail } from "@/components/project-detail"
import { ProjectJsonLd } from "@/components/structured-data"

interface ProjectPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.metadata.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    return {
      title: "Project not found",
    }
  }

  return {
    // `seo_title` and `seo_description` are written for all eight projects and
    // were never read; the plain title and description are the fallback.
    title: project.metadata.seoTitle ?? project.metadata.title,
    description: project.metadata.seoDescription ?? project.metadata.description,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/projects/${slug}`,
      title: project.metadata.seoTitle ?? project.metadata.title,
      description: project.metadata.seoDescription ?? project.metadata.description,
      images: project.metadata.cover ? [project.metadata.cover] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.metadata.seoTitle ?? project.metadata.title,
      description: project.metadata.seoDescription ?? project.metadata.description,
      images: project.metadata.cover ? [project.metadata.cover] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      <ProjectJsonLd project={project} />
      <ProjectDetail project={project} />
    </>
  )
}
