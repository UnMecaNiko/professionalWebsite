import { notFound } from "next/navigation"
import { getProject, getAllProjects } from "@/lib/github"
import { ProjectDetail } from "@/components/project-detail"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((project) => ({
    slug: project.metadata.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Proyecto no encontrado",
    }
  }

  return {
    title: `${project.metadata.title} - Nicolas Velasquez Lopez`,
    description: project.metadata.description,
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.description,
      images: project.metadata.coverImage ? [project.metadata.coverImage] : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectDetail project={project} />
}
