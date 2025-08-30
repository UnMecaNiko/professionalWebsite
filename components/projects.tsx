"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Projects() {
  const { translations } = useLanguage()

  const projects = [
    {
      title: translations.projects.project1.title,
      description: translations.projects.project1.desc,
      image: "/domichat-whatsapp-interface.png",
      technologies: ["WhatsApp API", "evolution API", "n8n", "React", "Cloud & AI"],
      category: "Cloud & AI",
      link: "https://www.domichat.com.co/",
      github: "https://github.com/FelipeUribe81/domichat-landing-front",
    },
    {
      title: translations.projects.project2.title,
      description: translations.projects.project2.desc,
      image: "/cnc-laser-hummingbird-engraving.jpg",
      technologies: ["ROS", "OpenCV", "Python", "Arduino", "Machine Learning"],
      category: "Robotics & Education",
      link: "https://www.youtube.com/shorts/PLy-GjmDeoE",
      github: "https://www.youtube.com/shorts/PLy-GjmDeoE",
    },
    {
      title: translations.projects.project3.title,
      description: translations.projects.project3.desc,
      image: "/space-call-classroom-workshop.png",
      technologies: [
        "Electronics",
        "Arduino",
        "Satellite Communication",
        "International Collaboration",
        "STEM Education",
      ],
      category: "Robotics & Education",
      link: "https://www.linkedin.com/posts/unmecaniko_big-news-rascube-1-is-go-for-launch-activity-7340941239036391424-nZjB?utm_source=share&utm_medium=member_desktop&rcm=ACoAADB8cWkB076ZBS6LM-SmQs3e5qlvd8zIj7s",
      github: "https://www.linkedin.com/posts/unmecaniko_astcol-spacecallproject-colombia-activity-7222673756224167936-6GEb?utm_source=share&utm_medium=member_desktop&rcm=ACoAADB8cWkB076ZBS6LM-SmQs3e5qlvd8zIj7s",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.projects.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.projects.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 ${index === 1 ? "object-bottom" : "object-center"
                    }`}
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary">{project.category}</Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button size="sm" className="flex-1">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {translations.projects.viewDetails}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
