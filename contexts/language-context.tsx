"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: typeof translations.en
}

/**
 * The English strings are the copy of the phase 3 design canvas, transcribed
 * literally. The Spanish ones are their translation: the site is bilingual
 * only in its interface, so every English line needs a Spanish twin.
 *
 * Nothing here is written from scratch. What the mockups do not cover — the
 * About section, the footer — comes from planning/career/cvs/general-resume.md
 * in the knowledge repository, which is itself sourced from
 * knowledge/identity/. No claim on this page exists without a document behind
 * it.
 */
const translations = {
  en: {
    name: "Nicolas Velasquez Lopez",

    // Header
    nav: {
      work: "Work",
      career: "Career",
      contact: "Contact",
      downloadCv: "Download CV",
      home: "Back to the top",
      toggleLanguage: "Cambiar a español",
      openMenu: "Open the menu",
      closeMenu: "Close the menu",
      toggleTheme: "Switch between light and dark",
    },

    // Hero
    hero: {
      eyebrow: "Mechatronics Engineer · Bogotá, Colombia",
      headline: "I turn business problems into architectures, demos and systems that ship.",
      subtitle:
        "Cloud and AI solutions engineering for customer-facing work, with hands-on robotics and hardware behind it. I build the thing, then I explain it to the people who have to buy it.",
      seeWork: "See the work",
      downloadCv: "Download CV",
      /*
        The three numbers that used to sit here — "5+ certifications",
        "15+ projects", "50+ students" — had no source. Two of them were wrong
        against knowledge/identity/, and a recruiter who audits one claim and
        finds it inflated stops believing the rest of the page. These three can
        each be pointed at a document.
      */
      facts: {
        certifiedLabel: "Certified",
        certified: "HCIP Cloud Service Solutions Architect, 2025 — plus HCIA in AI and Cloud",
        documentedLabel: "Documented",
        documented: (count: number) => `${count} projects written up in full, from CNC hardware to AI agents`,
        orbitLabel: "In orbit",
        orbit: "Mentored student hardware that launched into space — Space Call, 7 nations",
      },
    },

    // About — source: planning/career/cvs/general-resume.md
    about: {
      title: "About",
      description:
        "Mechatronics Engineer and Solutions Engineer. I lead technical discovery to understand architecture, requirements, business objectives and success criteria, then turn those needs into demonstrations and solution paths that business and managerial audiences can decide on.",
      expertise: "Areas of expertise",
      discovery: "Discovery & communication",
      discoveryDesc:
        "Technical discovery, explaining architecture and trade-offs to business and managerial audiences, demonstrations, proofs of concept, customer training.",
      solutions: "Solutions & systems",
      solutionsDesc: "Solution architecture, Huawei Cloud, Linux, Docker, Kubernetes, REST APIs, HubSpot.",
      programming: "Programming & robotics",
      programmingDesc:
        "Python for robot control and automation, C++ in academic and embedded projects, MATLAB/Simulink, Git. ROS 1; ROS 2 Jazzy in progress.",
      teaching: "Teaching",
      teachingDesc:
        "Curriculum design, instructor training, webinars on AI and Kubernetes, robotics and programming instruction.",
      technicalDiscovery: "Technical discovery",
      technicalDiscoveryDesc:
        "Leads sessions with customers to understand architecture, requirements, business objectives and success criteria.",
      demos: "Demos and proofs of concept",
      demosDesc: "Designs and presents tailored demonstrations with sales, product and engineering.",
      training: "Technical training",
      trainingDesc:
        "Webinars and training on AI and Kubernetes for technical and business audiences in Colombia and Ecuador.",
    },

    career: {
      title: "Career",
      annotation: "chronological",
      education: "Education",
      downloadCv: "Download CV (PDF)",
      present: "Present",
    },

    speaking: {
      title: "Speaking & teaching",
      annotation: "selected sessions",
      description: "Every photo below says where, when and to whom. Without those three, a photo is decoration.",
      attendees: "attendees",
    },

    // Projects
    projects: {
      title: "Selected work",
      annotation: (count: number) => `${count} projects · newest first`,
      readCase: "Read the case",
      visitSite: "Visit the site",
      empty: "No projects available right now.",
      ongoing: "Present",
    },

    // Project detail page
    project: {
      back: "All work",
      liveDemo: "Live demo",
      repository: "Repository",
      impact: "Impact",
      gallery: "Gallery",
      videos: "Videos",
      links: "Links",
      stack: "Stack",
      tags: "Tags",
      lastUpdated: "Last updated",
      ongoing: "Present",
      status: {
        active: "Active",
        ended: "Completed",
        archived: "Archived",
        prototype: "Prototype",
      },
    },

    // Contact
    contact: {
      title: "Tell me what you are trying to build.",
      subtitle:
        "Pre-sales engineering, cloud and AI architecture, or a robotics pilot that needs someone who can both build it and explain it.",
      whatsapp: "Contact via WhatsApp",
      emailLabel: "Email",
      emailHint: "Best for anything with detail",
      linkedinLabel: "LinkedIn",
      linkedinHint: "Where the work gets posted",
      whatsappLabel: "WhatsApp",
      whatsappHint: "Colombia · fastest reply",
      githubLabel: "GitHub",
      githubHint: "Code behind the projects",
    },

    footer: {
      description:
        "Mechatronics Engineer and Solutions Engineer. Technical discovery, cloud and AI architecture, and the robotics and hardware work behind them.",
      services: {
        title: "What I do",
        list: [
          "Technical discovery",
          "Cloud and AI architecture",
          "Demos and proofs of concept",
          "Technical training",
          "Robotics and hardware",
        ],
      },
      contact: {
        title: "Contact",
      },
      copyright: "© 2026 Nicolas Velasquez Lopez. All rights reserved.",
      tagline: "Mechatronics Engineer • Solutions Engineer • Bogotá, Colombia",
    },
  },
  es: {
    name: "Nicolas Velasquez Lopez",

    // Header
    nav: {
      work: "Trabajo",
      career: "Trayectoria",
      contact: "Contacto",
      downloadCv: "Descargar CV",
      home: "Volver al inicio",
      toggleLanguage: "Switch to English",
      openMenu: "Abrir el menú",
      closeMenu: "Cerrar el menú",
      toggleTheme: "Cambiar entre claro y oscuro",
    },

    // Hero
    hero: {
      eyebrow: "Ingeniero Mecatrónico · Bogotá, Colombia",
      headline: "Convierto problemas de negocio en arquitecturas, demos y sistemas que salen a producción.",
      subtitle:
        "Ingeniería de soluciones en nube e IA de cara al cliente, con robótica y hardware hechos a mano detrás. Construyo la cosa y después se la explico a quien tiene que comprarla.",
      seeWork: "Ver el trabajo",
      downloadCv: "Descargar CV",
      facts: {
        certifiedLabel: "Certificado",
        certified: "HCIP Cloud Service Solutions Architect, 2025 — más HCIA en IA y en Cloud",
        documentedLabel: "Documentado",
        documented: (count: number) => `${count} proyectos escritos completos, desde hardware CNC hasta agentes de IA`,
        orbitLabel: "En órbita",
        orbit: "Mentoricé hardware estudiantil que llegó al espacio — Space Call, 7 naciones",
      },
    },

    // About
    about: {
      title: "Sobre mí",
      description:
        "Ingeniero mecatrónico e ingeniero de soluciones. Dirijo el descubrimiento técnico para entender arquitectura, requisitos, objetivos de negocio y criterios de éxito, y convierto esas necesidades en demostraciones y caminos de solución que una audiencia de negocio o gerencial puede decidir.",
      expertise: "Áreas de especialización",
      discovery: "Descubrimiento y comunicación",
      discoveryDesc:
        "Descubrimiento técnico, explicar arquitectura y sus compromisos a audiencias de negocio y gerenciales, demostraciones, pruebas de concepto, formación a clientes.",
      solutions: "Soluciones y sistemas",
      solutionsDesc: "Arquitectura de soluciones, Huawei Cloud, Linux, Docker, Kubernetes, APIs REST, HubSpot.",
      programming: "Programación y robótica",
      programmingDesc:
        "Python para control de robots y automatización, C++ en proyectos académicos y embebidos, MATLAB/Simulink, Git. ROS 1; ROS 2 Jazzy en curso.",
      teaching: "Docencia",
      teachingDesc:
        "Diseño de currículo, formación de instructores, webinars de IA y Kubernetes, enseñanza de robótica y programación.",
      technicalDiscovery: "Descubrimiento técnico",
      technicalDiscoveryDesc:
        "Dirige sesiones con clientes para entender arquitectura, requisitos, objetivos de negocio y criterios de éxito.",
      demos: "Demos y pruebas de concepto",
      demosDesc: "Diseña y presenta demostraciones a la medida junto a ventas, producto e ingeniería.",
      training: "Formación técnica",
      trainingDesc:
        "Webinars y formación en IA y Kubernetes para audiencias técnicas y de negocio en Colombia y Ecuador.",
    },

    career: {
      title: "Trayectoria",
      annotation: "cronológica",
      education: "Formación",
      downloadCv: "Descargar CV (PDF)",
      present: "Actualidad",
    },

    speaking: {
      title: "Conferencias y docencia",
      annotation: "sesiones seleccionadas",
      description: "Cada foto dice dónde, cuándo y ante quién. Sin esos tres datos, una foto es decoración.",
      attendees: "asistentes",
    },

    // Projects
    projects: {
      title: "Trabajo seleccionado",
      annotation: (count: number) => `${count} proyectos · más reciente primero`,
      readCase: "Leer el caso",
      visitSite: "Visitar el sitio",
      empty: "No hay proyectos disponibles en este momento.",
      ongoing: "Actualidad",
    },

    // Project detail page
    project: {
      back: "Todo el trabajo",
      liveDemo: "Demo en vivo",
      repository: "Repositorio",
      impact: "Impacto",
      gallery: "Galería",
      videos: "Videos",
      links: "Enlaces",
      stack: "Stack",
      tags: "Etiquetas",
      lastUpdated: "Última actualización",
      ongoing: "Actualidad",
      status: {
        active: "Activo",
        ended: "Terminado",
        archived: "Archivado",
        prototype: "Prototipo",
      },
    },

    // Contact
    contact: {
      title: "Cuéntame qué estás tratando de construir.",
      subtitle:
        "Ingeniería de preventa, arquitectura en nube e IA, o un piloto de robótica que necesita a alguien capaz de construirlo y de explicarlo.",
      whatsapp: "Contactar por WhatsApp",
      emailLabel: "Correo",
      emailHint: "Lo mejor para algo con detalle",
      linkedinLabel: "LinkedIn",
      linkedinHint: "Donde se publica el trabajo",
      whatsappLabel: "WhatsApp",
      whatsappHint: "Colombia · la respuesta más rápida",
      githubLabel: "GitHub",
      githubHint: "El código detrás de los proyectos",
    },

    footer: {
      description:
        "Ingeniero mecatrónico e ingeniero de soluciones. Descubrimiento técnico, arquitectura en nube e IA, y el trabajo de robótica y hardware que hay detrás.",
      services: {
        title: "Qué hago",
        list: [
          "Descubrimiento técnico",
          "Arquitectura en nube e IA",
          "Demos y pruebas de concepto",
          "Formación técnica",
          "Robótica y hardware",
        ],
      },
      contact: {
        title: "Contacto",
      },
      copyright: "© 2026 Nicolas Velasquez Lopez. Todos los derechos reservados.",
      tagline: "Ingeniero Mecatrónico • Ingeniero de Soluciones • Bogotá, Colombia",
    },
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

/**
 * Same rule Nicolas confirmed on 2026-09-18 for velasquezlopez.com and the
 * other public sites: first browser language tag starting with `es` → Spanish;
 * anything else → English. `navigator.languages[0]` is the first
 * Accept-Language tag. The header toggle still overrides for the session.
 */
function languageFromBrowser(): Language {
  const tag = (navigator.languages?.[0] || navigator.language || "en").toLowerCase()
  return tag.indexOf("es") === 0 ? "es" : "en"
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    setLanguage(languageFromBrowser())
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
