import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "Sistema de Automatización Industrial",
      description:
        "Plataforma IoT para monitoreo y control de procesos industriales usando AWS IoT Core y machine learning para predicción de mantenimiento.",
      image: "/industrial-automation-dashboard.png",
      technologies: ["AWS IoT", "Python", "TensorFlow", "React", "Node.js"],
      category: "Cloud & AI",
      link: "#",
      github: "#",
    },
    {
      title: "Robot Educativo Inteligente",
      description:
        "Desarrollo de robot educativo con capacidades de IA para enseñanza interactiva de programación y robótica en instituciones educativas.",
      image: "/educational-robot-with-students.png",
      technologies: ["ROS", "OpenCV", "Python", "Arduino", "Machine Learning"],
      category: "Robótica & Educación",
      link: "#",
      github: "#",
    },
    {
      title: "Plataforma de Análisis de Datos",
      description:
        "Sistema de big data para análisis en tiempo real de métricas empresariales con dashboards interactivos y alertas inteligentes.",
      image: "/data-analytics-dashboard.png",
      technologies: ["Azure", "Power BI", "Apache Spark", "Docker", "Kubernetes"],
      category: "Cloud & Analytics",
      link: "#",
      github: "#",
    },
    {
      title: "Chatbot Educativo con IA",
      description:
        "Asistente virtual inteligente para instituciones educativas que responde preguntas académicas y guía a estudiantes en su proceso de aprendizaje.",
      image: "/ai-chatbot-education-interface.png",
      technologies: ["OpenAI GPT", "Node.js", "MongoDB", "React", "WebSocket"],
      category: "AI & Educación",
      link: "#",
      github: "#",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Una selección de proyectos que demuestran mi experiencia en arquitectura de soluciones, inteligencia
            artificial y robótica aplicada a diferentes industrias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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
                    Ver Proyecto
                  </Button>
                  <Button size="sm" variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    Código
                  </Button>
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
