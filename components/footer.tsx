"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, Github, Youtube, Mail, MessageCircle } from "lucide-react"

export function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/nicolas-velasquez-lopez",
      primary: true,
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/nicolas-velasquez",
      primary: false,
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@nicolas-velasquez",
      primary: false,
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:nicolas@example.com",
      primary: false,
    },
  ]

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nicolas Velasquez Lopez</h3>
            <p className="opacity-90 mb-4">
              Arquitecto de Soluciones en Nube y AI, especializado en robótica y educación. Transformando ideas en
              soluciones tecnológicas innovadoras.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant={social.primary ? "secondary" : "ghost"}
                  size="sm"
                  className={social.primary ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}
                  onClick={() => window.open(social.url, "_blank")}
                >
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 opacity-90">
              <li>Arquitectura en Nube</li>
              <li>Desarrollo de IA/ML</li>
              <li>Sistemas Robóticos</li>
              <li>Consultoría Técnica</li>
              <li>Formación y Capacitación</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full justify-start"
                onClick={() => window.open("https://wa.me/1234567890", "_blank")}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => window.open("https://linkedin.com/in/nicolas-velasquez-lopez", "_blank")}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="opacity-75">© 2024 Nicolas Velasquez Lopez. Todos los derechos reservados.</p>
          <p className="opacity-60 text-sm mt-2">
            Especialista en Arquitectura de Soluciones • Cloud & AI • Robótica • Educación
          </p>
        </div>
      </div>
    </footer>
  )
}
