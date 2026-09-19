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
    name: "Nicolas Velasquez Lopez",
    
    // Header
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      workTogether: "Let's Work Together",
      home: "Back to the top",
      toggleLanguage: "Cambiar a español",
      openMenu: "Open the menu",
      closeMenu: "Close the menu",
      toggleTheme: "Switch between light and dark",
    },

    // Hero
    hero: {
      greeting: "Hi, I'm",
      title: "Cloud Solutions Architect & AI Specialist",
      subtitle:
        "Mechatronics Engineer, transforming businesses through innovative cloud architectures and AI solutions. Passionate educator bridging technology and learning.",
      cta: "View My Work",
      contact: "Get In Touch",
      available: "Bogotá, Colombia",
      /*
        The three numbers that used to sit here — "5+ certifications",
        "15+ projects", "50+ students" — had no source. Two of them were
        wrong against knowledge/identity/, and a recruiter who audits one
        claim and finds it inflated stops believing the rest of the page.
        These three can each be pointed at a document.
      */
      facts: {
        certificationsValue: "3",
        certifications: "Huawei certifications: HCIP Cloud Service Solutions Architect (2025), HCIA AI and HCIA Cloud Service (2024)",
        certificationsShort: "Huawei certifications",
        projects: "Project write-ups published here, each with its scope, stack and outcome",
        projectsShort: "Published projects",
        orbitValue: "2025",
        orbit: "RASCube-1 reached orbit carrying a board built by students I mentored, in a project joining schools from seven countries",
        orbitShort: "Mentored hardware in orbit",
      },
    },

    // About
    about: {
      title: "About Me",
      description:
        "I'm mechatronics engineer. I combine deep technical expertise in cloud computing, AI, and robotics with strong communication skills and business acumen. My philosophy centers on continuous learning, respect for others, and the belief that collaboration builds greater things.",
      expertise: "Areas of Expertise",
      cloud: "Cloud Architecture",
      cloudDesc: "Cloud solutions, Terraform, security and cost optimization",
      ai: "Artificial Intelligence",
      aiDesc: "Transforming businesses with AI solutions, guiding their journey, and fostering a culture of learning",
      robotics: "Robotics & Automation",
      roboticsDesc: "ROS, Gazebo, MATLAB, Simulink, and autonomous systems",
      education: "Education & Training",
      educationDesc: "Co-founder of Lápiz Labs, technical training and mentorship",
      solutionsArchitect: "Solutions Architect",
      solutionsArchitectDesc: "Specialized in cloud migration and infrastructure optimization",
      aiDeveloper: "AI Developer",
      aiDeveloperDesc: "Implementation of machine learning models and intelligent automation",
      technicalEducator: "Technical Educator",
      technicalEducatorDesc: "Training professionals in emerging technologies",
    },

    career: {
      title: "Career",
      description: "Where the work above was done, and in what role.",
      downloadCv: "Download CV (PDF)",
      present: "Present",
    },

    speaking: {
      title: "Speaking & teaching",
      description:
        "Every photo below says where, when and to whom. Without those three, a photo is decoration.",
      attendees: "attendees",
    },

    // Projects
    projects: {
      title: "Featured Projects",
      subtitle: "Explore my work in cloud migration, robotics education, and innovative engineering solutions",
      viewDetails: "View Details",
      code: "Code",
      empty: "No projects available right now.",
      ongoing: "Present",
    },

    // Project detail page
    project: {
      back: "Back to projects",
      viewProject: "View Project",
      code: "Code",
      impact: "Impact",
      gallery: "Gallery",
      videos: "Videos",
      links: "Links",
      tech: "Tech",
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
      title: "Let's Build Something Amazing Together",
      subtitle:
        "Ready to transform your business with cutting-edge cloud and AI solutions? Let's discuss how we can optimize your processes and drive growth.",
      whatsapp: "Contact via WhatsApp",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      whatsappLabel: "WhatsApp",
      whyWork: "Why Work With Me?",
      experience: "Resilience & Focus",
      experienceDesc: "I know how to recover from adversity and turn difficult challenges into growth opportunities",
      education: "Creative Problem Solving",
      educationDesc: "I explore different paths until finding the best solution for each unique challenge",
      innovation: "Commitment to Excellence",
      innovationDesc: "In every project I leave a part of myself and never stop learning and improving",
      responsibleDesign: "Responsible Design",
      responsibleDesignDesc:
        "I think about scalability, performance, availability, cost, and security when creating solutions",
    },

    footer: {
      description:
        "Mechatronics Engineer and Cloud Solutions Architect. Transforming businesses through innovative cloud architectures, AI solutions, and robotics education.",
      services: {
        title: "Services",
        list: [
          "Cloud Architecture Design",
          "AI Strategy & Implementation",
          "Robotics Systems",
          "Technical Training",
          "Business Consulting",
        ],
      },
      contact: {
        title: "Contact",
      },
      copyright: "© 2026 Nicolas Velasquez Lopez. All rights reserved.",
      tagline: "Cloud Solutions Architect • AI Specialist • Robotics Educator • Colombia",
    },
  },
  es: {
    name: "Nicolas Velasquez Lopez",
    // Header
    nav: {
      about: "Sobre Mí",
      projects: "Proyectos",
      contact: "Contacto",
      workTogether: "Trabajemos Juntos",
      home: "Volver al inicio",
      toggleLanguage: "Switch to English",
      openMenu: "Abrir el menú",
      closeMenu: "Cerrar el menú",
      toggleTheme: "Cambiar entre claro y oscuro",
    },

    // Hero
    hero: {
      greeting: "Hola, soy",
      title: "Arquitecto de Soluciones en Nube e IA",
      subtitle:
        "Transformando empresas a través de arquitecturas en la nube y soluciones de IA. Educador apasionado que conecta tecnología y aprendizaje.",
      cta: "Ver Mi Trabajo",
      contact: "Contactar",
      available: "Bogotá, Colombia",
      facts: {
        certificationsValue: "3",
        certifications: "Certificaciones Huawei: HCIP Cloud Service Solutions Architect (2025), HCIA AI y HCIA Cloud Service (2024)",
        certificationsShort: "Certificaciones Huawei",
        projects: "Fichas de proyecto publicadas aquí, cada una con su alcance, stack y resultado",
        projectsShort: "Proyectos publicados",
        orbitValue: "2025",
        orbit: "RASCube-1 llegó a órbita con una tarjeta construida por estudiantes que mentoricé, en un proyecto que reunió escuelas de siete países",
        orbitShort: "Hardware mentorizado en órbita",
      },
    },

    // About
    about: {
      title: "Sobre Mí",
      description:
        "Soy ingeniero mecatrónico. Combino experiencia técnica profunda en computación en la nube, IA y robótica con habilidades de comunicación sólidas y visión de negocio. Mi filosofía se centra en el aprendizaje continuo, el respeto por otros y la creencia de que la colaboración construye cosas más grandes.",
      expertise: "Áreas de Especialización",
      cloud: "Arquitectura en la Nube",
      cloudDesc: "Soluciones Cloud, Terraform, seguridad y optimización de costos",
      ai: "Inteligencia Artificial",
      aiDesc: "Liderazgo en IA, TensorFlow, Ollama, LangChain y estrategia de negocio",
      robotics: "Robótica y Automatización",
      roboticsDesc: "ROS, Gazebo, MATLAB, Simulink y sistemas autónomos",
      education: "Educación y Capacitación",
      educationDesc: "Co-fundador de Lápiz Labs, formación técnica y mentoría",
      solutionsArchitect: "Arquitecto de Soluciones",
      solutionsArchitectDesc: "Especializado en migración a la nube y optimización de infraestructura",
      aiDeveloper: "Desarrollador de IA",
      aiDeveloperDesc: "Implementación de modelos de aprendizaje automático y automatización inteligente",
      technicalEducator: "Educador Técnico",
      technicalEducatorDesc: "Formación de profesionales en tecnologías emergentes",
    },

    career: {
      title: "Trayectoria",
      description: "Dónde se hizo el trabajo de arriba, y en qué papel.",
      downloadCv: "Descargar CV (PDF)",
      present: "Actualidad",
    },

    speaking: {
      title: "Conferencias y docencia",
      description:
        "Cada foto dice dónde, cuándo y ante quién. Sin esos tres datos, una foto es decoración.",
      attendees: "asistentes",
    },

    // Projects
    projects: {
      title: "Proyectos Destacados",
      subtitle:
        "Explora mi trabajo en migración a la nube, educación en robótica y soluciones de ingeniería innovadoras",
      viewDetails: "Ver Detalles",
      code: "Código",
      empty: "No hay proyectos disponibles en este momento.",
      ongoing: "Actualidad",
    },

    // Project detail page
    project: {
      back: "Volver a proyectos",
      viewProject: "Ver Proyecto",
      code: "Código",
      impact: "Impacto",
      gallery: "Galería",
      videos: "Videos",
      links: "Enlaces",
      tech: "Tecnologías",
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
      title: "Construyamos Algo Increíble Juntos",
      subtitle:
        "¿Listo para transformar tu negocio con soluciones de vanguardia en la nube y IA? Hablemos sobre cómo podemos optimizar tus procesos e impulsar el crecimiento.",
      whatsapp: "Contactar por WhatsApp",
      emailLabel: "Correo",
      linkedinLabel: "LinkedIn",
      whatsappLabel: "WhatsApp",
      whyWork: "¿Por Qué Trabajar Conmigo?",
      experience: "Resiliencia y Enfoque",
      experienceDesc: "Sé recuperarme de la adversidad y convertir pruebas difíciles en oportunidades de crecimiento",
      education: "Creatividad para Resolver Problemas",
      educationDesc: "Busco distintos caminos hasta encontrar la mejor solución para cada desafío único",
      innovation: "Compromiso con la Excelencia",
      innovationDesc: "En cada proyecto dejo una parte de mí y nunca dejo de aprender y mejorar",
      responsibleDesign: "Diseño Responsable",
      responsibleDesignDesc:
        "Pienso en la escalabilidad, performance, disponibilidad, precio y seguridad al crear soluciones",
    },

    footer: {
      description:
        "Ingeniero Mecatrónico y Arquitecto de Soluciones en Nube. Transformando empresas a través de arquitecturas innovadoras en la nube, soluciones de IA y educación en robótica.",
      services: {
        title: "Servicios",
        list: [
          "Diseño de Arquitectura en Nube",
          "Estrategia e Implementación de IA",
          "Sistemas Robóticos",
          "Formación Técnica",
          "Consultoría Empresarial",
        ],
      },
      contact: {
        title: "Contacto",
      },
      copyright: "© 2026 Nicolas Velasquez Lopez. Todos los derechos reservados.",
      tagline: "Arquitecto de Soluciones • Especialista en IA • Educador en Robótica • Colombia",
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
