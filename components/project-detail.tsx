"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github, Calendar, Users, FileText, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { Project, ProjectLink } from "@/lib/github"
import { formatYearRange } from "@/lib/format"
import { useLanguage } from "@/contexts/language-context"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"

function linkIcon(key: string) {
  if (key.includes("repo") || key.includes("github")) return <Github className="h-4 w-4" />
  if (key.includes("post") || key.includes("linkedin")) return <Linkedin className="h-4 w-4" />
  if (key.includes("deck") || key.includes("pdf")) return <FileText className="h-4 w-4" />
  return <ExternalLink className="h-4 w-4" />
}

function linkLabel({ key }: ProjectLink) {
  if (key.includes("repo")) return "Repository"
  if (key.includes("demo")) return "Live demo"
  if (key.includes("deck")) return "Presentation"
  if (key.includes("post")) return "Post"
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ")
}

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { metadata, content } = project
  /** The cover lives in the content repository's bucket; if it 404s, fall back. */
  const [coverSrc, setCoverSrc] = useState(metadata.cover)
  const { translations } = useLanguage()
  const t = translations.project

  const years = formatYearRange(metadata.startDate, metadata.endDate, t.ongoing)
  const statusLabel = t.status[metadata.status as keyof typeof t.status] ?? metadata.status

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b border-rule">
        <div className="container mx-auto px-4 py-6">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="mb-4 cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.back}
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {metadata.categories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                {statusLabel && <Badge variant="outline">{statusLabel}</Badge>}
              </div>

              <h1 className="text-h1 text-ink mb-3">{metadata.title}</h1>

              {/* Role first: it is what a recruiter reads before anything else. */}
              {metadata.role.length > 0 && (
                <p className="text-h3 text-blue mb-3">{metadata.role.join(" · ")}</p>
              )}

              <p className="measure text-h3 font-normal text-slate mb-6">{metadata.description}</p>

              <div className="flex flex-wrap gap-4 font-mono text-small tabular text-slate mb-6">
                {years && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {years}
                  </div>
                )}
                {metadata.team.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {metadata.team.join(", ")}
                  </div>
                )}
              </div>

              {(metadata.website || metadata.github) && (
                <div className="flex gap-3">
                  {metadata.website && (
                    <Button asChild>
                      <a href={metadata.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t.liveDemo}
                      </a>
                    </Button>
                  )}
                  {metadata.github && (
                    <Button variant="outline" asChild>
                      <a href={metadata.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        {t.repository}
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            {metadata.cover && (
              <div className="lg:w-1/2">
                <div className="relative w-full h-64 lg:h-80 bg-cover-matte rounded-lg overflow-hidden">
                  <Image
                    src={coverSrc}
                    alt={metadata.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                    className="object-cover"
                    onError={() => setCoverSrc("/abstract-project-cover.png")}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Impact: written in the front-matter of every project and, until
                now, never rendered anywhere. */}
            {(metadata.highlights.length > 0 || metadata.metrics.length > 0) && (
              <section className="py-12 border-b border-rule">
                  <h2 className="text-h2 text-ink mb-6">{t.impact}</h2>

                  {metadata.metrics.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                      {metadata.metrics.map((metric) => (
                        <div key={metric.name}>
                          <div className="text-2xl font-bold text-primary">
                            {metric.value}
                            {metric.unit ? <span className="text-base font-medium"> {metric.unit}</span> : null}
                          </div>
                          <div className="text-sm text-muted-foreground">{metric.name}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {metadata.highlights.length > 0 && (
                    <ul className="space-y-3">
                      {metadata.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-3">
                          <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
            </section>
            )}

            <section className="py-12 border-b border-rule">
                <div className="prose measure">
                  <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{content}</ReactMarkdown>
                </div>
            </section>

            {/* Gallery */}
            {metadata.gallery.length > 0 && (
              <section className="py-12 border-b border-rule">
                  <h2 className="text-h2 text-ink mb-6">{t.gallery}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {metadata.gallery.map((image, index) => (
                      <figure key={image.url}>
                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                          <div className="relative w-full h-60">
                            <Image
                              src={image.url}
                              alt={image.caption || `${metadata.title} — ${index + 1}`}
                              fill
                              sizes="(max-width: 640px) 100vw, 50vw"
                              loading="lazy"
                              className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                            />
                          </div>
                        </a>
                        {image.caption && (
                          <figcaption className="mt-2 text-sm text-muted-foreground">{image.caption}</figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
            </section>
            )}

            {/* Videos */}
            {metadata.videos.length > 0 && (
              <section className="py-12 border-b border-rule">
                  <h2 className="text-h2 text-ink mb-6">{t.videos}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {metadata.videos.map((video, index) => (
                      <div key={`${video.provider}-${video.id}`}>
                        <div className="relative bg-black rounded-lg overflow-hidden">
                          {video.provider === "youtube" ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${video.id}`}
                              title={video.title || `${metadata.title} — video ${index + 1}`}
                              className="w-full aspect-video"
                              loading="lazy"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : video.provider === "vimeo" ? (
                            <iframe
                              src={`https://player.vimeo.com/video/${video.id}`}
                              title={video.title || `${metadata.title} — video ${index + 1}`}
                              className="w-full aspect-video"
                              loading="lazy"
                              allow="autoplay; fullscreen; picture-in-picture"
                              allowFullScreen
                            />
                          ) : (
                            <video src={video.id} className="w-full aspect-video" controls preload="metadata" />
                          )}
                        </div>
                        {video.title && <p className="mt-2 text-sm text-muted-foreground">{video.title}</p>}
                      </div>
                    ))}
                  </div>
            </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {metadata.links.length > 0 && (
              <section className="py-6 border-b border-rule">
                  <h2 className="label text-slate mb-4">{t.links}</h2>
                  <div className="space-y-3">
                    {metadata.links.map((link) => (
                      <Button
                        key={link.key}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start bg-transparent"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {linkIcon(link.key)}
                          <span className="ml-2">{linkLabel(link)}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
            </section>
            )}

            {metadata.technologies.length > 0 && (
              <section className="py-6 border-b border-rule">
                  <h2 className="label text-slate mb-4">{t.stack}</h2>
                  <div className="flex flex-wrap gap-2">
                    {metadata.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
            </section>
            )}

            {metadata.tags.length > 0 && (
              <section className="py-6 border-b border-rule">
                  <h2 className="label text-slate mb-4">{t.tags}</h2>
                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
            </section>
            )}

            {metadata.lastUpdated && (
              <p className="font-mono text-small text-slate py-4">
                {t.lastUpdated}: {metadata.lastUpdated}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
