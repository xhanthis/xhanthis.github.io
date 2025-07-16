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
  title: "Rahul - A Random Guy",
  description:
    "I love solving problems and building things. Happiest when designing and coding.",
  keywords: ["Rahul Kulkarni", "Product Manager", "Tech Leader", "HireDM", "SaffronStays", "Startup Advisor", "Software Engineer"],
  authors: [{ name: "Rahul Kulkarni" }],
  creator: "Rahul Kulkarni",
  publisher: "Rahul Kulkarni",
  metadataBase: new URL('https://xhanthis.github.io'),
  icons: {
    icon: [
      {
        url: '/avatar.jpeg',
        sizes: '32x32',
        type: 'image/jpeg',
      },
      {
        url: '/avatar.jpeg',
        sizes: '16x16',
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
    shortcut: '/avatar.jpeg',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://xhanthis.github.io",
    title: "Rahul Kulkarni",
    description: "I love solving problems and building things. Happiest when designing and coding.",
    siteName: "Rahul Kulkarni",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Kulkarni",
    description: "I love solving problems and building things. Happiest when designing and coding.",
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
