"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cloud, Bot, GraduationCap, Cpu } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function About() {
  const { translations } = useLanguage()

  const expertise = [
    {
      icon: Cloud,
      title: translations.about.cloud,
      description: translations.about.cloudDesc,
    },
    {
      icon: Bot,
      title: translations.about.ai,
      description: translations.about.aiDesc,
    },
    {
      icon: Cpu,
      title: translations.about.robotics,
      description: translations.about.roboticsDesc,
    },
    {
      icon: GraduationCap,
      title: translations.about.education,
      description: translations.about.educationDesc,
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.about.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.about.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {expertise.map((item, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">{translations.about.expertise}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Solutions Architect</h4>
                  <p className="text-muted-foreground">
                    Specialized in cloud migration and infrastructure optimization
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">AI Developer</h4>
                  <p className="text-muted-foreground">
                    Implementation of machine learning models and intelligent automation
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold">Technical Educator</h4>
                  <p className="text-muted-foreground">Training professionals in emerging technologies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img
              src="/professional-giving-tech-presentation.png"
              alt="Giving a technical presentation"
              className="rounded-lg shadow-lg"
            />
            <img src="/tech-team-collaboration.png" alt="Working in a team" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
