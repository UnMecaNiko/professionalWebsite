import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Nicolas Velasquez Lopez - Cloud & AI Solutions Architect",
  description:
    "Professional portfolio of Nicolas Velasquez Lopez, Cloud & AI Solutions Architect specializing in robotics and education",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
