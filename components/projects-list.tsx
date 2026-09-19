"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { Project } from "@/lib/github"
import { formatYearRange } from "@/lib/format"
import Link from "next/link"
import Image from "next/image"

export function ProjectsList({ projects }: { projects: Project[] }) {
  const { translations } = useLanguage()

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.projects.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.projects.subtitle}</p>
        </div>

        {projects.length === 0 ? (
          <p className="text-center text-muted-foreground">{translations.projects.empty}</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => {
              const { metadata } = project
              const years = formatYearRange(metadata.startDate, metadata.endDate, translations.projects.ongoing)
              const headlineMetric = metadata.metrics[0]

              return (
                <Card key={metadata.slug} className="overflow-hidden hover:shadow-xl transition-shadow group">
                  <Link href={`/projects/${metadata.slug}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={metadata.cover || "/project-thumbnail.png"}
                        alt={metadata.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {metadata.categories[0] && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary">{metadata.categories[0]}</Badge>
                        </div>
                      )}
                    </div>
                  </Link>

                  <CardHeader>
                    {/* Role and years: the first thing a recruiter looks for. */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                      {metadata.role.length > 0 && <span className="font-medium">{metadata.role.join(" · ")}</span>}
                      {years && <span>{years}</span>}
                    </div>
                    <CardTitle className="text-xl">
                      <Link href={`/projects/${metadata.slug}`} className="hover:text-accent transition-colors">
                        {metadata.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground mb-4">{metadata.description}</p>

                    {headlineMetric && (
                      <p className="mb-4 text-sm">
                        <span className="font-semibold text-foreground">
                          {headlineMetric.value}
                          {headlineMetric.unit ? ` ${headlineMetric.unit}` : ""}
                        </span>{" "}
                        <span className="text-muted-foreground">{headlineMetric.name}</span>
                      </p>
                    )}

                    {metadata.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {metadata.technologies.slice(0, 6).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/projects/${metadata.slug}`}>
                          {translations.projects.viewDetails}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>

                      {metadata.github && (
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                          <a href={metadata.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" />
                            {translations.projects.code}
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
