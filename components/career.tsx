"use client"

import { useLanguage } from "@/contexts/language-context"

/**
 * Source: knowledge/identity/trayectoria.md (verified 2026-08-14 against
 * LinkedIn) and knowledge/identity/formacion.md. Only employer, role, period
 * and place — the commercial results and client names in those documents are
 * internal and stay internal.
 *
 * The years are mono with tabular figures so the column aligns on the digit,
 * not on the glyph width.
 */
const ROLES = [
  { from: "2025", to: null, org: "Truora", role: "Solutions Engineer", place: "Bogotá" },
  {
    from: "2025",
    to: "2025",
    org: "UnMecaNiko.com",
    role: "Independent AI and automation consultant",
    place: "Bogotá",
  },
  {
    from: "2024",
    to: "2025",
    org: "Huawei",
    role: "Named Accounts Cloud Solutions Architect",
    place: "Bogotá",
  },
  { from: "2024", to: "2024", org: "Huawei", role: "Cloud Solutions Architect Intern", place: "Bogotá" },
  {
    from: "2023",
    to: "2024",
    org: "Asociación Astronáutica Colombiana",
    role: "Science instructor, Space Call",
    place: "Colombia",
  },
  {
    from: "2023",
    to: "2024",
    org: "Lápiz Labs",
    role: "Co-founder, coordinator and instructor",
    place: "Colombia",
  },
  { from: "2023", to: "2023", org: "Robótica for Kids", role: "Robotics teacher and designer", place: "Colombia" },
  {
    from: "2020",
    to: "2020",
    org: "Universidad Militar Nueva Granada",
    role: "Peer mentor, Amigo Mentor programme",
    place: "Colombia",
  },
]

const EDUCATION = [
  {
    from: "2019",
    to: "2023",
    org: "Universidad Militar Nueva Granada",
    role: "Mechatronics Engineering",
    place: "Colombia",
  },
]

export function Career() {
  const { translations } = useLanguage()
  const t = translations.career

  const row = (entry: (typeof ROLES)[number]) => {
    const years = entry.to === null ? `${entry.from} — ${t.present}` : entry.from === entry.to ? entry.from : `${entry.from} — ${entry.to}`

    return (
      <li
        key={`${entry.org}-${entry.role}`}
        className="grid grid-cols-1 sm:grid-cols-[190px_1fr_110px] gap-x-4 gap-y-1 py-4 border-b border-rule"
      >
        <span className="font-mono text-small tabular text-slate whitespace-nowrap">{years}</span>
        <span>
          <span className="block text-body font-bold text-ink">{entry.org}</span>
          <span className="block text-small text-slate">{entry.role}</span>
        </span>
        <span className="font-mono text-small text-slate sm:text-right">{entry.place}</span>
      </li>
    )
  }

  return (
    <section id="career" className="border-b border-rule">
      <div className="container mx-auto px-4 py-12 md:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-8">
          <h2 className="label text-blue pt-1">{t.title}</h2>

          <div>
            <p className="measure text-h3 font-normal text-ink mb-8">{t.description}</p>

            <ul className="border-t border-ink">{ROLES.map(row)}</ul>

            <h3 className="label text-slate mt-12 pb-2 border-b border-ink/25">Education</h3>
            <ul>{EDUCATION.map(row)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}
