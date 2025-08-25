"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Header
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.workTogether": "Let's Work Together",

    // Hero
    "hero.greeting": "Hi, I'm",
    "hero.title": "Cloud & AI Solutions Architect",
    "hero.subtitle":
      "Transforming businesses through innovative cloud solutions, artificial intelligence, and robotics. Former educator passionate about sharing knowledge and building the future.",
    "hero.cta": "View My Work",
    "hero.contact": "Get In Touch",

    // About
    "about.title": "About Me",
    "about.description":
      "I'm a passionate Cloud & AI Solutions Architect with extensive experience in designing and implementing scalable cloud infrastructures and artificial intelligence solutions. My background in robotics and education allows me to approach complex problems with creativity and clarity.",
    "about.expertise": "Areas of Expertise",
    "about.cloud": "Cloud Architecture",
    "about.cloudDesc": "AWS, Azure, GCP solutions design and implementation",
    "about.ai": "Artificial Intelligence",
    "about.aiDesc": "Machine learning models, AI integration, and automation",
    "about.robotics": "Robotics",
    "about.roboticsDesc": "Autonomous systems and IoT device integration",
    "about.education": "Education & Training",
    "about.educationDesc": "Technical training and knowledge transfer",

    // Projects
    "projects.title": "Featured Projects",
    "projects.subtitle": "Explore some of my recent work in cloud architecture, AI solutions, and robotics",
    "projects.viewDetails": "View Details",
    "projects.project1.title": "AI-Powered Cloud Analytics Platform",
    "projects.project1.desc":
      "Developed a comprehensive analytics platform using AWS services and machine learning algorithms to process and analyze large datasets in real-time.",
    "projects.project2.title": "Autonomous Robotics System",
    "projects.project2.desc":
      "Designed and implemented an autonomous navigation system for industrial robots using computer vision and deep learning techniques.",
    "projects.project3.title": "Multi-Cloud Infrastructure Migration",
    "projects.project3.desc":
      "Led the migration of enterprise applications from on-premises to a hybrid multi-cloud architecture, improving scalability and reducing costs by 40%.",

    // Contact
    "contact.title": "Let's Build Something Amazing Together",
    "contact.subtitle":
      "Ready to transform your business with cutting-edge cloud and AI solutions? Let's discuss your project.",
    "contact.whatsapp": "Contact via WhatsApp",
    "contact.whyWork": "Why Work With Me?",
    "contact.experience": "Proven Experience",
    "contact.experienceDesc": "Years of hands-on experience in cloud architecture and AI implementation",
    "contact.education": "Educational Background",
    "contact.educationDesc": "Former educator with a passion for clear communication and knowledge transfer",
    "contact.innovation": "Innovation Focus",
    "contact.innovationDesc": "Always exploring the latest technologies to deliver cutting-edge solutions",
  },
  es: {
    // Header
    "nav.about": "Sobre Mí",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.workTogether": "Trabajemos Juntos",

    // Hero
    "hero.greeting": "Hola, soy",
    "hero.title": "Arquitecto de Soluciones en Nube y AI",
    "hero.subtitle":
      "Transformando empresas a través de soluciones innovadoras en la nube, inteligencia artificial y robótica. Ex-educador apasionado por compartir conocimiento y construir el futuro.",
    "hero.cta": "Ver Mi Trabajo",
    "hero.contact": "Contactar",

    // About
    "about.title": "Sobre Mí",
    "about.description":
      "Soy un Arquitecto de Soluciones en Nube y AI apasionado con amplia experiencia en el diseño e implementación de infraestructuras escalables en la nube y soluciones de inteligencia artificial. Mi experiencia en robótica y educación me permite abordar problemas complejos con creatividad y claridad.",
    "about.expertise": "Áreas de Especialización",
    "about.cloud": "Arquitectura en la Nube",
    "about.cloudDesc": "Diseño e implementación de soluciones AWS, Azure, GCP",
    "about.ai": "Inteligencia Artificial",
    "about.aiDesc": "Modelos de machine learning, integración de AI y automatización",
    "about.robotics": "Robótica",
    "about.roboticsDesc": "Sistemas autónomos e integración de dispositivos IoT",
    "about.education": "Educación y Capacitación",
    "about.educationDesc": "Formación técnica y transferencia de conocimiento",

    // Projects
    "projects.title": "Proyectos Destacados",
    "projects.subtitle":
      "Explora algunos de mis trabajos recientes en arquitectura en la nube, soluciones de AI y robótica",
    "projects.viewDetails": "Ver Detalles",
    "projects.project1.title": "Plataforma de Análisis en la Nube con AI",
    "projects.project1.desc":
      "Desarrollé una plataforma integral de análisis utilizando servicios de AWS y algoritmos de machine learning para procesar y analizar grandes conjuntos de datos en tiempo real.",
    "projects.project2.title": "Sistema de Robótica Autónoma",
    "projects.project2.desc":
      "Diseñé e implementé un sistema de navegación autónoma para robots industriales utilizando visión por computadora y técnicas de deep learning.",
    "projects.project3.title": "Migración de Infraestructura Multi-Nube",
    "projects.project3.desc":
      "Lideré la migración de aplicaciones empresariales desde on-premises a una arquitectura híbrida multi-nube, mejorando la escalabilidad y reduciendo costos en un 40%.",

    // Contact
    "contact.title": "Construyamos Algo Increíble Juntos",
    "contact.subtitle":
      "¿Listo para transformar tu negocio con soluciones de vanguardia en la nube y AI? Hablemos de tu proyecto.",
    "contact.whatsapp": "Contactar por WhatsApp",
    "contact.whyWork": "¿Por Qué Trabajar Conmigo?",
    "contact.experience": "Experiencia Comprobada",
    "contact.experienceDesc": "Años de experiencia práctica en arquitectura en la nube e implementación de AI",
    "contact.education": "Formación Educativa",
    "contact.educationDesc": "Ex-educador con pasión por la comunicación clara y transferencia de conocimiento",
    "contact.innovation": "Enfoque en Innovación",
    "contact.innovationDesc": "Siempre explorando las últimas tecnologías para entregar soluciones de vanguardia",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
