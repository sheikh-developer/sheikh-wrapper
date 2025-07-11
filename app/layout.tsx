import "./globals.css"
import { Inter } from 'next/font/google'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/header" // Import the new Header component

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Powerfully Simple - Performance Servers",
  description: "Experience the next generation of server solutions designed for speed, reliability, and effortless management.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <SidebarProvider>
          <Header /> {/* Add the new Header component */}
          <main className="flex-1 overflow-auto">{children}</main> {/* Removed padding from main */}
        </SidebarProvider>
      </body>
    </html>
  )
}
