"use client"

import Link from "next/link"

interface AppSidebarProps {
  onClose: () => void // Callback to close the sidebar on mobile
}

export default function AppSidebar({ onClose }: AppSidebarProps) {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/getting-started", label: "Getting Started" },
    { href: "/components", label: "Components" },
    { href: "/api-reference", label: "API Reference" },
  ]

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl font-semibold mb-6 p-6 pb-0">Sheikh LLM</h2>
      <nav className="flex-grow p-6 pt-0">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block text-muted-foreground hover:text-foreground transition-colors"
                onClick={onClose} // Close sidebar on navigation
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
