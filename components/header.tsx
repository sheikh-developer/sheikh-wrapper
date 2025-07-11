"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full bg-gray-900 text-white shadow">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-bold">
          Powerfully&nbsp;Simple
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-blue-400"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Button asChild className="hidden md:inline-flex">
          <Link href="#contact">Free&nbsp;Trial</Link>
        </Button>

        {/* Mobile menu button */}
        <button
          className="inline-flex size-9 items-center justify-center rounded md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu className="size-6" />
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav className="md:hidden">
          <ul className="space-y-1 border-t border-gray-800 bg-gray-900 p-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded px-3 py-2 text-sm font-medium hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild className="w-full">
                <Link href="#contact" onClick={() => setOpen(false)}>
                  Free&nbsp;Trial
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
