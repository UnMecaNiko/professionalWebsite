"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Project } from "@/lib/github"
import { formatYearRange } from "@/lib/format"

/**
 * Fixed reading order, and not negotiable:
 *
 *   cover 16:10 → category → title → role · years → one sentence →
 *   one impact metric → one action
 *
 * Role and years come before the description because that is the first thing
 * a recruiter needs. One metric as the hook; the rest belongs in the page.
 * One button: "View Details" and "Code" used to compete at equal weight and
 * neither won.
 *
 * If `links.site` is set, cover, title and the button all go there. The
 * write-up at `/projects/<slug>` still exists as the public knowledge base;
 * it is just not the card's destination.
 */
function cardHref(slug: string, site?: string) {
  return site ?? `/projects/${slug}`
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href)
}

function ProjectCardLink({
  href,
  className,
  children,
  ...rest
}: {
  href: string
  className?: string
  children: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} {...rest}>
      {children}
    </Link>
  )
}

export function ProjectsList({ projects }: { projects: Project[] }) {
  const { translations } = useLanguage()

  return (
    <section id="projects" className="border-b border-rule">
      <div className="container mx-auto px-4 py-12 md:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-8">
          <h2 className="label text-blue pt-1">{translations.projects.title}</h2>

          <div>
            <p className="label text-slate mb-8">{translations.projects.annotation(projects.length)}</p>

            {projects.length === 0 ? (
              <p className="text-slate">{translations.projects.empty}</p>
            ) : (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {projects.map((project) => {
                  const { metadata } = project
                  const years = formatYearRange(metadata.startDate, metadata.endDate, translations.projects.ongoing)
                  const headlineMetric = metadata.metrics[0]
                  const href = cardHref(metadata.slug, metadata.site)
                  const actionLabel = metadata.site
                    ? translations.projects.visitSite
                    : translations.projects.readCase

                  return (
                    <li key={metadata.slug} className="group border border-rule rounded-[2px] overflow-hidden flex flex-col">
                      <ProjectCardLink href={href} className="block" tabIndex={-1} aria-hidden="true">
                        <div className="relative w-full aspect-[16/10] bg-cover-matte">
                          <Image
                            src={metadata.cover || "/project-thumbnail.png"}
                            alt=""
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </ProjectCardLink>

                      <div className="flex flex-col flex-1 p-6">
                        {metadata.categories[0] && (
                          <p className="label text-blue mb-3">{metadata.categories[0]}</p>
                        )}

                        <h3 className="text-h3 text-ink">
                          <ProjectCardLink href={href} className="hover:text-blue transition-colors">
                            {metadata.title}
                          </ProjectCardLink>
                        </h3>

                        <p className="font-mono text-small tabular text-slate mt-2">
                          {[metadata.role.join(" · "), years].filter(Boolean).join("  ·  ")}
                        </p>

                        <p className="measure text-small text-slate mt-3">{metadata.description}</p>

                        {headlineMetric && (
                          <p className="mt-4 pt-4 border-t border-rule">
                            <span className="text-h2 tabular text-ink">
                              {headlineMetric.value}
                              {headlineMetric.unit ? <span className="text-h3"> {headlineMetric.unit}</span> : null}
                            </span>
                            <span className="label block mt-1 text-slate">{headlineMetric.name}</span>
                          </p>
                        )}

                        <p className="mt-auto pt-6">
                          <ProjectCardLink
                            href={href}
                            className="inline-flex items-center font-bold text-blue hover:underline underline-offset-4"
                          >
                            {actionLabel}
                            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                          </ProjectCardLink>
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
