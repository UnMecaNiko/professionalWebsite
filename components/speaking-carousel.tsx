"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function SpeakingCarousel() {
  const { translations } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)

  const images = [
    {
      src: "/speaking-huawei-podium.jpg",
      alt: "Speaking at Huawei event",
    },
    {
      src: "/corporate-presentation.jpg",
      alt: "Corporate presentation",
    },
    {
      src: "/training-session.jpg",
      alt: "Leading training session",
    },
    {
      src: "/panel-discussion.jpg",
      alt: "Panel discussion participant",
    },
    {
      src: "/deepseek-presentation.jpg",
      alt: "Deepseek technical presentation",
    },
    {
      src: "/ai-lab-demo.jpg",
      alt: "AI Lab demonstration",
    },
    {
      src: "/university-presentation.jpg",
      alt: "University guest speaker",
    },
    {
      src: "/huawei-cloud-demo.jpg",
      alt: "Huawei Cloud demonstration",
    },
    {
      src: "/modern-classroom.jpg",
      alt: "Teaching in modern classroom",
    },
    {
      src: "/hybrid-cloud-presentation.jpg",
      alt: "Hybrid cloud implementation presentation",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.speaking.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{translations.speaking.description}</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    className="w-full h-[400px] md:h-[500px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
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
