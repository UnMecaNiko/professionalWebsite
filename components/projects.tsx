"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Project } from "@/lib/github"
import Link from "next/link"
import { useEffect, useState } from "react"

export function Projects() {
  const { translations } = useLanguage()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects")
        if (response.ok) {
          const data = await response.json()
          setProjects(data)
        }
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.projects.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.projects.subtitle}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">Cargando proyectos...</p>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.projects.title}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.projects.subtitle}</p>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">No hay proyectos disponibles en este momento.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.projects.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.projects.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={project.metadata.slug} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <Link href={`/projects/${project.metadata.slug}`} className="block">
                <div className="relative overflow-hidden cursor-pointer">
                  <img
                    src={project.metadata.cover || "/project-thumbnail.png"}
                    alt={project.metadata.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/project-thumbnail.png"
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{project.metadata.categories?.[0] || "Proyecto"}</Badge>
                  </div>
                </div>
              </Link>

              <CardHeader>
                <CardTitle className="text-xl">{project.metadata.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{project.metadata.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.metadata.technologies?.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button size="sm" className="flex-1" asChild>
                    <Link href={`/projects/${project.metadata.slug}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {translations.projects.viewDetails}
                    </Link>
                  </Button>

                  {project.metadata.github && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => window.open(project.metadata.github, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
