"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowDown } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const { translations } = useLanguage()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-primary/5"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Profile image */}
        <div className="mb-8">
          <Image
            src="/nicolas-profile.jpg"
            alt="Nicolas Velasquez Lopez"
            width={192}
            height={192}
            priority
            className="w-48 h-48 rounded-full mx-auto border-4 border-primary/20 shadow-2xl object-cover"
          />
        </div>

        <div className="text-lg text-muted-foreground mb-2">{translations.hero.greeting}</div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Nicolas Velasquez Lopez
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto">{translations.hero.title}</p>

        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{translations.hero.subtitle}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <a
              href="https://wa.me/573204081631?text=Hola Nico, vi tu página web y quiero contactar contigo."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
              {translations.contact.whatsapp}
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="bg-transparent">
            <a href="#projects">
              {translations.hero.cta}
              <ArrowDown className="ml-2 h-5 w-5" aria-hidden="true" />
            </a>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{"5+"}</div>
            <div className="text-muted-foreground">{"Official Certifications"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Completed Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Students Trained</div>
          </div>
        </div>
      </div>
    </section>
  )
}
