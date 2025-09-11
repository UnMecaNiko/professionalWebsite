"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Contact() {
  const { translations } = useLanguage()

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{translations.contact.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{translations.contact.subtitle}</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-primary text-primary-foreground mb-8">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <MessageCircle className="h-10 w-10" />
                <div>
                  <h3 className="text-2xl font-semibold">WhatsApp</h3>
                  <p className="opacity-90">Quick response guaranteed</p>
                </div>
              </div>
              <Button
                variant="secondary"
                size="lg"
                className="w-full cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://wa.me/573204081631?text=Hola Nico, vi tu página web y quiero contactar contigo.",
                    "_blank",
                  )
                }
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {translations.contact.whatsapp}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="font-semibold mb-6 text-xl">{translations.contact.whyWork}</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {translations.contact.experienceDesc}
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {translations.contact.educationDesc}
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {translations.contact.innovationDesc}
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  {translations.contact.responsibleDesignDesc}
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
