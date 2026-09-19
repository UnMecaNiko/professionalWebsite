"use client"

import { Cloud, Bot, GraduationCap, Cpu } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

/**
 * Composition rule 1: a Card means something you can click. These four areas
 * are not clickable, so they lost their boxes and became rows separated by a
 * 1px rule. When everything sits in a shadowed container, nothing has
 * hierarchy and the page reads like an admin panel.
 */
export function About() {
  const { translations } = useLanguage()
  const t = translations.about

  const expertise = [
    { icon: Cloud, title: t.cloud, description: t.cloudDesc },
    { icon: Bot, title: t.ai, description: t.aiDesc },
    { icon: Cpu, title: t.robotics, description: t.roboticsDesc },
    { icon: GraduationCap, title: t.education, description: t.educationDesc },
  ]

  const roles = [
    { title: t.solutionsArchitect, description: t.solutionsArchitectDesc },
    { title: t.aiDeveloper, description: t.aiDeveloperDesc },
    { title: t.technicalEducator, description: t.technicalEducatorDesc },
  ]

  return (
    <section id="about" className="bg-cream border-b border-rule">
      <div className="container mx-auto px-4 py-12 md:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-8">
          <h2 className="label text-blue pt-1">{t.title}</h2>

          <div>
            {/* Justified text opens rivers of white space without hyphenation;
                it was also set on a 3xl measure, which made it worse. */}
            <p className="measure text-h3 font-normal text-ink">{t.description}</p>

            <h3 className="label text-slate mt-12 mb-0 pb-2 border-b border-ink/25">{t.expertise}</h3>
            <ul>
              {expertise.map((item) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[24px_1fr] sm:grid-cols-[24px_190px_1fr] gap-x-4 gap-y-1 py-4 border-b border-rule"
                >
                  <item.icon className="h-5 w-5 text-blue mt-1" aria-hidden="true" />
                  <h4 className="text-h3 text-ink">{item.title}</h4>
                  <p className="col-start-2 sm:col-start-3 measure text-small text-slate">{item.description}</p>
                </li>
              ))}
            </ul>

            <ul className="mt-12">
              {roles.map((role) => (
                <li key={role.title} className="grid grid-cols-1 sm:grid-cols-[190px_1fr] gap-x-4 py-4 border-b border-rule">
                  <h4 className="text-body font-bold text-ink">{role.title}</h4>
                  <p className="measure text-small text-slate">{role.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
