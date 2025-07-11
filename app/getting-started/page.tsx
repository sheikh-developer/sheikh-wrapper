import type { Metadata } from "next"
import CodeBlock from "@/components/code-block"

export const metadata: Metadata = {
  title: "Getting Started | Sheikh LLM Docs",
  description: "Learn how to install, configure, and use the Sheikh LLM Docs system.",
}

export default function GettingStartedPage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>Getting Started</h1>
      <p>
        Welcome to the official setup guide for <strong>Sheikh LLM Docs</strong>. This guide will walk you through
        installing, configuring, and running the documentation site locally, and preparing it for deployment on Vercel.
      </p>

      <h2>1. Installation</h2>
      <p>Clone the repository and install dependencies:</p>
      <CodeBlock
        code={`git clone https://github.com/your-repo/sheikh-llm-docs
cd sheikh-llm-docs
npm install`}
        language="bash"
        type="code"
      />

      <h2>2. Environment Configuration</h2>
      <p>
        Create a <code>.env.local</code> file in the root of your project and add your Google Gemini API key. This key
        is used by the mock API endpoint to simulate LLM responses.
      </p>
      <CodeBlock
        code={`GEMINI_API_KEY=your_google_gemini_api_key_here`}
        language="env"
        file=".env.local"
        type="config"
      />
      <p className="text-sm text-muted-foreground">
        Note: For a real LLM integration, ensure this key is securely managed and never exposed client-side.
      </p>

      <h2>3. Running Locally</h2>
      <p>Start the development server:</p>
      <CodeBlock code={`npm run dev`} language="bash" type="code" />
      <p>
        Open <a href="http://localhost:3000">http://localhost:3000</a> in your browser to see the documentation site.
      </p>

      <h2>4. Project Structure</h2>
      <p>
        Understanding the project's directory structure is key to navigating and customizing the{" "}
        <strong>Sheikh LLM Docs</strong> system.
      </p>
      <CodeBlock
        code={`sheikh-llm-docs/
├── app/
│   ├── layout.tsx                 # Root layout (mobile-first, with sidebar)
│   ├── page.tsx                   # Home page
│   ├── components/
│   │   └── page.tsx               # Component docs page
│   └── getting-started/
│       └── page.tsx               # This guide's content
│   └── api-reference/
│       └── page.tsx               # API Reference documentation page
├── api/
│   └── v1/
│       └── chat/
│           └── completions.ts     # POST /v1/chat/completions endpoint
├── components/
│   ├── ui/                        # Shadcn/ui components (button, card, sheet, toggle-theme)
│   ├── app-sidebar.tsx            # Main sidebar navigation component
│   ├── footer.tsx                 # Footer with icons and 🇧🇩 flag
│   ├── code-block.tsx             # Component for syntax highlighting
│   └── theme-provider.tsx         # Context provider for dark mode
├── public/
│   └── flag-bd.png                # Bangladesh flag icon
├── styles/
│   └── globals.css                # Tailwind base styles
├── utils/                         # Utility functions (e.g., for LLM calls, MDX formatting)
├── models/                        # LLM model registry
├── prompts/                       # LLM system prompts
├── types/                         # TypeScript type definitions
├── tests/                         # Unit and integration tests
├── vercel.json                    # Vercel deployment configuration
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json`}
        language="bash"
        type="code"
      />

      <h2>5. Deployment to Vercel</h2>
      <p>
        The project is optimized for deployment on Vercel. Ensure you have the Vercel CLI installed and are logged in.
      </p>
      <CodeBlock
        code={`npm install -g vercel
vercel login`}
        language="bash"
        type="code"
      />
      <p>
        The <code>vercel.json</code> file is already configured to route API calls and serve the Next.js application. To
        deploy:
      </p>
      <CodeBlock code={`vercel --prod`} language="bash" type="code" />
      <p>
        You will be prompted to link your project to a Vercel account and project. Once deployed, your documentation
        site will be live!
      </p>

      <h2>6. Testing</h2>
      <p>
        The project includes a basic testing setup using Jest. You can run tests to ensure core functionalities are
        working as expected.
      </p>
      <CodeBlock code={`npm test`} language="bash" type="code" />
      <p>
        Refer to the <code>tests/</code> directory for example unit and integration tests.
      </p>

      <h2>7. Dark Mode</h2>
      <p>
        The documentation site includes a dark mode toggle for improved readability in different lighting conditions.
        You can find the toggle button in the header on mobile and desktop.
      </p>
    </div>
  )
}
