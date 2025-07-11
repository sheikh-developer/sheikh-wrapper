// This file is no longer used in the main layout but kept for reference if a sidebar is desired later.
// It's commented out in app/layout.tsx to use the new Header component instead.
"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, GalleryVerticalEnd, Search } from 'lucide-react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

const navItems = [
  { title: "Introduction", url: "/" },
  { title: "MCP Sheikh Wrapper", url: "/mcp-sheikh-wrapper", icon: Brain },
  { title: "Getting Started", url: "/getting-started" },
  { title: "Components", url: "/components" },
  { title: "API Reference", url: "/api-reference" },
  { title: "Product", url: "/product" },
  { title: "Pricing", url: "/pricing" },
  { title: "How it Works", url: "/how-it-works" },
  { title: "Fiscal Hosting", url: "/fiscal-hosting" },
  { title: "Organization", url: "/organization" },
  { title: "Help & Support", url: "/help-support" },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Docs</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <form>
          <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
              <Label htmlFor="search" className="sr-only">
                Search
              </Label>
              <Input id="search" placeholder="Search the docs..." className="pl-8" />
              <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
            </SidebarGroupContent>
          </SidebarGroup>
        </form>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      {item.icon && <item.icon className="mr-2 size-4" />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
