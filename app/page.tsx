import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home | Sheikh LLM Docs",
  description: "Welcome to the official documentation for the Sheikh LLM ecosystem.",
}

export default function HomePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>Welcome to Sheikh LLM Docs</h1>
      <p>
        This is the central hub for documentation, API references, and guides for building with the Sheikh LLM
        ecosystem.
      </p>

      <h2>Enhanced Code Blocks</h2>
      <p>
        Our documentation uses enhanced code blocks to provide rich context, including project, file path, and type
        metadata.
      </p>

      <pre>
        <code className="language-tsx">
          {" "}
          {` \`\`\`tsx project="Sheikh UI Docs" file="components/page.tsx" type="react"
import { Button } from "@/components/ui/button"

export default function Example() {
  return <Button>Test</Button>
}
\`\`\` `}
        </code>
      </pre>

      <h2>System Architecture</h2>
      <p>Below is a flowchart of the request lifecycle in a typical chat application built with our tools.</p>

      <pre>
        <code className="language-mermaid">
          {" "}
          {` \`\`\`mermaid title="Chat Request Flow" type="diagram"
graph TD
    A[User Input] --> B[Client App]
    B --> C{/v1/chat/completions}
    C --> D[Vercel Edge Function]
    D --> E[LLM Model Logic]
    E --> F[LLM Response]
    F --> B
\`\`\` `}
        </code>
      </pre>
    </div>
  )
}
