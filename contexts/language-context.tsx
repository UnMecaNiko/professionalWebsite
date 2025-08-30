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
      title: "Cloud Solutions Architect & AI Specialist",
      subtitle:
        "Mechatronics Engineer at Huawei Cloud, transforming businesses through innovative cloud architectures and AI solutions. Passionate educator bridging technology and learning.",
      cta: "View My Work",
      contact: "Get In Touch",
    },

    // About
    about: {
      title: "About Me",
      description:
        "I'm a Mechatronics Engineer from Colombia working as a Named Accounts Cloud Solutions Architect at Huawei Cloud. I combine deep technical expertise in cloud computing, AI, and robotics with strong communication skills and business acumen. My philosophy centers on continuous learning, respect for others, and the belief that collaboration builds greater things.",
      expertise: "Areas of Expertise",
      cloud: "Cloud Architecture",
      cloudDesc: "Huawei Cloud solutions, Terraform, security and cost optimization",
      ai: "Artificial Intelligence",
      aiDesc: "AI leadership, TensorFlow, Ollama, LangChain, and business strategy",
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

    speaking: {
      title: "Speaking & Education",
      description:
        "Sharing knowledge through conferences, workshops, and technical presentations across Latin America and beyond.",
    },

    // Projects
    projects: {
      title: "Featured Projects",
      subtitle: "Explore my work in cloud migration, robotics education, and innovative engineering solutions",
      viewDetails: "View Details",
      project1: {
        title: "Digital Lottery Cloud Migration",
        desc: "Led the migration of one of Colombia's largest digital lottery companies to Huawei Cloud, more than doubling their monthly recurring revenue through strategic cloud architecture.",
      },
      project2: {
        title: "CNC Laser Machine Build",
        desc: "Built a custom CNC laser machine with 80W laser head and 40×40 cm work area, capable of cutting 5mm wood and engraving leather, steel, and plywood.",
      },
      project3: {
        title: "Space Call Project - International Education",
        desc: "Scientific Instructor for international program supporting students from 6 countries in building electronic boards launched into space, connecting cultures through technology.",
      },
    },

    // Contact
    contact: {
      title: "Let's Build Something Amazing Together",
      subtitle:
        "Ready to transform your business with cutting-edge cloud and AI solutions? Let's discuss how we can optimize your processes and drive growth.",
      whatsapp: "Contact via WhatsApp",
      whyWork: "Why Work With Me?",
      experience: "Proven Track Record",
      experienceDesc: "First place in Huawei's Solutions Architect Competition and recognized business impact",
      education: "Teaching & Mentoring",
      educationDesc: "Co-founder of Lápiz Labs, trained 50+ engineers, and passionate about knowledge sharing",
      innovation: "Technical Excellence",
      innovationDesc: "HCIP Cloud Service Solutions Architect with expertise in AI, robotics, and automation",
    },

    footer: {
      description:
        "Mechatronics Engineer and Cloud Solutions Architect at Huawei Cloud. Transforming businesses through innovative cloud architectures, AI solutions, and robotics education.",
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
      copyright: "© 2024 Nicolas Velasquez Lopez. All rights reserved.",
      tagline: "Huawei Cloud Solutions Architect • AI Specialist • Robotics Educator • Colombia",
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
      title: "Arquitecto de Soluciones en Nube y Especialista en IA",
      subtitle:
        "Ingeniero Mecatrónico en Huawei Cloud, transformando empresas a través de arquitecturas innovadoras en la nube y soluciones de IA. Educador apasionado que conecta tecnología y aprendizaje.",
      cta: "Ver Mi Trabajo",
      contact: "Contactar",
    },

    // About
    about: {
      title: "Sobre Mí",
      description:
        "Soy Ingeniero Mecatrónico de Colombia trabajando como Arquitecto de Soluciones en Nube para Cuentas Nombradas en Huawei Cloud. Combino experiencia técnica profunda en computación en la nube, IA y robótica con habilidades de comunicación sólidas y visión de negocio. Mi filosofía se centra en el aprendizaje continuo, el respeto por otros y la creencia de que la colaboración construye cosas más grandes.",
      expertise: "Áreas de Especialización",
      cloud: "Arquitectura en la Nube",
      cloudDesc: "Soluciones Huawei Cloud, Terraform, seguridad y optimización de costos",
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

    speaking: {
      title: "Conferencias y Educación",
      description:
        "Compartiendo conocimiento a través de conferencias, talleres y presentaciones técnicas en Latinoamérica y más allá.",
    },

    // Projects
    projects: {
      title: "Proyectos Destacados",
      subtitle:
        "Explora mi trabajo en migración a la nube, educación en robótica y soluciones de ingeniería innovadoras",
      viewDetails: "Ver Detalles",
      project1: {
        title: "Migración de Lotería Digital a la Nube",
        desc: "Lideré la migración de una de las compañías de lotería digital más grandes de Colombia a Huawei Cloud, más que duplicando sus ingresos recurrentes mensuales a través de arquitectura estratégica en la nube.",
      },
      project2: {
        title: "Construcción de Máquina Láser CNC",
        desc: "Construí una máquina láser CNC personalizada con cabezal láser de 80W y área de trabajo de 40×40 cm, capaz de cortar madera de 5mm y grabar cuero, acero y contrachapado.",
      },
      project3: {
        title: "Proyecto Space Call - Educación Internacional",
        desc: "Instructor Científico para programa internacional apoyando estudiantes de 6 países en la construcción de placas electrónicas lanzadas al espacio, conectando culturas a través de la tecnología.",
      },
    },

    // Contact
    contact: {
      title: "Construyamos Algo Increíble Juntos",
      subtitle:
        "¿Listo para transformar tu negocio con soluciones de vanguardia en la nube y IA? Hablemos sobre cómo podemos optimizar tus procesos e impulsar el crecimiento.",
      whatsapp: "Contactar por WhatsApp",
      whyWork: "¿Por Qué Trabajar Conmigo?",
      experience: "Trayectoria Comprobada",
      experienceDesc:
        "Primer lugar en la Competencia de Arquitectos de Soluciones de Huawei e impacto empresarial reconocido",
      education: "Enseñanza y Mentoría",
      educationDesc:
        "Co-fundador de Lápiz Labs, entrenó a más de 50 ingenieros y apasionado por compartir conocimiento",
      innovation: "Excelencia Técnica",
      innovationDesc: "HCIP Cloud Service Solutions Architect con experiencia en IA, robótica y automatización",
    },

    footer: {
      description:
        "Ingeniero Mecatrónico y Arquitecto de Soluciones en Nube en Huawei Cloud. Transformando empresas a través de arquitecturas innovadoras en la nube, soluciones de IA y educación en robótica.",
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
      copyright: "© 2024 Nicolas Velasquez Lopez. Todos los derechos reservados.",
      tagline: "Arquitecto de Soluciones Huawei Cloud • Especialista en IA • Educador en Robótica • Colombia",
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
