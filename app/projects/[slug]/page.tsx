import { notFound } from "next/navigation"
import { getProject, getAllProjects } from "@/lib/github"
import { ProjectDetail } from "@/components/project-detail"

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
    title: `${project.metadata.title} - Nicolas Velasquez Lopez`,
    description: project.metadata.description,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.description,
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

  return <ProjectDetail project={project} />
}
