"use client"

import { PromptViewer } from "@/components/prompt-viewer"

export default function McpSheikhWrapperClient() {
  const samplePrompt = `<system>
  <model>sheikh-1.5-ui</model>
  <description>
    You are a front-end AI engineer specializing in rapid UI generation.
    Prioritize:
      - Tailwind CSS
      - HTML/JSX layouting
      - Developer-focused snippets
  </description>
  <examples>
    <task>Generate a login form with Tailwind</task>
    <task>Build responsive navbar with dark mode toggle</task>
  </examples>
</system>`

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold">MCP-powered Sheikh Wrapper</h1>
      <p className="mb-6 text-xl text-muted-foreground">
        Model Context Protocol + /v1/chat/completions endpoint with custom Sheikh LLMs
      </p>

      <div className="mb-8 rounded-lg border bg-muted/50 p-4">
        <p className="text-sm">
          This section explains how our custom Sheikh LLMs work, how the MCP integration logic is embedded, and how
          everything ties into the OpenAI-compatible API (/v1/chat/completions) — including dynamic client navigation
          rendering.
        </p>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🧠 Sheikh Wrapper — Architecture Overview</h2>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border p-3 text-left">Component</th>
              <th className="border border-border p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">sheikh-*.md Prompts</td>
              <td className="border border-border p-3">Preset system messages for Gemini, encoded in MD/XML</td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">/v1/chat/completions</td>
              <td className="border border-border p-3">OpenAI-style interface for user+tool conversations</td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">MCP (Model Context Protocol)</td>
              <td className="border border-border p-3">
                Middleware that routes tool calls, adds structured memory + tool access
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">Gemini Proxy Layer</td>
              <td className="border border-border p-3">
                Abstraction that wraps Google's Gemini Pro/Flash APIs securely
              </td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">Navigation UI</td>
              <td className="border border-border p-3">
                Dynamic Next.js sidebar rendering docs structure using usePathname
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🔌 What is MCP (Model Context Protocol)?</h2>
      <p className="mb-4">
        Model Context Protocol (MCP) is our internal mechanism that wraps context-aware logic around model calls.
      </p>

      <h3 className="mb-3 text-xl font-semibold">🧩 Core Concepts:</h3>
      <ul className="mb-6 list-inside list-disc space-y-2">
        <li>
          MCP intercepts <code className="rounded bg-muted px-1 py-0.5">/v1/chat/completions</code> calls
        </li>
        <li>
          Checks for structured prompts (e.g. <code className="rounded bg-muted px-1 py-0.5">{"<tool>"}</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5">{"<memory>"}</code>)
        </li>
        <li>Routes to tools, APIs, or internal memory when required</li>
        <li>Resolves tool responses back into the message stream before passing to Gemini</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">📡 /v1/chat/completions Endpoint (OpenAI-Compatible)</h2>

      <div className="mb-4 rounded-lg bg-muted p-4">
        <code className="text-sm font-bold">POST /v1/chat/completions</code>
      </div>

      <h3 className="mb-3 text-xl font-semibold">✅ Input Payload</h3>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`{
  "model": "sheikh-2.5-cog-thinking",
  "messages": [
    { "role": "system", "content": "<system>...</system>" },
    { "role": "user", "content": "What's the difference between GPT-4 and Claude?" }
  ],
  "stream": false,
  "tools": [...],            // Optional (MCP Tools)
  "tool_choice": "auto"      // or tool name (optional)
}`}</code>
      </pre>

      <h3 className="mb-3 text-xl font-semibold">🧠 MCP Logic Applied:</h3>
      <ol className="mb-6 list-inside list-decimal space-y-2">
        <li>
          <strong>Model Loader:</strong> <code className="rounded bg-muted px-1 py-0.5">models/registry.ts</code>{" "}
          resolves model ID → backend Gemini + system prompt
        </li>
        <li>
          <strong>Prompt Loader:</strong> loads .md prompt for system message from{" "}
          <code className="rounded bg-muted px-1 py-0.5">/prompts/*.md</code>
        </li>
        <li>
          <strong>MCP Router:</strong> checks for tools, tool_choice, MCP blocks like:
          <pre className="mt-2 rounded bg-muted p-2 text-sm">
            <code>{`<tool name="weather.lookup" />
<memory ref="session.user_preferences" />`}</code>
          </pre>
        </li>
        <li>
          <strong>Tool Adapter Execution:</strong>
          <ul className="ml-4 mt-1 list-inside list-disc">
            <li>Finds matching adapter</li>
            <li>Executes via REST or internal method</li>
            <li>Returns result injected into messages</li>
          </ul>
        </li>
        <li>
          <strong>Final Call to Gemini:</strong> after context injected, Gemini gets full messages → response returned
        </li>
      </ol>

      <h3 className="mb-3 text-xl font-semibold">🔁 Streaming Mode</h3>
      <p className="mb-6">
        If <code className="rounded bg-muted px-1 py-0.5">stream: true</code>, the response is streamed as SSE (
        <code className="rounded bg-muted px-1 py-0.5">data: {"{ delta: ... }"}</code>) — compatible with OpenAI clients
        like LangChain, OpenRouter, etc.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">💡 Sample Prompt (sheikh-1.5-ui.md) Preview</h2>
      <p className="mb-4">
        Here's an interactive preview of a sample system prompt. In a real application, these prompts would be loaded
        dynamically from the <code>/prompts</code> directory.
      </p>
      <PromptViewer code={samplePrompt} fileName="sheikh-1.5-ui.md" title="sheikh-1.5-ui.md" />

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🧩 Tool Adapter Example</h2>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`// tools/compareModels.ts
export const compareModels = async (input) => {
  return {
    differences: [
      "Claude 3 handles longer documents contextually",
      "GPT-4 is more deterministic under fine-tuning",
    ],
    summary: "Both models excel, but Claude 3 leads in document coherence."
  }
}`}</code>
      </pre>
      <p className="mb-6">
        MCP resolves this tool, runs it before calling the model, then injects results into the assistant's context.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🧭 Navigation UI: "use client" Integration</h2>
      <pre className="mb-4 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`"use client"
import { usePathname } from "next/navigation"`}</code>
      </pre>
      <p className="mb-4">
        This allows dynamic sidebar rendering — highlighting the active page (
        <code className="rounded bg-muted px-1 py-0.5">pathname === item.href</code>) from a central registry:
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`const navItems = [
  { name: "Introduction", href: "/" },
  { name: "Getting Started", href: "/getting-started" },
  { name: "Components", href: "/components" },
  { name: "API Reference", href: "/api-reference" }
]`}</code>
      </pre>
      <p className="mb-6">
        When you navigate to <code className="rounded bg-muted px-1 py-0.5">/api-reference</code>, the button becomes
        visually active (<code className="rounded bg-muted px-1 py-0.5">bg-muted</code>), providing visual feedback.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🧱 How All Layers Fit Together</h2>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4 text-sm">
        <code>{`[User Request] ──▶ /v1/chat/completions
     │
     ▼
[Model Registry]
     │
     ▼
[Prompt Injection (MD/XML)]
     │
     ▼
[MCP Layer: Tool + Memory Resolver]
     │
     ▼
[Final Gemini Model Call]
     │
     ▼
[Streamed or JSON Response to Client]`}</code>
      </pre>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🧠 Sheikh Model Architecture</h2>

      <div className="mb-6 overflow-x-auto">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-muted/50">
              <th className="border border-border p-3 text-left">Model ID</th>
              <th className="border border-border p-3 text-left">Task Domain</th>
              <th className="border border-border p-3 text-left">Backed By</th>
              <th className="border border-border p-3 text-left">Traits</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">sheikh-1.5-ui</td>
              <td className="border border-border p-3">⚡ UI/UX generation</td>
              <td className="border border-border p-3">gemini-1.5-flash</td>
              <td className="border border-border p-3">Fast, Tailwind/HTML-first</td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">sheikh-2.5-cog-thinking</td>
              <td className="border border-border p-3">🧠 Deep CoT reasoning</td>
              <td className="border border-border p-3">gemini-1.5-pro</td>
              <td className="border border-border p-3">Logical, structured, advanced CoT</td>
            </tr>
            <tr>
              <td className="border border-border p-3 font-mono text-sm">sheikh-3.0-legacy</td>
              <td className="border border-border p-3">🧩 Legacy compatibility</td>
              <td className="border border-border p-3">gemini-pro</td>
              <td className="border border-border p-3">Compact, safe, backwards-compatible</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">📁 Directory Structure</h2>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`sheikh-wrapper/
├── models/
│   └── registry.ts                  # Maps model ID → Gemini backend + prompt
├── prompts/
│   ├── sheikh-1.5-ui.md             # UI-centric system prompt
│   ├── sheikh-2.5-cog-thinking.md   # Deep CoT, logical agent prompt
│   └── sheikh-3.0-legacy.md         # Safe, legacy, light prompt
├── api/
│   └── v1/
│       └── chat/
│           └── completions.ts       # OpenAI-compatible Chat Completions API
├── utils/
│   ├── callGemini.ts                # Backend abstraction to call Gemini APIs
│   └── loadPrompt.ts                # Reads .md prompts into strings
├── types/
│   └── schema.ts                    # OpenAI-compatible message schema
├── .github/
│   └── workflows/
│       └── deploy.yml               # CI/CD: lint, test, deploy
├── package.json
├── tsconfig.json
└── README.md`}</code>
      </pre>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">✅ Final Summary</h2>
      <ul className="mb-6 list-inside list-disc space-y-2">
        <li>
          <strong>sheikh-wrapper</strong> uses Gemini APIs under custom model wrappers like{" "}
          <code className="rounded bg-muted px-1 py-0.5">sheikh-2.5-cog-thinking</code>
        </li>
        <li>Implements OpenAI-compatible chat completions endpoint</li>
        <li>Leverages MCP logic to intelligently call tools, memory, APIs</li>
        <li>Uses .md files to encode system prompts in structured format</li>
        <li>Designed for modularity, observability, and production-grade deployment</li>
      </ul>

      <div className="mt-8 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950/20">
        <h3 className="mb-2 font-semibold">🚀 Ready to Deploy?</h3>
        <p className="text-sm">Choose your deployment option:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded bg-blue-100 px-2 py-1 text-xs dark:bg-blue-900">⬇ Code blocks</span>
          <span className="rounded bg-green-100 px-2 py-1 text-xs dark:bg-green-900">📦 ZIP download</span>
          <span className="rounded bg-purple-100 px-2 py-1 text-xs dark:bg-purple-900">🚀 GitHub push</span>
          <span className="rounded bg-orange-100 px-2 py-1 text-xs dark:bg-orange-900">🌐 Vercel deploy</span>
        </div>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">📡 Updated /v1/chat/completions Endpoint (OpenAI-Compatible)</h2>

      <div className="mb-4 rounded-lg bg-muted p-4">
        <code className="text-sm font-bold">POST /v1/chat/completions</code>
      </div>

      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`// api/v1/chat/completions.ts
import { sheikhModels } from "../../../../models/registry";
import { loadPrompt } from "../../../../utils/loadPrompt";
import { callGemini } from "../../../../utils/callGemini";

export default async function handler(req: any, res: any) {
  const { model, messages, stream = false } = req.body;
  const config = sheikhModels[model];
  if (!config) return res.status(400).json({ error: "Invalid model ID." });

  const systemPrompt = await loadPrompt(config.promptFile);
  const payload = {
    model: config.model,
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    stream
  };

  const geminiResponse = await callGemini(payload, stream);
  return geminiResponse.pipeTo(res);
}
`}</code>
      </pre>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Updated models/registry.ts</h2>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`// models/registry.ts
export const sheikhModels = {
  "sheikh-1.5-ui": {
    model: "gemini-1.5-flash",
    promptFile: "sheikh-1.5-ui.md"
  },
  "sheikh-2.5-cog-thinking": {
    model: "gemini-1.5-pro",
    promptFile: "sheikh-2.5-cog-thinking.md"
  },
  "sheikh-3.0-legacy": {
    model: "gemini-pro",
    promptFile: "sheikh-3.0-legacy.md"
  }
} as const;
`}</code>
      </pre>
    </main>
  )
}
