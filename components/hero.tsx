"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { CV_URL } from "@/lib/site"

/**
 * Two columns: the text on the left, the portrait on the right, aligned with
 * the headline. No `min-h-screen`, so the work starts above the fold; no
 * gradient on the name, which was the single most template-looking thing on
 * the page; and no 192px circle floating over a centred column.
 *
 * The headline is the sentence, not the name: the name is in the header on
 * every page, and a recruiter reads what you do before who you are. Copy taken
 * literally from the phase 3 design canvas.
 *
 * The portrait has no caption because `web/media.yaml` has no confirmed year
 * or credit for it. The mockup captions it "Bogotá, 2026"; that year is not in
 * any document, and an invented caption is worse than no caption.
 */
export function Hero({ projectCount }: { projectCount: number }) {
  const { translations } = useLanguage()
  const t = translations.hero
  const facts = t.facts

  /* Three facts, each of which can be pointed at a document. */
  const band = [
    { label: facts.certifiedLabel, statement: facts.certified },
    { label: facts.documentedLabel, statement: facts.documented(projectCount) },
    { label: facts.orbitLabel, statement: facts.orbit },
  ]

  return (
    <section id="hero" className="border-b border-rule">
      <div className="container mx-auto px-4 py-12 md:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
          <div>
            <p className="label text-blue mb-6">{t.eyebrow}</p>

            <h1 className="text-h1 md:text-display text-ink text-balance">{t.headline}</h1>

            <p className="mt-8 measure text-body text-slate">{t.subtitle}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a href="#projects">
                  {t.seeWork}
                  <ArrowDown className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={CV_URL} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-5 w-5" aria-hidden="true" />
                  {t.downloadCv}
                </a>
              </Button>
            </div>
          </div>

          <div className="order-first lg:order-last">
            <Image
              src="/nicolas-profile.jpg"
              alt="Nicolas Velasquez Lopez"
              width={420}
              height={500}
              priority
              sizes="(max-width: 1024px) 60vw, 420px"
              className="w-full max-w-[420px] h-[500px] object-cover rounded-[2px]"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
        </div>
      </div>

      {/* The band of verifiable facts, full width, as drawn. */}
      <dl className="border-t border-rule">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3">
          {band.map((fact) => (
            <div
              key={fact.label}
              className="py-6 sm:pr-8 border-b sm:border-b-0 sm:border-l first:sm:border-l-0 sm:pl-8 first:sm:pl-0 border-rule"
            >
              <dt className="label text-slate">{fact.label}</dt>
              <dd className="mt-2 text-body font-bold text-ink">{fact.statement}</dd>
            </div>
          ))}
        </div>
      </dl>
    </section>
  )
}
