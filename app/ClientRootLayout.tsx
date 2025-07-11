"use client"

import type React from "react"
import { useState } from "react"
import AppSidebar from "@/components/app-sidebar"
import Footer from "@/components/footer"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/ui/toggle-theme"

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-background border-r border-border">
        <AppSidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      <main className="flex-1 flex flex-col w-full md:w-[calc(100%-16rem)]">
        {/* Mobile Header with Menu Toggle and Theme Toggle */}
        <header className="md:hidden flex items-center justify-between h-16 px-4 border-b border-border bg-background">
          <h1 className="text-lg font-bold">Sheikh LLM Docs</h1>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle sidebar">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <AppSidebar onClose={() => setIsSidebarOpen(false)} />
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <div className="flex-grow p-4 md:p-8">{children}</div>
        <Footer />
      </main>
    </div>
  )
}
