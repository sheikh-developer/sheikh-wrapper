"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  onClose: () => void // Callback to close the sidebar on mobile
}

export default function AppSidebar({ onClose }: AppSidebarProps) {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/getting-started", label: "Getting Started" },
    { href: "/components", label: "Components" },
    { href: "/api-reference", label: "API Reference" },
  ]

  return (
    <div className="h-full flex flex-col p-6">
      <h2 className="text-xl font-semibold mb-6">Sheikh LLM</h2>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={onClose} // Close sidebar on navigation
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
