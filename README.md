# Sheikh Wrapper - MCP-Powered LLM System

A production-ready Model Context Protocol (MCP) implementation that wraps Google's Gemini APIs with custom Sheikh-branded models, providing an OpenAI-compatible interface.

## 🚀 Features

- **OpenAI-Compatible API**: Drop-in replacement for OpenAI's chat completions endpoint
- **Custom Sheikh Models**: Three specialized models for different use cases
- **MCP Integration**: Advanced tool calling and memory management
- **Streaming Support**: Real-time response streaming
- **TypeScript**: Full type safety and IntelliSense support

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

## 🏗️ Architecture

\`\`\`
sheikh-wrapper/
├── api/v1/chat/completions.ts    # OpenAI-compatible endpoint
├── models/registry.ts            # Model configuration
├── prompts/                      # System prompts for each model
├── utils/
│   ├── callGemini.ts            # Gemini API abstraction
│   └── loadPrompt.ts            # Prompt loading utility
└── types/schema.ts              # TypeScript definitions
\`\`\`

## 🔌 MCP Integration

The Model Context Protocol layer provides:

- **Tool Routing**: Automatic tool detection and execution
- **Memory Management**: Session-aware context handling  
- **Structured Prompts**: XML/Markdown hybrid prompt system
- **Response Processing**: Intelligent response formatting

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

// tests/integration/chatCompletions.test.ts
import { NextRequest, NextResponse } from 'next/server';
import { POST } from '../../api/v1/chat/completions'; // Assuming POST is exported

// Mock external dependencies like callGemini and loadPrompt
jest.mock('../../utils/callGemini', () => ({
  callGemini: jest.fn(() => Promise.resolve({
    id: 'mock-id',
    object: 'chat.completion',
    choices: [{ message: { content: 'Mock response' } }],
    usage: {}
  })),
}));
jest.mock('../../utils/loadPrompt', () => ({
  loadPrompt: jest.fn(() => Promise.resolve('<system>Mock system prompt</system>')),
}));

describe('/api/v1/chat/completions (POST)', () => {
  it('should return a successful chat completion response', async () => {
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
    expect(data.choices[0].message.content).toBe('Mock response');
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

## 📚 API Reference

### POST /api/v1/chat/completions

OpenAI-compatible chat completions endpoint.

**Request Body:**
\`\`\`typescript
{
  model: string;           // Sheikh model ID
  messages: Message[];     // Conversation history
  stream?: boolean;        // Enable streaming
  temperature?: number;    // Response randomness (0-1)
  max_tokens?: number;     // Maximum response length
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
      content: string;
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

## 📄 License

MIT License - see LICENSE file for details.
