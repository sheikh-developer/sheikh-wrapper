import type { Metadata } from "next"
import Link from "next/link"
import { FaGithub, FaTelegram, FaReact } from "react-icons/fa"
import HeroSection from "@/components/hero-section"
import FeatureGrid from "@/components/feature-grid"
import ManagementDashboardPreview from "@/components/management-dashboard-preview"
import CallToAction from "@/components/call-to-action"

export const metadata: Metadata = {
  title: "Introduction | Sheikh Wrapper Docs",
  description: "Welcome to the Sheikh LLM MCP-compatible documentation site",
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeroSection />
      <FeatureGrid />
      <ManagementDashboardPreview />
      <CallToAction />
      <footer className="mt-10 flex flex-col items-center gap-2 border-t pt-6 text-sm text-muted-foreground">
        <div className="mb-2 flex items-center gap-4">
          <Link href="https://github.com/sheikh-llm" target="_blank" aria-label="GitHub">
            <FaGithub className="text-xl hover:text-black" />
          </Link>
          <Link href="https://t.me/likhonsheikh" target="_blank" aria-label="Telegram">
            <FaTelegram className="text-xl hover:text-blue-500" />
          </Link>
          <Link href="https://react.dev" target="_blank" aria-label="React">
            <FaReact className="text-xl hover:text-sky-500" />
          </Link>
        </div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b2/Flag_Map_of_Bangladesh.png"
          alt="Bangladesh"
          className="h-8 w-8"
        />
        <p className="mt-2">
          🇧🇩 Proudly built in Bangladesh by{" "}
          <a href="https://t.me/likhonsheikh" className="underline">
            Likhon Sheikh
          </a>
        </p>
      </footer>
    </div>
  )
}
