"use client"

import { PromptViewer } from "@/components/prompt-viewer"
import RenderMDX from "@/components/mdx-components" // Import the new MDX renderer
import { Link } from "next/link"

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

  const sampleMdxOutput = `# Welcome to our Platform!

This is a **bold** statement.

<Button variant="default">Click Me</Button>

## Key Features

<Card className="w-full">
  <CardHeader>
    <CardTitle>Feature 1</CardTitle>
    <CardDescription>Description for feature 1.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>More details about this amazing feature.</p>
  </CardContent>
</Card>

### Contact Us

<Input placeholder="Your email" />
<Button>Subscribe</Button>
`

  return (
    <main className="mx-auto max-w-4xl px-6 pb-20">
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
      <p className="mb-4">
        The Sheikh Wrapper is designed as a robust, modular system for deploying and managing custom LLMs with an
        OpenAI-compatible API. Below is a high-level overview of its core components:
      </p>

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
          </tbody>
        </table>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🔌 What is MCP (Model Context Protocol)?</h2>
      <p className="mb-4">
        Model Context Protocol (MCP) is our internal mechanism that wraps context-aware logic around model calls. It
        acts as an intelligent middleware, enhancing the LLM's capabilities by managing conversation context,
        facilitating tool interactions, and handling memory. This allows the LLM to perform complex, multi-step tasks
        and interact with external systems seamlessly.
      </p>

      <h3 className="mb-3 text-xl font-semibold">🧩 Core Concepts:</h3>
      <ul className="mb-6 list-inside list-disc space-y-2">
        <li>
          MCP intercepts <code className="rounded bg-muted px-1 py-0.5">/v1/chat/completions</code> calls.
        </li>
        <li>
          It checks for structured prompts (e.g., <code className="rounded bg-muted px-1 py-0.5">{"<tool>"}</code>,{" "}
          <code className="rounded bg-muted px-1 py-0.5">{"<memory>"}</code>) within the conversation.
        </li>
        <li>Routes to tools, APIs, or internal memory when required.</li>
        <li>Resolves tool responses back into the message stream before passing to Gemini.</li>
      </ul>

      <h3 className="mb-3 text-xl font-semibold">🛠️ Tool Calling with MCP:</h3>
      <p className="mb-4">
        MCP allows the LLM to "call" external functions or APIs based on the user's prompt. This is achieved by defining
        tools and enabling `tool_choice` in the API request. When the model suggests a tool call, MCP intercepts it,
        executes the corresponding function, and then injects the tool's output back into the conversation history. This
        allows the model to continue the conversation with the results of the tool's action.
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`// Conceptual flow within api/v1/chat/completions.ts POST handler
// ... (after initial Gemini call)
if (geminiResponse.choices[0].finish_reason === "tool_calls") {
  const toolCalls = geminiResponse.choices[0].message.tool_calls;
  for (const toolCall of toolCalls) {
    const toolName = toolCall.function.name;
    const toolArgs = JSON.parse(toolCall.function.arguments);

    // Map toolName to actual function and execute
    if (toolName === "get_current_weather") {
      const toolOutput = await getCurrentWeather(toolArgs.location, toolArgs.unit);
      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: JSON.stringify(toolOutput),
      });
    }
    // ... handle other tools
  }
  // Make another call to Gemini with the tool output
  const finalGeminiResponse = await callGemini({ model, messages, stream });
  return NextResponse.json(finalGeminiResponse);
}
// ... (rest of the response handling)
`}</code>
      </pre>

      <h3 className="mb-3 text-xl font-semibold">💾 Memory Management with MCP:</h3>
      <p className="mb-6">
        MCP can also manage conversation history and user-specific context (memory) across sessions. This involves
        storing and retrieving past messages or user preferences, allowing for more coherent and personalized
        interactions over time. In a real application, this would typically involve integration with a database or a
        dedicated caching service.
      </p>

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
    { "role": "user", "content": "What's the difference between Claude 3 and GPT-4?" }
  ],
  "stream": false,
  "tools": [...],            // Optional (MCP Tools)
  "tool_choice": "auto",     // or tool name (optional)
  "format": "mdx" | "markdown" | "text" // NEW: Custom output format
}`}</code>
      </pre>

      <h3 className="mb-3 text-xl font-semibold">🧠 MCP Logic Applied:</h3>
      <ol className="mb-6 list-inside list-decimal space-y-2">
        <li>
          <strong>Model Loader:</strong> <code className="rounded bg-muted px-1 py-0.5">models/registry.ts</code>{" "}
          resolves model ID → backend Gemini + system prompt.
        </li>
        <li>
          <strong>Prompt Loader:</strong> loads .md prompt for system message from{" "}
          <code className="rounded bg-muted px-1 py-0.5">/prompts/*.md</code>.
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
            <li>Finds matching adapter.</li>
            <li>Executes via REST or internal method.</li>
            <li>Returns result injected into messages.</li>
          </ul>
        </li>
        <li>
          <strong>Final Call to Gemini:</strong> after context injected, Gemini gets full messages → response returned.
        </li>
      </ol>

      <h3 className="mb-3 text-xl font-semibold">🔁 Streaming Mode</h3>
      <p className="mb-6">
        If <code className="rounded bg-muted px-1 py-0.5">stream: true</code>, the response is streamed as SSE (
        <code className="rounded bg-muted px-1 py-0.5">data: {"{ delta: ... }"}</code>) — compatible with OpenAI clients
        like LangChain, OpenRouter, etc.
      </p>

      <h3 className="mb-3 text-xl font-semibold">📝 Output Formatting</h3>
      <p className="mb-6">
        The `/v1/chat/completions` endpoint now supports a `format` parameter in the request body to transform the MDX
        output into other formats for non-streaming responses.
        <br />
        **Available Formats:**
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>
            <code className="rounded bg-muted px-1 py-0.5">mdx</code> (default): Returns the raw MDX content.
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5">markdown</code>: Strips out JSX components, returning pure
            Markdown.
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5">text</code>: Removes all Markdown and JSX formatting,
            returning plain text.
          </li>
        </ul>
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

      <h2 className="mb-4 mt-8 text-2xl font-semibold">📚 MDX Output and Formatter</h2>
      <p className="mb-4">
        The Sheikh Wrapper is designed to return rich, structured content in MDX format, allowing for dynamic rendering
        and embedding of React components.
      </p>

      <h3 className="mb-3 text-xl font-semibold">Understanding MDX Output</h3>
      <p className="mb-4">
        Responses from the `/api/v1/chat/completions` endpoint will have content formatted as MDX by default. For
        example:
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`{
  "role": "assistant",
  "content": "# Welcome to our Platform!\\n\\nThis is a **bold** statement.\\n\\n<Button variant=\\"primary\\">Click Me</Button>"
}`}</code>
      </pre>

      <h3 className="mb-3 text-xl font-semibold">Client-Side Rendering MDX</h3>
      <p className="mb-4">
        To render this MDX content in a Next.js client component, you can use libraries like{" "}
        <code className="rounded bg-muted px-1 py-0.5">next-mdx-remote</code>. First, install the necessary packages:
      </p>
      <pre className="bg-muted p-4 rounded-md mb-4">
        <code>{`npm install next-mdx-remote`}</code>
      </pre>
      <p className="mb-4">
        Then, you can use a component like `RenderMDX` (provided in `components/mdx-components.tsx`) to display the
        content:
      </p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`// components/RenderMDX.tsx (simplified for example)
'use client'

import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button' // Example custom component

const components = {
  Button: ({ variant, children }) => (
    <Button variant={variant}>{children}</Button>
  ),
  // Add other custom components here
}

export default function RenderMDX({ content }) {
  const [mdxSource, setMdxSource] = useState(null);

  useEffect(() => {
    const getMdxSource = async () => {
      const source = await serialize(content, { scope: {} });
      setMdxSource(source);
    };
    if (content) {
      getMdxSource();
    }
  }, [content]);

  if (!mdxSource) return <div>Loading content...</div>;
  return <MDXRemote {...mdxSource} components={components} />;
}

// Usage in a page or component:
// import RenderMDX from '@/components/mdx-components';
// <RenderMDX content={yourMdxStringFromApi} />
`}</code>
      </pre>
      <p className="mb-4">Here's a live preview of how MDX content can be rendered:</p>
      <div className="mb-6 rounded-lg border p-4">
        <RenderMDX content={sampleMdxOutput} />
      </div>

      <h3 className="mb-3 text-xl font-semibold">Inbuilt MDX Formatter</h3>
      <p className="mb-4">
        The formatter logic is implemented in `utils/mdxFormatter.ts` and is used by the API endpoint when the `format`
        parameter is specified.
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`// utils/mdxFormatter.ts
export function validateMDX(content: string): boolean { /* ... */ }
export function convertToMarkdown(content: string): string { /* ... */ }
export function extractText(content: string): string { /* ... */ }
`}</code>
      </pre>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🧭 Documentation Site Frontend: Navigation UI</h2>
      <p className="mb-4">
        This section describes how the navigation for this documentation site is built, leveraging Next.js App Router
        features for dynamic rendering and active link highlighting.
      </p>
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
      <p className="mb-4">
        This diagram illustrates the complete flow of a user request through the Sheikh Wrapper system, from the initial
        API call to the final response, highlighting the role of MCP and the Gemini Proxy Layer.
      </p>
      <div className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <pre>
          <code className="language-mermaid">
            {`graph TD;
    A[User Request] --> B[/v1/chat/completions Endpoint];
    B --> C[Model Registry];
    C --> D[Prompt Injection (MD/XML)];
    D --> E[MCP Layer: Tool + Memory Resolver];
    E -- Tool Call / Memory Access --> F[External Tools / Memory];
    F --> E;
    E --> G[Gemini Proxy Layer];
    G --> H[Google Gemini API];
    H --> G;
    G --> I[Streamed or JSON Response to Client];
    I --> A;`}
          </code>
        </pre>
      </div>

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
      <p className="mb-4">
        For a complete overview of the project's directory structure, please refer to the{" "}
        <Link href="/getting-started" className="text-blue-600 hover:underline">
          Getting Started
        </Link>{" "}
        page. Here's a high-level view of the core components related to the Sheikh Wrapper:
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`sheikh-wrapper/
├── api/
│   └── v1/
│       └── chat/
│           └── completions.ts       # OpenAI-compatible Chat Completions API
├── models/
│   └── registry.ts                  # Maps model ID → Gemini backend + prompt
├── prompts/
│   ├── sheikh-1.5-ui.md             # UI-centric system prompt
│   ├── sheikh-2.5-cog-thinking.md   # Deep CoT, logical agent prompt
│   └── sheikh-3.0-legacy.md         # Safe, legacy, light prompt
├── utils/
│   ├── callGemini.ts                # Backend abstraction to call Gemini APIs
│   ├── loadPrompt.ts                # Reads .md prompts into strings
│   └── mdxFormatter.ts              # MDX to Markdown/Text formatter
├── types/
│   └── schema.ts                    # OpenAI-compatible message schema
├── components/
│   └── mdx-components.tsx           # For client-side custom MDX components
└── README.md`}</code>
      </pre>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🧪 Testing</h2>
      <p className="mb-4">
        To ensure code quality and reliability, it's crucial to implement a robust testing strategy. This project can be
        extended with unit and integration tests using popular JavaScript testing frameworks.
      </p>

      <h3 className="mb-3 text-xl font-semibold">Recommended Tools:</h3>
      <ul className="mb-6 list-inside list-disc space-y-2">
        <li>**Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.</li>
        <li>
          **React Testing Library**: A set of utilities that help you test React components in a user-centric way.
        </li>
      </ul>

      <h3 className="mb-3 text-xl font-semibold">Example Test Structure:</h3>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`// tests/unit/loadPrompt.test.ts
import { loadPrompt } from '../../utils/loadPrompt';
import fs from 'fs/promises';

jest.mock('fs/promises'); // Mock fs/promises for isolated testing

describe('loadPrompt', () => {
  it('should load prompt content from a file', async () => {
    (fs.readFile as jest.Mock).mockResolvedValueOnce('<system>Test prompt content</system>');
    const content = await loadPrompt('test-prompt.md');
    expect(content).toBe('<system>Test prompt content</system>');
    expect(fs.readFile).toHaveBeenCalledWith(expect.stringContaining('prompts/test-prompt.md'), 'utf-8');
  });

  it('should throw an error if prompt file is not found', async () => {
    (fs.readFile as jest.Mock).mockRejectedValueOnce(new Error('File not found'));
    await expect(loadPrompt('non-existent.md')).rejects.toThrow('Prompt file not found: non-existent.md');
  });
});

// tests/unit/mdxFormatter.test.ts
import { validateMDX, convertToMarkdown, extractText } from '../../utils/mdxFormatter';

describe('mdxFormatter', () => {
  it('validateMDX should correctly identify MDX content', () => {
    expect(validateMDX('# Hello')).toBe(true);
    expect(validateMDX('<Button>Click</Button>')).toBe(true);
    expect(validateMDX('Plain text')).toBe(false); // Simplified check
  });

  it('convertToMarkdown should strip JSX tags', () => {
    const mdx = '# Title\\n\\nThis is a paragraph with a <Button>Click Me</Button> component.';
    const markdown = '# Title\\n\\nThis is a paragraph with a Click Me component.';
    expect(convertToMarkdown(mdx)).toBe(markdown);
  });

  it('extractText should remove all formatting', () => {
    const mdx = '# Heading\\n\\n**Bold text** and _italic_ text. \`console.log("hello")\`\\n\\n<CustomComponent />\\n- List item 1\\n- List item 2';
    const plainText = 'Heading\\n\\nBold text and italic text. console.log("hello")\\n\\nList item 1\\nList item 2';
    expect(extractText(mdx)).toBe(plainText);
  });
});

// tests/integration/chatCompletions.test.ts
import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../../api/v1/chat/completions'; // Assuming POST is exported

// Mock external dependencies like callGemini and loadPrompt
jest.mock('../../utils/callGemini', () => ({
  callGemini: jest.fn(() => Promise.resolve({
    id: 'mock-id',
    object: 'chat.completion',
    choices: [{ message: { content: '# Mock response\\n<Button>Test</Button>' } }],
    usage: {}
  })),
}));
jest.mock('../../utils/loadPrompt', () => ({
  loadPrompt: jest.fn(() => Promise.resolve('<system>Mock system prompt</system>')),
}));

describe('/api/v1/chat/completions (POST)', () => {
  it('should return a successful chat completion response (MDX default)', async () => {
    const mockRequest = new NextRequest('http://localhost/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'sheikh-1.5-ui',
        messages: [{ role: 'user', content: 'Hello' }],
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.choices[0].message.content).toBe('# Mock response\\n<Button>Test</Button>');
  });

  it('should return a successful chat completion response (Markdown format)', async () => {
    const mockRequest = new NextRequest('http://localhost/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'sheikh-1.5-ui',
        messages: [{ role: 'user', content: 'Hello' }],
        format: 'markdown'
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.choices[0].message.content).toBe('# Mock response\\nTest');
  });

  it('should return 400 for invalid model ID', async () => {
    const mockRequest = new NextRequest('http://localhost/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'invalid-model',
        messages: [{ role: 'user', content: 'Hello' }],
      }),
    });

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid model ID.');
  });
});
`}</code>
      </pre>

      <h3 className="mb-3 text-xl font-semibold">Running Tests:</h3>
      <ol className="mb-6 list-inside list-decimal space-y-2">
        <li>
          Install Jest and React Testing Library:
          <pre className="bg-muted p-2 rounded-md mt-2 text-sm">
            <code>{`npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/dom @testing-library/user-event`}</code>
          </pre>
        </li>
        <li>Configure Jest in `jest.config.js` (or `tsconfig.json` for `ts-jest`).</li>
        <li>
          Add a test script to `package.json`:
          <pre className="bg-muted p-2 rounded-md mt-2 text-sm">
            <code>{`"scripts": {
  "test": "jest"
}`}</code>
          </pre>
        </li>
        <li>
          Run tests: <code className="rounded bg-muted px-1 py-0.5">npm test</code>
        </li>
      </ol>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">⚡ Performance and Security</h2>
      <p className="mb-4">
        For production environments, consider implementing various optimizations and security measures to ensure your
        application is robust and efficient.
      </p>

      <h3 className="mb-3 text-xl font-semibold">Caching Frequent API Calls</h3>
      <p className="mb-4">
        For frequent or expensive API calls (e.g., to the Gemini API), implementing caching mechanisms can significantly
        reduce latency and cost. You could use an in-memory cache (like `node-cache`) or a distributed cache (like
        Redis) for API responses.
      </p>
      <pre className="mb-6 overflow-x-auto rounded-lg bg-muted p-4">
        <code>{`// utils/cachedGeminiCall.ts (Conceptual)
import NodeCache from 'node-cache';
const apiCache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // Cache for 10 minutes

export async function cachedCallGemini(payload: any): Promise<any> {
  const cacheKey = JSON.stringify(payload);
  let cachedResponse = apiCache.get(cacheKey);

  if (cachedResponse) {
    console.log('Cache hit for Gemini API');
    return cachedResponse;
  }

  console.log('Cache miss, calling Gemini API');
  const response = await callGemini(payload); // Your existing callGemini function
  apiCache.set(cacheKey, response);
  return response;
}
`}</code>
      </pre>

      <h3 className="mb-3 text-xl font-semibold">Secure API Key Handling</h3>
      <p className="mb-6">
        Always ensure your `GEMINI_API_KEY` is stored securely as an environment variable and never hardcoded or exposed
        client-side. Vercel's environment variable management is ideal for this.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">🚀 Deployment</h2>
      <p className="mb-4">The Sheikh Wrapper is designed for easy deployment to various platforms.</p>

      <h3 className="mb-3 text-xl font-semibold">Vercel</h3>
      <p className="mb-4">Ensure you have a `vercel.json` file configured for your API routes:</p>
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
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`vercel --prod`}</code>
      </pre>

      <h3 className="mb-3 text-xl font-semibold">Docker</h3>
      <p className="mb-4">You can also containerize your application using Docker:</p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`docker build -t sheikh-wrapper .
docker run -p 3000:3000 sheikh-wrapper`}</code>
      </pre>

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

      <h2 className="mb-4 mt-8 text-2xl font-semibold">✅ Final Summary</h2>
      <ul className="mb-6 list-inside list-disc space-y-2">
        <li>
          <strong>sheikh-wrapper</strong> uses Gemini APIs under custom model wrappers like{" "}
          <code className="rounded bg-muted px-1 py-0.5">sheikh-2.5-cog-thinking</code>.
        </li>
        <li>Implements OpenAI-compatible chat completions endpoint with flexible output formatting.</li>
        <li>Leverages MCP logic to intelligently call tools, memory, and external APIs.</li>
        <li>Uses .md files to encode system prompts in structured format.</li>
        <li>Designed for modularity, observability, and production-grade deployment.</li>
        <li>Includes comprehensive documentation for setup, usage, testing, and deployment.</li>
      </ul>
    </main>
  )
}
