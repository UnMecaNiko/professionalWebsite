import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Bot, GraduationCap } from "lucide-react"

export function About() {
  const expertise = [
    {
      icon: Cloud,
      title: "Arquitectura en Nube",
      description: "Diseño e implementación de soluciones escalables en AWS, Azure y Google Cloud",
    },
    {
      icon: Bot,
      title: "Inteligencia Artificial",
      description: "Desarrollo de sistemas AI/ML para automatización y análisis de datos",
    },
    {
      icon: Bot,
      title: "Robótica",
      description: "Integración de sistemas robóticos con tecnologías de nube e IA",
    },
    {
      icon: GraduationCap,
      title: "Educación",
      description: "Formación técnica y transferencia de conocimiento en tecnologías emergentes",
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mí</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Soy un profesional apasionado por la tecnología con experiencia en arquitectura de soluciones, inteligencia
            artificial y robótica. Mi background en educación me permite comunicar conceptos complejos de manera clara y
            efectiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((item, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Mi Trayectoria</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Arquitecto de Soluciones</h4>
                  <p className="text-muted-foreground">
                    Especializado en migración a la nube y optimización de infraestructura
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Desarrollador de IA</h4>
                  <p className="text-muted-foreground">
                    Implementación de modelos de machine learning y automatización inteligente
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Educador Técnico</h4>
                  <p className="text-muted-foreground">Formación de profesionales en tecnologías emergentes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="/professional-giving-tech-presentation.png"
              alt="Dando una charla técnica"
              className="rounded-lg shadow-lg"
            />
            <img src="/tech-team-collaboration.png" alt="Trabajando en equipo" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
