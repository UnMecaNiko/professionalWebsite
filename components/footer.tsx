"use client"

import { Button } from "@/components/ui/button"
import { Linkedin, Github, Youtube, Mail, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const WHATSAPP_URL =
  "https://wa.me/573204081631?text=Hola Nico, vi tu página web y quiero contactar contigo."
const LINKEDIN_URL = "https://www.linkedin.com/in/unmecaniko/"

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, url: LINKEDIN_URL, primary: true },
  { name: "GitHub", icon: Github, url: "https://github.com/UnMecaNiko", primary: false },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@unmecaniko", primary: false },
  { name: "Email", icon: Mail, url: "mailto:unmecaniko@gmail.com", primary: false },
]

export function Footer() {
  const { translations } = useLanguage()

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nicolas Velasquez Lopez</h3>
            <p className="opacity-90 mb-4">{translations.footer.description}</p>
            <div className="flex gap-3">
              {/*
                These were icon-only `<button>` elements with no accessible name
                and no href: a screen reader announced four buttons called
                "button", and a crawler saw no outbound links at all.
              */}
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  asChild
                  variant={social.primary ? "secondary" : "ghost"}
                  size="sm"
                  className={social.primary ? "" : "text-primary-foreground hover:bg-primary-foreground/10"}
                >
                  <a
                    href={social.url}
                    aria-label={social.name}
                    {...(social.url.startsWith("mailto:") ? {} : { target: "_blank", rel: "me noopener noreferrer" })}
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
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
              <Button asChild variant="secondary" className="w-full justify-start">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="w-full justify-start text-primary-foreground hover:bg-primary-foreground/10"
              >
                <a href={LINKEDIN_URL} target="_blank" rel="me noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
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
