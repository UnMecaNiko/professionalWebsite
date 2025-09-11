"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, Github, Youtube, Mail, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { language, translations } = useLanguage()

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/unmecaniko",
      primary: true,
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/unmecaniko",
      primary: false,
    },
    {
      name: "YouTube",
      icon: Youtube,
      url: "https://youtube.com/@unmecaniko",
      primary: false,
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:unmecaniko@gmail.com",
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
            <p className="opacity-90 mb-4">{translations.footer.description}</p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant={social.primary ? "secondary" : "ghost"}
                  size="sm"
                  className={`cursor-pointer ${social.primary ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}`}
                  onClick={() => window.open(social.url, "_blank")}
                >
                  <social.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translations.footer.services.title}</h3>
            <ul className="space-y-2 opacity-90">
              {translations.footer.services.list.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">{translations.footer.contact.title}</h3>
            <div className="space-y-3">
              <Button
                variant="secondary"
                className="w-full justify-start cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://wa.me/573204081631?text=Hola Nico, vi tu página web y quiero contactar contigo.",
                    "_blank",
                  )
                }
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer"
                onClick={() => window.open("https://linkedin.com/in/unmecaniko", "_blank")}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="opacity-75">{translations.footer.copyright}</p>
          <p className="opacity-60 text-sm mt-2">{translations.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
