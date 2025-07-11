import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/globals.css"
import ClientRootLayout from "./ClientRootLayout"

const inter = Inter({ subsets: ["latin"] })

// Metadata is for server components, so it should be outside the client component
// and will be picked up by Next.js
export const metadata: Metadata = {
  title: "Sheikh LLM Docs",
  description: "The official documentation for the Sheikh LLM ecosystem.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  )
}
