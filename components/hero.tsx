"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { WHATSAPP_URL } from "@/lib/site"

/**
 * Two columns: the text on the left, the portrait on the right, aligned with
 * the headline. No `min-h-screen`, so the work starts above the fold; no
 * gradient on the name, which was the single most template-looking thing on
 * the page; and no 192px circle floating over a centred column.
 *
 * The portrait has no caption because `web/media.yaml` has no confirmed year
 * or credit for it. A caption with an invented year is worse than no caption.
 */
export function Hero({ projectCount }: { projectCount: number }) {
  const { translations } = useLanguage()
  const facts = translations.hero.facts

  const stats = [
    { value: facts.certificationsValue, short: facts.certificationsShort, full: facts.certifications },
    { value: String(projectCount), short: facts.projectsShort, full: facts.projects },
    { value: facts.orbitValue, short: facts.orbitShort, full: facts.orbit },
  ]

  return (
    <section id="hero" className="border-b border-rule">
      <div className="container mx-auto px-4 py-12 md:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12 items-start">
          <div>
            <p className="label text-slate mb-4">{translations.hero.greeting}</p>

            <h1 className="text-h1 md:text-display text-ink text-balance">Nicolas Velasquez Lopez</h1>

            <p className="mt-4 text-h3 text-blue">{translations.hero.title}</p>

            <p className="mt-4 measure text-body text-slate">{translations.hero.subtitle}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                  {translations.contact.whatsapp}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#projects">
                  {translations.hero.cta}
                  <ArrowDown className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Three facts, each of which can be pointed at a document. */}
            <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 border-t border-rule">
              {stats.map((stat) => (
                <div key={stat.short} className="py-4 sm:pr-6 border-b sm:border-b-0 border-rule">
                  <dt className="sr-only">{stat.full}</dt>
                  <dd>
                    <span className="block text-h1 tabular text-ink">{stat.value}</span>
                    <span className="block mt-1 text-small text-slate" title={stat.full}>
                      {stat.short}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
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
    </section>
  )
}
