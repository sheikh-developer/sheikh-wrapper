import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Components | Sheikh LLM Docs",
  description: "Explore the reusable UI components in the Sheikh LLM Docs system.",
}

export default function ComponentsPage() {
  return (
    <div className="prose prose-invert max-w-none">
      <h1>UI Components</h1>
      <p>
        This section details the reusable UI components used throughout the Sheikh LLM Docs. These components are built
        with shadcn/ui and styled with Tailwind CSS, ensuring a consistent and responsive design.
      </p>

      <h2>Button</h2>
      <p>The primary interactive element. Used for actions, navigation, and form submissions.</p>
      <pre>
        <code className="language-tsx">
          {`import { Button } from "@/components/ui/button"

export default function ButtonExample() {
  return <Button>Click Me</Button>
}`}
        </code>
      </pre>

      <h2>Card</h2>
      <p>
        A flexible container for grouping related content, often used for displaying information blocks or features.
      </p>
      <pre>
        <code className="language-tsx">
          {`import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function CardExample() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Card</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is content inside a card.</p>
      </CardContent>
    </Card>
  )
}`}
        </code>
      </pre>

      {/* Add more component documentation here as needed */}

      <p>For full details on component props and usage, refer to the shadcn/ui documentation.</p>
    </div>
  )
}
