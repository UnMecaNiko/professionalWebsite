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

  const fallbackProjects = [
    {
      metadata: {
        title: translations.projects.project1.title,
        description: translations.projects.project1.desc,
        coverImage: "/domichat-whatsapp-interface.png",
        technologies: ["WhatsApp API", "evolution API", "n8n", "React", "Cloud & AI"],
        categories: ["Cloud & AI"],
        website: "https://www.domichat.com.co/",
        github: "https://github.com/FelipeUribe81/domichat-landing-front",
        slug: "domichat",
      },
    },
    {
      metadata: {
        title: translations.projects.project2.title,
        description: translations.projects.project2.desc,
        coverImage: "/cnc-laser-hummingbird-engraving.jpg",
        technologies: ["ROS", "OpenCV", "Python", "Arduino", "Machine Learning"],
        categories: ["Robotics & Education"],
        website: "https://www.youtube.com/shorts/PLy-GjmDeoE",
        github: "https://www.youtube.com/shorts/PLy-GjmDeoE",
        slug: "cnc-laser",
      },
    },
    {
      metadata: {
        title: translations.projects.project3.title,
        description: translations.projects.project3.desc,
        coverImage: "/space-call-classroom-workshop.png",
        technologies: [
          "Electronics",
          "Arduino",
          "Satellite Communication",
          "International Collaboration",
          "STEM Education",
        ],
        categories: ["Robotics & Education"],
        website:
          "https://www.linkedin.com/posts/unmecaniko_big-news-rascube-1-is-go-for-launch-activity-7340941239036391424-nZjB",
        github:
          "https://www.linkedin.com/posts/unmecaniko_astcol-spacecallproject-colombia-activity-7222673756224167936-6GEb",
        slug: "space-call",
      },
    },
  ]

  const displayProjects = projects.length > 0 ? projects : fallbackProjects

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

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.projects.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.projects.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayProjects.map((project, index) => (
            <Card
              key={project.metadata.slug || index}
              className="overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.metadata.coverImage || "/placeholder.svg"}
                  alt={project.metadata.title}
                  className={`w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ${
                    index === 1 ? "object-bottom" : "object-center"
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{project.metadata.categories?.[0] || "Proyecto"}</Badge>
                </div>
              </div>

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
                  {projects.length > 0 && project.metadata.slug ? (
                    <Button size="sm" className="flex-1" asChild>
                      <Link href={`/projects/${project.metadata.slug}`}>
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {translations.projects.viewDetails}
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => window.open(project.metadata.website, "_blank")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {translations.projects.viewDetails}
                    </Button>
                  )}

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

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todos los Proyectos
          </Button>
        </div>
      </div>
    </section>
  )
}
