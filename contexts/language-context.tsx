"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  translations: typeof translations.en
}

const translations = {
  en: {
    // Header
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      workTogether: "Let's Work Together",
    },

    // Hero
    hero: {
      greeting: "Hi, I'm",
      title: "Cloud & AI Solutions Architect",
      subtitle:
        "Transforming businesses through innovative cloud solutions, artificial intelligence, and robotics. Former educator passionate about sharing knowledge and building the future.",
      cta: "View My Work",
      contact: "Get In Touch",
    },

    // About
    about: {
      title: "About Me",
      description:
        "I'm a passionate Cloud & AI Solutions Architect with extensive experience in designing and implementing scalable cloud infrastructures and artificial intelligence solutions. My background in robotics and education allows me to approach complex problems with creativity and clarity.",
      expertise: "Areas of Expertise",
      cloud: "Cloud Architecture",
      cloudDesc: "AWS, Azure, GCP solutions design and implementation",
      ai: "Artificial Intelligence",
      aiDesc: "Machine learning models, AI integration, and automation",
      robotics: "Robotics",
      roboticsDesc: "Autonomous systems and IoT device integration",
      education: "Education & Training",
      educationDesc: "Technical training and knowledge transfer",
    },

    // Projects
    projects: {
      title: "Featured Projects",
      subtitle: "Explore some of my recent work in cloud architecture, AI solutions, and robotics",
      viewDetails: "View Details",
      project1: {
        title: "AI-Powered Cloud Analytics Platform",
        desc: "Developed a comprehensive analytics platform using AWS services and machine learning algorithms to process and analyze large datasets in real-time.",
      },
      project2: {
        title: "Autonomous Robotics System",
        desc: "Designed and implemented an autonomous navigation system for industrial robots using computer vision and deep learning techniques.",
      },
      project3: {
        title: "Multi-Cloud Infrastructure Migration",
        desc: "Led the migration of enterprise applications from on-premises to a hybrid multi-cloud architecture, improving scalability and reducing costs by 40%.",
      },
    },

    // Contact
    contact: {
      title: "Let's Build Something Amazing Together",
      subtitle:
        "Ready to transform your business with cutting-edge cloud and AI solutions? Let's discuss your project.",
      whatsapp: "Contact via WhatsApp",
      whyWork: "Why Work With Me?",
      experience: "Proven Experience",
      experienceDesc: "Years of hands-on experience in cloud architecture and AI implementation",
      education: "Educational Background",
      educationDesc: "Former educator with a passion for clear communication and knowledge transfer",
      innovation: "Innovation Focus",
      innovationDesc: "Always exploring the latest technologies to deliver cutting-edge solutions",
    },

    footer: {
      description:
        "Cloud & AI Solutions Architect, specialized in robotics and education. Transforming ideas into innovative technological solutions.",
      services: {
        title: "Services",
        list: [
          "Cloud Architecture",
          "AI/ML Development",
          "Robotics Systems",
          "Technical Consulting",
          "Training & Education",
        ],
      },
      contact: {
        title: "Contact",
      },
      copyright: "© 2024 Nicolas Velasquez Lopez. All rights reserved.",
      tagline: "Solutions Architect Specialist • Cloud & AI • Robotics • Education",
    },
  },
  es: {
    // Header
    nav: {
      about: "Sobre Mí",
      projects: "Proyectos",
      contact: "Contacto",
      workTogether: "Trabajemos Juntos",
    },

    // Hero
    hero: {
      greeting: "Hola, soy",
      title: "Arquitecto de Soluciones en Nube y AI",
      subtitle:
        "Transformando empresas a través de soluciones innovadoras en la nube, inteligencia artificial y robótica. Ex-educador apasionado por compartir conocimiento y construir el futuro.",
      cta: "Ver Mi Trabajo",
      contact: "Contactar",
    },

    // About
    about: {
      title: "Sobre Mí",
      description:
        "Soy un Arquitecto de Soluciones en Nube y AI apasionado con amplia experiencia en el diseño e implementación de infraestructuras escalables en la nube y soluciones de inteligencia artificial. Mi experiencia en robótica y educación me permite abordar problemas complejos con creatividad y claridad.",
      expertise: "Áreas de Especialización",
      cloud: "Arquitectura en la Nube",
      cloudDesc: "Diseño e implementación de soluciones AWS, Azure, GCP",
      ai: "Inteligencia Artificial",
      aiDesc: "Modelos de machine learning, integración de AI y automatización",
      robotics: "Robótica",
      roboticsDesc: "Sistemas autónomos e integración de dispositivos IoT",
      education: "Educación y Capacitación",
      educationDesc: "Formación técnica y transferencia de conocimiento",
    },

    // Projects
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Explora algunos de mis trabajos recientes en arquitectura en la nube, soluciones de AI y robótica",
      viewDetails: "Ver Detalles",
      project1: {
        title: "Plataforma de Análisis en la Nube con AI",
        desc: "Desarrollé una plataforma integral de análisis utilizando servicios de AWS y algoritmos de machine learning para procesar y analizar grandes conjuntos de datos en tiempo real.",
      },
      project2: {
        title: "Sistema de Robótica Autónoma",
        desc: "Diseñé e implementé un sistema de navegación autónoma para robots industriales utilizando visión por computadora y técnicas de deep learning.",
      },
      project3: {
        title: "Migración de Infraestructura Multi-Nube",
        desc: "Lideré la migración de aplicaciones empresariales desde on-premises a una arquitectura híbrida multi-nube, mejorando la escalabilidad y reduciendo costos en un 40%.",
      },
    },

    // Contact
    contact: {
      title: "Construyamos Algo Increíble Juntos",
      subtitle:
        "¿Listo para transformar tu negocio con soluciones de vanguardia en la nube y AI? Hablemos de tu proyecto.",
      whatsapp: "Contactar por WhatsApp",
      whyWork: "¿Por Qué Trabajar Conmigo?",
      experience: "Experiencia Comprobada",
      experienceDesc: "Años de experiencia práctica en arquitectura en la nube e implementación de AI",
      education: "Formación Educativa",
      educationDesc: "Ex-educador con pasión por la comunicación clara y transferencia de conocimiento",
      innovation: "Enfoque en Innovación",
      innovationDesc: "Siempre explorando las últimas tecnologías para entregar soluciones de vanguardia",
    },

    footer: {
      description:
        "Arquitecto de Soluciones en Nube y AI, especializado en robótica y educación. Transformando ideas en soluciones tecnológicas innovadoras.",
      services: {
        title: "Servicios",
        list: [
          "Arquitectura en Nube",
          "Desarrollo de IA/ML",
          "Sistemas Robóticos",
          "Consultoría Técnica",
          "Formación y Capacitación",
        ],
      },
      contact: {
        title: "Contacto",
      },
      copyright: "© 2024 Nicolas Velasquez Lopez. Todos los derechos reservados.",
      tagline: "Especialista en Arquitectura de Soluciones • Cloud & AI • Robótica • Educación",
    },
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

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
