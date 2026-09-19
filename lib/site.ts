/**
 * Site-wide constants. They cannot live in `app/layout.tsx`: a Next.js route
 * file may only export the handful of names the framework knows, and anything
 * else fails the type check.
 */
export const SITE_URL = "https://www.unmecaniko.com"

export const SITE_TITLE = "Nicolas Velasquez Lopez - Cloud & AI Solutions Architect"

export const SITE_DESCRIPTION =
  "Professional portfolio of Nicolas Velasquez Lopez, Cloud & AI Solutions Architect specializing in robotics and education"

export const WHATSAPP_URL =
  "https://wa.me/573204081631?text=Hola Nico, vi tu página web y quiero contactar contigo."

export const LINKEDIN_URL = "https://www.linkedin.com/in/unmecaniko/"

export const GITHUB_URL = "https://github.com/UnMecaNiko"

export const YOUTUBE_URL = "https://www.youtube.com/@unmecaniko"

export const EMAIL = "unmecaniko@gmail.com"

/**
 * The general resume, built in the knowledge repository from
 * knowledge/identity/ (planning/career/cvs/general-resume.pdf). It is the
 * default sheet: the one to hand out when there is no target role yet.
 */
export const CV_URL = "/nicolas-velasquez-lopez-cv.pdf"
