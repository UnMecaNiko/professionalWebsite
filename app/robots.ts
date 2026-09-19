import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/**
 * `/robots.txt` answered 404 until this file existed. Everything is crawlable:
 * the site is a portfolio and the whole point is to be found, by search engines
 * and by the AI crawlers that recruiters increasingly ask first.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
