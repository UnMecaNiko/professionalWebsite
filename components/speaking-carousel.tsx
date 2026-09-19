"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const images = [
  { src: "/speaking-huawei-podium.jpg", alt: "Speaking at Huawei event", position: "object-top" },
  { src: "/corporate-presentation.jpg", alt: "Corporate presentation", position: "object-top" },
  { src: "/training-session.jpg", alt: "Leading training session", position: "object-center" },
  { src: "/panel-discussion.jpg", alt: "Panel discussion participant", position: "object-center" },
  { src: "/deepseek-presentation.jpg", alt: "Deepseek technical presentation", position: "object-center" },
  { src: "/ai-lab-demo.jpg", alt: "AI Lab demonstration", position: "object-center" },
  { src: "/university-presentation.jpg", alt: "University guest speaker", position: "object-center" },
  { src: "/huawei-cloud-demo.jpg", alt: "Huawei Cloud demonstration", position: "object-center" },
  { src: "/modern-classroom.jpg", alt: "Teaching in modern classroom", position: "object-center" },
  { src: "/hybrid-cloud-presentation.jpg", alt: "Hybrid cloud implementation presentation", position: "object-center" },
]

export function SpeakingCarousel() {
  const { translations } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const nextSlide = () => setCurrentIndex((index) => (index + 1) % images.length)
  const prevSlide = () => setCurrentIndex((index) => (index - 1 + images.length) % images.length)

  /**
   * WCAG 2.2.2 requires a way to stop motion that runs for more than five
   * seconds. It also says not to start it at all when the visitor asked the
   * system for reduced motion.
   */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduced.matches) setIsPlaying(false)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [isPlaying])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.speaking.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{translations.speaking.description}</p>
        </div>

        <div
          className="relative max-w-4xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label={translations.speaking.region}
        >
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div
                  key={image.src}
                  className="w-full flex-shrink-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} / ${images.length}`}
                  aria-hidden={index !== currentIndex}
                >
                  {/*
                    Only the first photo is fetched with the page. The other
                    nine used to be downloaded up front: 7.8 MB before the
                    visitor saw anything.
                  */}
                  <div className="relative w-full h-[400px] md:h-[500px]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 896px) 100vw, 896px"
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      className={`object-cover ${image.position}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            aria-label={translations.speaking.previous}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={translations.speaking.next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>

          <div className="flex justify-center items-center mt-6 gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label={isPlaying ? translations.speaking.pause : translations.speaking.play}
              aria-pressed={!isPlaying}
              className="h-8 w-8"
              onClick={() => setIsPlaying((playing) => !playing)}
            >
              {isPlaying ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </Button>
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`${translations.speaking.goTo} ${index + 1}`}
                aria-current={index === currentIndex}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
