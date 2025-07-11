"use client"

export default function ClientComponents() {
  return (
    <div className="max-w-3xl mx-auto px-6 pb-16">
      <h1 className="text-4xl font-bold mb-6">🧩 UI Components in Sheikh Wrapper</h1>
      <p className="mb-4 text-xl">
        Sheikh LLM’s front-end is built with modular components from <strong>shadcn/ui</strong>, styled using Tailwind
        CSS. These building blocks help you integrate Sheikh quickly into your apps.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">🔘 Button</h2>
      <p className="mb-4">
        Our button component supports variants and event handlers. Ideal for user prompts, UI actions, or tool
        triggering.
      </p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`import { Button } from "@/components/ui/button"

<Button variant="default" onClick={() => console.log("Clicked!")}>
  Click me
</Button>`}</code>
      </pre>
      <h2 className="text-2xl font-semibold mt-8 mb-4">📦 Card</h2>
      <p className="mb-4">Used for wrapping logic blocks, prompts, or model explanations in a consistent layout.</p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`import { Card, CardHeader, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>🧠 Model Insight</CardHeader>
  <CardContent>This card wraps content rendered from your prompt engine.</CardContent>
</Card>`}</code>
      </pre>
      <h2 className="text-2xl font-semibold mt-8 mb-4">✍️ Input</h2>
      <p className="mb-4">Styled inputs used in chat UIs, MCP parameter entry, and prompt editing forms.</p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`import { Input } from "@/components/ui/input"

<Input placeholder="Enter system prompt..." onChange={(e) => console.log(e.target.value)} />`}</code>
      </pre>
      <h2 className="text-2xl font-semibold mt-8 mb-4">🧠 Custom Chat Interface</h2>
      <p className="mb-4">
        Sheikh Wrapper supports multi-model chat sessions using <code>/v1/chat/completions</code>. Use components like{" "}
        <code>Textarea</code>, <code>Message</code>, or <code>Avatar</code> for rendering chat history and user input.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">🔧 Tool UI Extensions</h2>
      <p className="mb-4">
        Tool-driven interactions (e.g., callTool or tool_choice) use UI wrappers with loading states, action buttons,
        and streaming feedback.
      </p>
      <p className="mt-8">
        For a complete reference on props and type definitions, see the <strong>API Reference</strong> section.
      </p>
    </div>
  )
}
