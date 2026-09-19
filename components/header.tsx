"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Globe, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/contexts/language-context"
import { WHATSAPP_URL } from "@/lib/site"

/**
 * The navigation is made of real anchors. It used to be `<button>` plus
 * `scrollIntoView`, which a crawler cannot follow and a keyboard user cannot
 * open in a new tab. The smooth scroll now lives in CSS.
 */
const SECTIONS = ["about", "projects", "contact"] as const

/**
 * The theme switch. `next-themes` resolves the system preference on the
 * client, so the icon only renders after mount — otherwise the server would
 * guess and hydrate wrong.
 */
function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={label}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="text-foreground"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </Button>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { language, setLanguage, translations } = useLanguage()

  const toggleLanguage = () => setLanguage(language === "en" ? "es" : "en")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a
              href="#hero"
              aria-label={translations.nav.home}
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              {translations.name}
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-8" aria-label={translations.nav.home}>
            {SECTIONS.map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {translations.nav[section]}
              </a>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              aria-label={translations.nav.toggleLanguage}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              <Globe className="h-4 w-4 mr-2" aria-hidden="true" />
              {language === "en" ? "ES" : "EN"}
            </Button>
            <ThemeToggle label={translations.nav.toggleTheme} />
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {translations.nav.workTogether}
              </a>
            </Button>
          </nav>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle label={translations.nav.toggleTheme} />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              aria-label={translations.nav.toggleLanguage}
              className="text-foreground"
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? translations.nav.closeMenu : translations.nav.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-foreground"
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <nav className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
              {SECTIONS.map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-3 py-2 text-foreground/80 hover:text-primary hover:bg-muted rounded-md transition-colors font-medium"
                >
                  {translations.nav[section]}
                </a>
              ))}
              <div className="px-3 py-2">
                <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    {translations.nav.workTogether}
                  </a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
