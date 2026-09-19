"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

/**
 * The auto-advancing carousel of ten photos is gone: it preloaded 7.8 MB, it
 * could not be paused, and ten pictures of the same person presenting say
 * less than two that state where, when and to whom.
 *
 * Source of every caption: web/media.yaml in the knowledge repository, each
 * entry carrying `verified_by` and a date. Seven of the ten photos have no
 * confirmed event, year or audience, and one more — the Huawei security
 * training — is missing its event and year. A `null` there is a fact that is
 * missing, not one that can be filled in with whatever fits, so those photos
 * are not published. The section grows when media.yaml does.
 */
const PHOTOS = [
  {
    src: "/huawei-cloud-demo.jpg",
    alt: "Nicolas Velasquez Lopez running Huawei Cloud AI demos at the CX Summit stand",
    title: "Huawei Cloud AI demos",
    event: "CX Summit 2025",
    year: 2025,
    place: "Cartagena, Colombia",
    attendees: 1500,
  },
  {
    src: "/university-presentation.jpg",
    alt: "Nicolas Velasquez Lopez giving a talk on AI in education",
    title: "AI in education",
    event: "Universidad Militar Nueva Granada",
    year: 2025,
    place: "Colombia",
    attendees: 60,
  },
]

export function Speaking() {
  const { translations } = useLanguage()
  const t = translations.speaking

  return (
    <section id="speaking" className="bg-cream border-b border-rule">
      <div className="container mx-auto px-4 py-12 md:py-[4.5rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-8">
          <h2 className="label text-blue pt-1">{t.title}</h2>

          <div>
            <p className="measure text-h3 font-normal text-ink mb-8">{t.description}</p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PHOTOS.map((photo) => (
                <li key={photo.src}>
                  <figure>
                    <div className="relative w-full h-[300px]">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        loading="lazy"
                        className="object-cover rounded-[2px]"
                      />
                    </div>
                    <figcaption className="mt-3 border-t border-ink/25 pt-3">
                      <span className="block text-body font-bold text-ink">{photo.title}</span>
                      <span className="label block mt-2 text-slate">
                        {photo.event} · {photo.year} · {photo.place}
                      </span>
                      <span className="font-mono text-small tabular text-slate">
                        {photo.attendees.toLocaleString("en-US")} {t.attendees}
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
