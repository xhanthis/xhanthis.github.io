import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Rahul - a random guy",
  description:
    "I love solving problems and building things. Currently building HireDM and scaling SaffronStays. Product & Tech advisor for startups.",
  keywords: ["Rahul Kulkarni", "Product Manager", "Tech Leader", "HireDM", "SaffronStays", "Startup Advisor"],
  authors: [{ name: "Rahul Kulkarni" }],
  creator: "Rahul Kulkarni",
  publisher: "Rahul Kulkarni",
  metadataBase: new URL('https://xhanthis.github.io'),
  icons: {
    icon: [
      {
        url: '/avatar.jpeg',
        sizes: 'any',
        type: 'image/jpeg',
      }
    ],
    apple: [
      {
        url: '/avatar.jpeg',
        sizes: '180x180',
        type: 'image/jpeg',
      }
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xhanthis.github.io",
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
