"use client"

import { Linkedin, Github, Youtube, Mail } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { EMAIL, GITHUB_URL, LINKEDIN_URL, YOUTUBE_URL } from "@/lib/site"

const socialLinks = [
  { name: "LinkedIn", icon: Linkedin, url: LINKEDIN_URL },
  { name: "GitHub", icon: Github, url: GITHUB_URL },
  { name: "YouTube", icon: Youtube, url: YOUTUBE_URL },
  { name: "Email", icon: Mail, url: `mailto:${EMAIL}` },
]

export function Footer() {
  const { translations } = useLanguage()

  return (
    <footer className="bg-surface-dark text-on-dark border-t border-on-dark/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_190px] gap-8">
          <div>
            <p className="text-h3 text-on-dark measure">Nicolas Velasquez Lopez</p>
            <p className="measure text-small text-on-dark/75 mt-2">{translations.footer.description}</p>

            {/* These were icon-only buttons with no accessible name and no
                href: a screen reader announced four buttons called "button". */}
            <ul className="flex gap-6 mt-6">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    aria-label={social.name}
                    {...(social.url.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "me noopener noreferrer" })}
                    className="inline-flex items-center gap-2 text-on-dark/75 hover:text-lime transition-colors"
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                    <span className="label">{social.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="label text-lime pb-2 border-b border-on-dark/20">{translations.footer.services.title}</h3>
            <ul className="text-small text-on-dark/75">
              {translations.footer.services.list.map((service) => (
                <li key={service} className="py-2 border-b border-on-dark/20">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-on-dark/20 mt-12 pt-6 flex flex-col sm:flex-row gap-2 sm:justify-between">
          <p className="font-mono text-small text-on-dark/60">{translations.footer.copyright}</p>
          <p className="font-mono text-small text-on-dark/60">{translations.footer.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
