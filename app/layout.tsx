import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Rahul Kulkarni - Product & Tech Leader",
  description:
    "I love solving problems and building things. Currently building HireDM and scaling SaffronStays. Product & Tech advisor for startups.",
  keywords: ["Rahul Kulkarni", "Product Manager", "Tech Leader", "HireDM", "SaffronStays", "Startup Advisor"],
  authors: [{ name: "Rahul Kulkarni" }],
  creator: "Rahul Kulkarni",
  publisher: "Rahul Kulkarni",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulkulkarni.dev",
    title: "Rahul Kulkarni - Product & Tech Leader",
    description: "I love solving problems and building things. Currently building HireDM and scaling SaffronStays.",
    siteName: "Rahul Kulkarni",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Kulkarni - Product & Tech Leader",
    description: "I love solving problems and building things. Currently building HireDM and scaling SaffronStays.",
    creator: "@xhanthis",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
