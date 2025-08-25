"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Hablemos de tu Proyecto</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? Me encantaría conocer más sobre tus ideas y cómo puedo ayudarte a convertirlas
            en realidad.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-primary text-primary-foreground mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <MessageCircle className="h-10 w-10" />
                <div>
                  <h3 className="text-2xl font-semibold">WhatsApp</h3>
                  <p className="opacity-90">Respuesta rápida garantizada</p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactar por WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="font-semibold mb-6 text-xl">¿Por qué trabajar conmigo?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Experiencia comprobada en proyectos complejos
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Enfoque educativo y comunicación clara
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Soluciones escalables y sostenibles
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  Acompañamiento integral del proyecto
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
