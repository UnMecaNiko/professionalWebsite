import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowDown } from "lucide-react"

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/abstract-cloud-computing-network-pattern.png')] opacity-5"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Profile image */}
        <div className="mb-8">
          <img
            src="/professional-headshot-of-tech-architect.png"
            alt="Nicolas Velasquez Lopez"
            className="w-48 h-48 rounded-full mx-auto border-4 border-primary/20 shadow-2xl"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Nicolas Velasquez Lopez
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">
          Arquitecto de Soluciones en Nube y AI
        </p>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Especialista en robótica, educación y tecnologías emergentes. Transformando ideas complejas en soluciones
          innovadoras.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <MessageCircle className="mr-2 h-5 w-5" />
            Contactar por WhatsApp
          </Button>
          <Button variant="outline" size="lg">
            Ver Proyectos
            <ArrowDown className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">Años de Experiencia</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Proyectos Completados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">100+</div>
            <div className="text-muted-foreground">Estudiantes Formados</div>
          </div>
        </div>
      </div>
    </section>
  )
}
