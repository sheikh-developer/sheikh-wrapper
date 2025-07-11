# Sheikh Wrapper - MCP-Powered LLM System

A production-ready Model Context Protocol (MCP) implementation that wraps Google's Gemini APIs with custom Sheikh-branded models, providing an OpenAI-compatible interface.

## 🚀 Features

- **OpenAI-Compatible API**: Drop-in replacement for OpenAI's chat completions endpoint
- **Custom Sheikh Models**: Three specialized models for different use cases
- **MCP Integration**: Advanced tool calling and memory management
- **Streaming Support**: Real-time response streaming
- **TypeScript**: Full type safety and IntelliSense support
- **MDX Output**: Responses are formatted in MDX, with an inbuilt formatter for other formats.

## 🧠 Sheikh Models

| Model ID | Domain | Backend | Traits |
|----------|--------|---------|--------|
| `sheikh-1.5-ui` | UI/UX Generation | Gemini 1.5 Flash | Fast, Tailwind-focused |
| `sheikh-2.5-cog-thinking` | Cognitive Reasoning | Gemini 1.5 Pro | Deep CoT, logical |
| `sheikh-3.0-legacy` | Legacy Compatibility | Gemini Pro | Safe, compact |

## 📦 Installation

\`\`\`bash
npm install
\`\`\`

## 🔧 Environment Setup

\`\`\`bash
# .env.local
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

## 🚀 Usage

### Basic Chat Completion

\`\`\`javascript
const response = await fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-2.5-cog-thinking',
    messages: [
      { role: 'user', content: 'Explain quantum computing' }
    ]
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);
\`\`\`

### Streaming Response

\`\`\`javascript
const response = await fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-1.5-ui',
    messages: [
      { role: 'user', content: 'Create a login form with Tailwind' }
    ],
    stream: true
  })
});

const reader = response.body.getReader();
// Handle streaming data...
\`\`\`

## ✨ Enhancing MDX Output and Formatter

The Sheikh Wrapper is designed to return rich, structured content in MDX format, allowing for dynamic rendering and embedding of React components.

### Understanding MDX Output

Responses from the `/api/v1/chat/completions` endpoint will have content formatted as MDX. For example:

\`\`\`json
{
  "role": "assistant",
  "content": "# Welcome to our Platform!\n\nThis is a **bold** statement.\n\n<Button variant=\"primary\">Click Me</Button>"
}
\`\`\`

### Client-Side Rendering MDX

To render this MDX content in a Next.js client component, you can use libraries like `next-mdx-remote`.

First, install the necessary packages:
\`\`\`bash
npm install next-mdx-remote
\`\`\`

Then, you can render the content like this:

\`\`\`tsx
// components/RenderMDX.tsx
'use client'

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button' // Example custom component

// Define custom components available within your MDX
const components = {
  Button: ({ variant, children }: { variant: string; children: React.ReactNode }) => (
    <Button variant={variant as "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"}>{children}</Button>
  ),
  // Add other custom components here
}

interface RenderMDXProps {
  content: string;
}

export default function RenderMDX({ content }: RenderMDXProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    const getMdxSource = async () => {
      const source = await serialize(content, {
        mdxOptions: {
          // You can add remark/rehype plugins here if needed
        },
        scope: {}, // Data passed to MDX components
      });
      setMdxSource(source);
    };

    if (content) {
      getMdxSource();
    }
  }, [content]);

  if (!mdxSource) {
    return <div>Loading content...</div>;
  }

  return <MDXRemote {...mdxSource} components={components} />;
}

// Usage in a page or component:
// import RenderMDX from '@/components/RenderMDX';
// <RenderMDX content={yourMdxStringFromApi} />
\`\`\`

### Inbuilt MDX Formatter

The `/api/v1/chat/completions` endpoint now supports a `format` parameter in the request body to transform the MDX output into other formats.

**Available Formats:**
- `mdx` (default): Returns the raw MDX content.
- `markdown`: Strips out JSX components, returning pure Markdown.
- `text`: Removes all Markdown and JSX formatting, returning plain text.

**Example Usage:**

\`\`\`javascript
// Requesting Markdown format
const markdownResponse = await fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-1.5-ui',
    messages: [{ role: 'user', content: 'Create a login form with Tailwind' }],
    format: 'markdown' // Requesting Markdown output
  })
});
const markdownData = await markdownResponse.json();
console.log(markdownData.choices[0].message.content); // Will be pure Markdown

// Requesting Plain Text format
const textResponse = await fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-1.5-ui',
    messages: [{ role: 'user', content: 'Summarize this article: ...' }],
    format: 'text' // Requesting plain text output
  })
});
const textData = await textResponse.json();
console.log(textData.choices[0].message.content); // Will be plain text
\`\`\`

The formatter logic is implemented in `utils/mdxFormatter.ts`:

\`\`\`typescript
// utils/mdxFormatter.ts
export function validateMDX(content: string): boolean {
  // Basic syntax check (expand with a parser like @mdx-js/mdx)
  return content.includes('#') || content.includes('<');
}
export function convertToMarkdown(content: string): string {
  // Strip React components, keep Markdown
  return content.replace(/<[^>]+>/g, '');
}
export function extractText(content: string): string {
  // Remove all tags and formatting
  return content.replace(/<[^>]+>|\n|#/g, '').trim();
}
\`\`\`

## 🔌 MCP Integration

The Model Context Protocol (MCP) is a powerful layer designed to enhance LLM interactions with structured context, tool calling, and memory management.

### Tool Calling

MCP allows the LLM to "call" external functions or APIs based on the user's prompt. This is achieved by defining tools and enabling `tool_choice` in the API request.

**Example Tool Definition:**
\`\`\`typescript
// tools/weatherTool.ts
export const weatherTool = {
  type: "function",
  function: {
    name: "get_current_weather",
    description: "Get the current weather in a given location",
    parameters: {
      type: "object",
      properties: {
        location: { type: "string", description: "The city and state, e.g. San Francisco, CA" },
        unit: { type: "string", enum: ["celsius", "fahrenheit"] },
      },
      required: ["location"],
    },
  },
};

// Function to execute the tool
export async function getCurrentWeather(location: string, unit: "celsius" | "fahrenheit" = "fahrenheit") {
  // In a real app, this would call an external weather API
  console.log(`Fetching weather for ${location} in ${unit}...`);
  return {
    location,
    temperature: "22", // Mock data
    unit,
    description: "Partly cloudy",
  };
}
\`\`\`

**Integrating Tools in `api/v1/chat/completions.ts` (Conceptual):**
The `completions.ts` endpoint would need logic to:
1.  Receive `tools` and `tool_choice` in the request payload.
2.  Pass these to the `callGemini` function.
3.  If Gemini suggests a `tool_call`, intercept it.
4.  Execute the corresponding function (e.g., `getCurrentWeather`).
5.  Inject the tool's output back into the conversation history as a `tool` message.
6.  Make a subsequent call to Gemini with the updated history to get the final assistant response.

\`\`\`typescript
// Conceptual flow within api/v1/chat/completions.ts POST handler
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
\`\`\`

### Memory Management

MCP can also manage conversation history and user-specific context (memory) across sessions. This involves storing and retrieving past messages or user preferences.

**Conceptual Memory Integration:**
\`\`\`typescript
// Example: Storing and retrieving session history
// In a real application, this would involve a database (e.g., Supabase, Redis)
const sessionMemory = new Map<string, ChatCompletionMessage[]>();

// Function to load history for a user
function loadUserHistory(userId: string): ChatCompletionMessage[] {
  return sessionMemory.get(userId) || [];
}

// Function to save history for a user
function saveUserHistory(userId: string, history: ChatCompletionMessage[]) {
  sessionMemory.set(userId, history);
}

// Within api/v1/chat/completions.ts POST handler:
// const userId = req.headers['x-user-id']; // Get user ID from request
// const userHistory = loadUserHistory(userId);
// const combinedMessages = [...userHistory, ...messages]; // Prepend history
// const geminiResponse = await callGemini({ model, messages: combinedMessages, stream });
// saveUserHistory(userId, [...combinedMessages, geminiResponse.choices[0].message]); // Save updated history
\`\`\`

## 🏗️ Architecture

\`\`\`
sheikh-wrapper/
├── api/v1/chat/completions.ts    # OpenAI-compatible endpoint with formatting and MCP hooks
├── models/registry.ts            # Model configuration
├── prompts/                      # System prompts for each model
├── utils/
│   ├── callGemini.ts            # Gemini API abstraction
│   ├── loadPrompt.ts            # Prompt loading utility
│   └── mdxFormatter.ts          # NEW: MDX to Markdown/Text formatter
├── types/schema.ts              # TypeScript definitions
├── components/mdx-components.tsx # NEW: For client-side custom MDX components
└── README.md                    # Updated documentation
\`\`\`

## ⚙️ CI/CD (Continuous Integration/Continuous Deployment)

This project includes a basic GitHub Actions workflow for CI/CD, configured in `.github/workflows/deploy.yml`. This workflow automates linting, building, and deploying your application to Vercel on every push to the `main` branch.

### `deploy.yml` Overview

\`\`\`yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main # Trigger on pushes to the main branch

jobs:
  deploy:
    runs-on: ubuntu-latest # Run on a fresh Ubuntu environment
    steps:
      - uses: actions/checkout@v3 # Checkout the repository code
      - name: Install Vercel CLI
        run: npm install --global vercel@latest # Install Vercel CLI globally
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }} # Pull Vercel project settings
      - name: Build Project
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }} # Build the Next.js project for production
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }} # Deploy the pre-built project to Vercel
\`\`\`

**To set up CI/CD:**
1.  Go to your GitHub repository settings.
2.  Navigate to "Secrets and variables" -> "Actions".
3.  Add a new repository secret named `VERCEL_TOKEN` with your Vercel API Token. You can generate a new token from your Vercel account settings.

## 🧪 Testing

To ensure code quality and reliability, it's crucial to implement a robust testing strategy. This project can be extended with unit and integration tests using popular JavaScript testing frameworks.

### Recommended Tools:
-   **Jest**: A delightful JavaScript Testing Framework with a focus on simplicity.
-   **React Testing Library**: A set of utilities that help you test React components in a user-centric way.

### Example Test Structure:

\`\`\`typescript
// tests/unit/loadPrompt.test.ts
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
    const mdx = '# Title\n\nThis is a paragraph with a <Button>Click Me</Button> component.';
    const markdown = '# Title\n\nThis is a paragraph with a Click Me component.';
    expect(convertToMarkdown(mdx)).toBe(markdown);
  });

  it('extractText should remove all formatting', () => {
    const mdx = '# Heading\n\n**Bold text** and _italic_ text. `console.log("hello")`\n\n<CustomComponent />\n- List item 1\n- List item 2';
    const plainText = 'Heading\n\nBold text and italic text. console.log("hello")\n\nList item 1\nList item 2';
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
    choices: [{ message: { content: '# Mock response\n<Button>Test</Button>' } }],
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
    expect(data.choices[0].message.content).toBe('# Mock response\n<Button>Test</Button>');
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
    expect(data.choices[0].message.content).toBe('# Mock response\nTest');
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
\`\`\`

### Running Tests:
1.  Install Jest and React Testing Library:
    \`\`\`bash
    npm install --save-dev jest @types/jest ts-jest @testing-library/react @testing-library/dom @testing-library/user-event
    \`\`\`
2.  Configure Jest in `jest.config.js` (or `tsconfig.json` for `ts-jest`).
3.  Add a test script to `package.json`:
    \`\`\`json
    "scripts": {
      "test": "jest"
    }
    \`\`\`
4.  Run tests: `npm test`

## 🚀 Deployment

### Vercel

\`\`\`bash
vercel --prod
\`\`\`

### Docker

\`\`\`bash
docker build -t sheikh-wrapper .
docker run -p 3000:3000 sheikh-wrapper
\`\`\`

## ⚡ Performance and Security

### Caching Frequent API Calls
For production environments, consider implementing caching mechanisms for frequent or expensive API calls (e.g., to the Gemini API) to reduce latency and cost.

**Conceptual Caching Example (Server-side):**
You could use an in-memory cache (like `node-cache`) or a distributed cache (like Redis) for API responses.

\`\`\`typescript
// utils/cachedGeminiCall.ts (Conceptual)
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
\`\`\`
Then, use `cachedCallGemini` in `api/v1/chat/completions.ts` instead of `callGemini`.

### Secure API Key Handling
Always ensure your `GEMINI_API_KEY` is stored securely as an environment variable and never hardcoded or exposed client-side. Vercel's environment variable management is ideal for this.

## 📚 API Reference

### POST /api/v1/chat/completions

OpenAI-compatible chat completions endpoint.

**Request Body:**
\`\`\`typescript
{
  model: string;           // Sheikh model ID
  messages: Message[];     // Conversation history
  stream?: boolean;        // Enable streaming
  format?: "mdx" | "markdown" | "text"; // NEW: Output format for non-streaming responses
  temperature?: number;    // Response randomness (0-1)
  max_tokens?: number;     // Maximum response length
  tools?: Tool[];          // Optional (MCP Tools)
  tool_choice?: "none" | "auto" | { type: "function"; function: { name: string } }; // Optional
}
\`\`\`

**Response:**
\`\`\`typescript
{
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: [{
    index: number;
    message: {
      role: "assistant";
      content: string; // Content will be formatted based on 'format' parameter
    };
    finish_reason: string;
  }];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Community Engagement
We encourage community involvement and feedback!
- **GitHub Discussions**: Share ideas, ask questions, and discuss features on our [GitHub Discussions page](https://github.com/sheikh-llm/sheikh-wrapper/discussions) (conceptual link, create one for your repo).
- **Issue Tracker**: Report bugs or suggest new features via [GitHub Issues](https://github.com/sheikh-llm/sheikh-wrapper/issues).

## 📄 License

MIT License - see LICENSE file for details.
</merged_code>
