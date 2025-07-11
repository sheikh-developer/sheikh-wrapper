import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Getting Started | sheikh-wrapper",
  description: "Learn how to install, configure, and use the sheikh-wrapper MCP system",
}

export default function GettingStarted() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">Getting Started</h1>
      <p className="mb-4 text-xl">
        Welcome to the official setup guide for <strong>sheikh-wrapper</strong>, an MCP-powered wrapper for deploying
        Gemini models with OpenAI-compatible endpoints on Vercel.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">📦 Installation</h2>
      <p className="mb-4">Clone the repository and install dependencies:</p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`git clone https://github.com/YOUR_USERNAME/sheikh-wrapper
cd sheikh-wrapper
npm install`}</code>
      </pre>

      <h2 className="text-2xl font-semibold mt-8 mb-4">🔐 Environment Configuration</h2>
      <p className="mb-4">
        Create a <code>.env</code> file in the root and add your <strong>Google Gemini API key</strong>:
      </p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`GEMINI_API_KEY=your_google_gemini_api_key_here`}</code>
      </pre>

      <h2 className="text-2xl font-semibold mt-8 mb-4">⚙️ Usage via OpenAI API Format</h2>
      <p className="mb-4">
        You can make OpenAI-compatible requests to <code>/v1/chat/completions</code> using any client. Here's a basic
        example using <code>fetch</code>:
      </p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`await fetch("/v1/chat/completions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "sheikh-2.5-cog-thinking",
    messages: [
      { role: "user", content: "What is the difference between Claude 3 and GPT-4?" }
    ]
  })
})`}</code>
      </pre>

      <h2 className="text-2xl font-semibold mt-8 mb-4">🧠 Available Models</h2>
      <ul className="list-disc list-inside mb-6">
        <li>
          <code>sheikh-1.5-ui</code> – UI/UX code generation via Gemini 1.5 Flash
        </li>
        <li>
          <code>sheikh-2.5-cog-thinking</code> – Advanced reasoning via Gemini 1.5 Pro
        </li>
        <li>
          <code>sheikh-3.0-legacy</code> – Backward-compatible responses via Gemini Pro
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">📁 Project Structure</h2>
      <p className="mb-4">
        Understanding the project's directory structure is key to navigating and customizing the{" "}
        <strong>sheikh-wrapper</strong> system. Here's an overview of the main folders and files:
      </p>
      <pre className="bg-muted p-4 rounded-md mb-4 text-sm">
        <code>{`sheikh-wrapper/
├── api/
│   └── v1/
│       └── chat/
│           └── completions.ts  # OpenAI-compatible Chat Completions API endpoint
├── app/
│   ├── api-reference/          # API Reference documentation page
│   ├── components/             # Reusable UI components (e.g., sidebar)
│   ├── getting-started/        # This guide's content
│   ├── mcp-sheikh-wrapper/     # Dedicated page for MCP Sheikh Wrapper details
│   ├── layout.tsx              # Root layout for the Next.js application
│   └── page.tsx                # Introduction/Home page
├── models/
│   └── registry.ts             # Maps Sheikh model IDs to Gemini backend configs and prompts
├── prompts/
│   ├── sheikh-1.5-ui.md        # UI-centric system prompt
│   ├── sheikh-2.5-cog-thinking.md # Deep Chain-of-Thought (CoT) prompt
│   └── sheikh-3.0-legacy.md    # Safe, legacy, and lightweight prompt
├── utils/
│   ├── callGemini.ts           # Backend abstraction for Gemini API calls
│   └── loadPrompt.ts           # Utility to read .md prompt files
├── types/
│   └── schema.ts               # OpenAI-compatible message schema definitions
├── .github/
│   └── workflows/
│       └── deploy.yml          # CI/CD pipeline for linting, testing, and deployment
├── vercel.json                 # Vercel deployment configuration
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript compiler settings
└── README.md                   # Project documentation and usage instructions`}</code>
      </pre>
      <ul className="mb-6 list-disc list-inside space-y-2 text-base">
        <li>
          The <code>api/</code> directory contains the Next.js API routes, specifically <code>completions.ts</code>,
          which serves as your OpenAI-compatible endpoint. This is where external applications will send their chat
          requests.
        </li>
        <li>
          The <code>app/</code> directory is the heart of the Next.js App Router application, housing all your UI pages,
          shared components, and the root layout.
        </li>
        <li>
          <code>models/registry.ts</code> is crucial for defining your custom Sheikh LLMs and linking them to their
          specific Gemini configurations and system prompts.
        </li>
        <li>
          <code>prompts/</code> holds the Markdown files that define the behavior and context for each Sheikh model.
        </li>
        <li>
          <code>utils/</code> provides helper functions, abstracting away the complexities of calling the Gemini API and
          loading prompts.
        </li>
        <li>
          The <code>vercel.json</code> file is essential for Vercel deployment, telling Vercel how to build and route
          your API endpoints. It ensures that requests to <code>/v1/chat/completions</code> are correctly directed to
          your serverless function.
        </li>
        <li>
          The <code>.github/</code> directory (specifically <code>workflows/deploy.yml</code>) sets up your CI/CD
          pipeline, automating testing and deployment to Vercel on every push to your main branch.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">🚀 Deploy to Vercel</h2>
      <p className="mb-4">
        Ensure you have a <code>vercel.json</code> file:
      </p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`{
  "version": 2,
  "builds": [
    { "src": "api/v1/chat/completions.ts", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/v1/chat/completions", "dest": "api/v1/chat/completions.ts" }
  ]
}`}</code>
      </pre>
      <p className="mb-4">
        Push to GitHub, connect to Vercel, and your MCP endpoint will be live at:
        <code className="ml-1">https://your-project.vercel.app/v1/chat/completions</code>
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">📚 What's Next?</h2>
      <p className="mb-4">
        Check out the <strong>Components</strong> and <strong>API Reference</strong> to learn how to extend tool
        adapters and system prompts for MCP.
      </p>
    </main>
  )
}
