"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, Calendar, MapPin, Users, FileText, Linkedin } from "lucide-react"
import Link from "next/link"
import type { Project } from "@/lib/github"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"

interface ProjectDetailProps {
  project: Project
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const { metadata, content } = project

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="mb-4 cursor-pointer">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to projects
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {metadata.categories?.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
                <Badge variant={metadata.status === "completed" ? "default" : "outline"}>{metadata.status}</Badge>
              </div>

              <h1 className="text-4xl font-bold mb-4">{metadata.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{metadata.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                {metadata.startDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {metadata.startDate} {metadata.endDate && `- ${metadata.endDate}`}
                  </div>
                )}
                {metadata.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {metadata.location}
                  </div>
                )}
                {metadata.team && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {metadata.team.join(", ")}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                {metadata.website && (
                  <Button asChild>
                    <a href={metadata.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver Proyecto
                    </a>
                  </Button>
                )}
                {metadata.github && (
                  <Button variant="outline" asChild>
                    <a href={metadata.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Código
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {metadata.cover && (
              <div className="lg:w-1/2">
                <img
                  src={metadata.cover || "/placeholder.svg"}
                  alt={metadata.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/abstract-project-cover.png"
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:marker:text-foreground">
                  <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{content}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>

            {((metadata.gallery && metadata.gallery.length > 0) || (metadata.videos && metadata.videos.length > 0)) && (
              <div className="mt-8 space-y-8">
                {/* Gallery */}
                {metadata.gallery && metadata.gallery.length > 0 && (
                  <Card>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6">Gallery</h3>
                      <div className="relative">
                        <div className="overflow-x-auto">
                          <div className="flex gap-4 pb-4" style={{ width: `${metadata.gallery.length * 320}px` }}>
                            {metadata.gallery.map((image, index) => (
                              <div key={index} className="flex-shrink-0 w-80">
                                <div className="relative group">
                                  <img
                                    src={image.url || "/placeholder.svg"}
                                    alt={image.caption || `${metadata.title} - Imagen ${index + 1}`}
                                    className="w-full h-60 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement
                                      target.src = "/art-gallery-exhibition.png"
                                    }}
                                    onClick={() => window.open(image.url, "_blank")}
                                  />
                                  {image.caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                      <p className="text-sm">{image.caption}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {metadata.gallery.length > 1 && (
                          <div className="flex justify-center mt-4 gap-2">
                            {metadata.gallery.map((_, index) => (
                              <div key={index} className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Galería de Videos */}
                {metadata.videos && metadata.videos.length > 0 && (
                  <Card>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-6">Videos</h3>
                      <div className="relative">
                        <div className="overflow-x-auto">
                          <div className="flex gap-4 pb-4" style={{ width: `${metadata.videos.length * 400}px` }}>
                            {metadata.videos.map((video, index) => (
                              <div key={index} className="flex-shrink-0 w-96">
                                <div className="relative bg-black rounded-lg overflow-hidden">
                                  {video.provider === "youtube" ? (
                                    <iframe
                                      src={`https://www.youtube.com/embed/${video.id}`}
                                      title={video.title || `Video ${index + 1}`}
                                      className="w-full h-60"
                                      frameBorder="0"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  ) : video.provider === "vimeo" ? (
                                    <iframe
                                      src={`https://player.vimeo.com/video/${video.id}`}
                                      title={video.title || `Video ${index + 1}`}
                                      className="w-full h-60"
                                      frameBorder="0"
                                      allow="autoplay; fullscreen; picture-in-picture"
                                      allowFullScreen
                                    />
                                  ) : (
                                    // Fallback for direct video files or other providers
                                    <video
                                      src={video.id}
                                      className="w-full h-60 object-cover"
                                      controls
                                      preload="metadata"
                                    >
                                      Tu navegador no soporta el elemento de video.
                                    </video>
                                  )}
                                </div>
                                {video.title && (
                                  <p className="mt-2 text-sm text-muted-foreground text-center">{video.title}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                        {metadata.videos.length > 1 && (
                          <div className="flex justify-center mt-4 gap-2">
                            {metadata.videos.map((_, index) => (
                              <div key={index} className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Links */}
            {metadata.links && Object.keys(metadata.links).length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Links</h3>
                  <div className="space-y-3">
                    {Object.entries(metadata.links).map(([key, url]) => {
                      const getLinkIcon = (linkKey: string) => {
                        if (linkKey.includes("repo") || linkKey.includes("github")) {
                          return <Github className="h-4 w-4" />
                        }
                        if (linkKey.includes("post") || linkKey.includes("linkedin")) {
                          return <Linkedin className="h-4 w-4" />
                        }
                        if (linkKey.includes("deck") || linkKey.includes("pdf")) {
                          return <FileText className="h-4 w-4" />
                        }
                        return <ExternalLink className="h-4 w-4" />
                      }

                      const getLinkLabel = (linkKey: string) => {
                        if (linkKey.includes("repo") || linkKey.includes("github")) return "Repositorio"
                        if (linkKey.includes("demo")) return "Demo"
                        if (linkKey.includes("deck")) return "Presentación"
                        if (linkKey.includes("post")) return "Post"
                        return linkKey.charAt(0).toUpperCase() + linkKey.slice(1)
                      }

                      return (
                        <Button
                          key={key}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start bg-transparent"
                          asChild
                        >
                          <a href={url} target="_blank" rel="noopener noreferrer">
                            {getLinkIcon(key)}
                            <span className="ml-2">{getLinkLabel(key)}</span>
                          </a>
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Technologies */}
            {metadata.technologies && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Tecnologías</h3>
                  <div className="flex flex-wrap gap-2">
                    {metadata.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {metadata.tags && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {metadata.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Project Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Project Info</h3>
                <div className="space-y-3 text-sm">
                  {metadata.client && (
                    <div>
                      <span className="font-medium">Cliente:</span> {metadata.client}
                    </div>
                  )}
                  {metadata.budget && (
                    <div>
                      <span className="font-medium">Presupuesto:</span> {metadata.budget}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">State:</span> {metadata.status}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
