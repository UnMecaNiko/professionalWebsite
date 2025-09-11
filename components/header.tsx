"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, translations } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "es" : "en")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Name */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {"Nicolas Velasquez Lopez"}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {translations.nav.about}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {translations.nav.projects}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {translations.nav.contact}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === "en" ? "ES" : "EN"}
            </Button>
            <Button
              onClick={() =>
                window.open(
                  "https://wa.me/573204081631?text=Hola Nico, vi tu página web y quiero contactar contigo.",
                  "_blank",
                )
              }
              className="bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
            >
              {translations.nav.workTogether}
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-foreground">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors font-medium"
              >
                {translations.nav.about}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors font-medium"
              >
                {translations.nav.projects}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors font-medium"
              >
                {translations.nav.contact}
              </button>
              <div className="px-3 py-2">
                <Button
                  onClick={() =>
                    window.open(
                      "https://wa.me/573204081631?text=Hola Nico, vi tu página web y quiero contactar contigo.",
                      "_blank",
                    )
                  }
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
                >
                  {translations.nav.workTogether}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
