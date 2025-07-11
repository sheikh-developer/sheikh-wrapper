import type { Metadata } from "next"
import Link from "next/link"
import { FaGithub, FaTelegram, FaReact } from "react-icons/fa"

export const metadata: Metadata = {
  title: "Introduction | Sheikh Wrapper Docs",
  description: "Welcome to the Sheikh LLM MCP-compatible documentation site",
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">👳 Welcome to Sheikh LLM Docs</h1>
      <p className="mb-4 text-lg">
        This site documents <strong>Sheikh Wrapper</strong> — a minimal, scalable wrapper system for deploying
        Gemini-based models using OpenAI-compatible endpoints.
      </p>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">✨ Features</h2>
      <ul className="mb-4 list-inside list-disc space-y-1 text-base">
        <li>⚡ MCP-compliant model context protocol</li>
        <li>🎯 3 model presets: UI, Cog Thinking, Legacy</li>
        <li>
          🔌 OpenAI-compatible: <code>/v1/chat/completions</code>
        </li>
        <li>🧠 Gemini-powered via 1.5 Flash / Pro / Legacy</li>
        <li>🌗 Responsive, dark-mode design with Tailwind</li>
        <li>💡 Built with Next.js App Router + shadcn/ui</li>
      </ul>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">🚀 Getting Started</h2>
      <p className="mb-4 text-base">Use the sidebar on the left to navigate. Key sections:</p>
      <ul className="mb-4 list-inside list-disc space-y-1">
        <li>
          <strong>Getting Started</strong>: Installation, config, and usage
        </li>
        <li>
          <strong>Components</strong>: Extend tools, system prompts, and logic
        </li>
        <li>
          <strong>API Reference</strong>: Full OpenAI-compatible schema
        </li>
      </ul>
      <h2 className="mb-4 mt-8 text-2xl font-semibold">🙌 Contributing</h2>
      <p className="mb-4 text-base">
        We welcome contributions to the Sheikh ecosystem. Found a bug or want to improve the logic?
      </p>
      <ul className="mb-4 list-disc list-inside space-y-1">
        <li>
          Open issues or pull requests at{" "}
          <a href="https://github.com/sheikh-llm" className="underline text-blue-600" target="_blank" rel="noreferrer">
            GitHub.com/sheikh-llm
          </a>
        </li>
        <li>
          Chat with Likhon Sheikh via{" "}
          <a href="https://t.me/likhonsheikh" className="underline text-blue-600" target="_blank" rel="noreferrer">
            Telegram
          </a>
        </li>
      </ul>
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
    </main>
  )
}
