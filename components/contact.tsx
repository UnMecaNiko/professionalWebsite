"use client"

import { Github, Linkedin, Mail, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from "@/lib/site"

/**
 * Email, LinkedIn, WhatsApp, GitHub — the four channels the mockup draws, each
 * with the one line that says what it is good for. The block sits on ink, and
 * its labels are the only lime in the whole page: the colour is unreadable on
 * light backgrounds (1.56 on paper, measured) and pulls the palette towards
 * "startup". It appears once, which is why it registers.
 *
 * The "Why work with me?" block that used to close this section is gone. It
 * was four self-assessments ("I leave a part of myself in every project") with
 * nothing behind them, and the mockup does not have it.
 */
export function Contact() {
  const { translations } = useLanguage()
  const t = translations.contact

  const channels = [
    { label: t.emailLabel, hint: t.emailHint, icon: Mail, value: EMAIL, href: `mailto:${EMAIL}`, external: false },
    {
      label: t.linkedinLabel,
      hint: t.linkedinHint,
      icon: Linkedin,
      value: "/in/unmecaniko",
      href: LINKEDIN_URL,
      external: true,
    },
    {
      label: t.whatsappLabel,
      hint: t.whatsappHint,
      icon: MessageCircle,
      value: "+57 320 408 1631",
      href: WHATSAPP_URL,
      external: true,
    },
    {
      label: t.githubLabel,
      hint: t.githubHint,
      icon: Github,
      value: "@UnMecaNiko",
      href: GITHUB_URL,
      external: true,
    },
  ]

  return (
    <section id="contact" className="bg-surface-dark text-on-dark">
      <div className="container mx-auto px-4 py-12 md:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-8">
          <h2 className="label text-lime pt-1">{translations.nav.contact}</h2>

          <div>
            <p className="measure text-h2 text-on-dark">{t.title}</p>
            <p className="measure text-body text-on-dark/75 mt-4">{t.subtitle}</p>

            <ul className="mt-12 border-t border-on-dark/20">
              {channels.map((channel) => (
                <li key={channel.label} className="border-b border-on-dark/20">
                  <a
                    href={channel.href}
                    {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="grid grid-cols-[24px_1fr] sm:grid-cols-[24px_110px_1fr] gap-x-4 gap-y-1 items-center py-4 group"
                  >
                    <channel.icon className="h-5 w-5 text-lime" aria-hidden="true" />
                    <span className="label text-lime">{channel.label}</span>
                    <span className="col-start-2 sm:col-start-3">
                      <span className="block text-h3 text-on-dark group-hover:underline underline-offset-4 break-all">
                        {channel.value}
                      </span>
                      <span className="block font-mono text-small text-on-dark/60 mt-1">{channel.hint}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
