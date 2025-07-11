import type { Metadata } from "next"
import CodeBlock from "@/components/code-block"

export const metadata: Metadata = {
  title: "API Reference | Sheikh LLM Docs",
  description: "Comprehensive API reference for the Sheikh LLM Wrapper's chat completions endpoint.",
}

export default function ApiReferencePage() {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h1>API Reference</h1>
      <p>
        This section provides a comprehensive reference for the Sheikh LLM Wrapper's OpenAI-compatible API endpoint.
        You'll find detailed information about the request and response structures, parameters, and various usage
        examples.
      </p>

      <h2>Base URL</h2>
      <CodeBlock code={`https://your-project.vercel.app/api/v1`} language="plaintext" type="code" />
      <p>
        All API requests should be made to this base URL. Replace <code>your-project.vercel.app</code> with your actual
        deployment URL.
      </p>

      <h2>Endpoint: `POST /v1/chat/completions`</h2>
      <p>
        This endpoint allows you to interact with the Sheikh LLMs for chat completions, supporting both streaming and
        non-streaming responses, and various output formats. It is designed to be compatible with the OpenAI Chat
        Completions API.
      </p>

      <h3>Request Body</h3>
      <p>The request body should be a JSON object with the following properties:</p>
      <CodeBlock
        code={`interface ChatCompletionRequest {
  model: string;           // Sheikh model ID
  messages: Message[];     // Conversation history
  temperature?: number;    // Response randomness (0-1)
  top_p?: number;          // Top-p sampling
  n?: number;              // Number of completions to generate
  stream?: boolean;        // Enable streaming (true for SSE)
  stop?: string | string[];// Up to 4 sequences where the API will stop generating further tokens
  max_tokens?: number;     // Maximum response length
  presence_penalty?: number; // Penalty for new tokens based on their presence in the text so far
  frequency_penalty?: number; // Penalty for new tokens based on their existing frequency
  logit_bias?: Record<string, number>; // Modify the likelihood of specified tokens appearing
  user?: string;           // A unique identifier representing your end-user
  tools?: Tool[];          // Optional (MCP Tools)
  tool_choice?: "none" | "auto" | { type: "function"; function: { name: string } }; // Optional
  format?: "mdx" | "markdown" | "text"; // Custom: Output format for non-streaming
}`}
        language="typescript"
        file="types/schema.ts"
      />

      <h3>Response Body</h3>
      <p>The response body will be a JSON object with the following properties:</p>
      <CodeBlock
        code={`interface ChatCompletionResponse {
  id: string;
  object: "chat.completion";
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}`}
        language="typescript"
        file="types/schema.ts"
      />
      <p>
        For streaming responses (when <code>stream: true</code>), the API will return{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events">
          Server-Sent Events (SSE)
        </a>{" "}
        where each `data:` line contains a JSON object with partial message deltas.
      </p>

      <h3>Examples</h3>

      <h4>1. Basic Text Completion (Non-Streaming, MDX Output)</h4>
      <CodeBlock
        code={`fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-2.5-cog-thinking',
    messages: [
      { role: 'user', content: 'Explain the concept of quantum entanglement in simple terms.' }
    ]
  })
})
.then(response => response.json())
.then(data => {
  console.log(data.choices[0].message.content);
  // Expected output (MDX):
  // "# Quantum Entanglement Explained\\n\\nQuantum entanglement is a bizarre phenomenon..."
})
.catch(error => console.error('Error:', error));`}
        language="javascript"
        type="code"
      />

      <h4>2. Streaming Text Completion</h4>
      <CodeBlock
        code={`fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-1.5-ui',
    messages: [
      { role: 'user', content: 'Generate a simple responsive navigation bar using Tailwind CSS.' }
    ],
    stream: true
  })
})
.then(response => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let result = '';

  function read() {
    reader.read().then(({ done, value }) => {
      if (done) {
        console.log('Stream finished:', result);
        return;
      }
      const chunk = decoder.decode(value, { stream: true });
      chunk.split('\\n').forEach(line => {
        if (line.startsWith('data:')) {
          try {
            const data = JSON.parse(line.substring(5));
            if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
              result += data.choices[0].delta.content;
              // Update UI with data.choices[0].delta.content
              process.stdout.write(data.choices[0].delta.content);
            }
          } catch (e) {
            console.error('Error parsing SSE data:', e, line);
          }
        }
      });
      read();
    }).catch(error => console.error('Stream error:', error));
  }
  read();
})
.catch(error => console.error('Fetch error:', error));`}
        language="javascript"
        type="code"
      />

      <h4>3. Requesting Markdown Format</h4>
      <CodeBlock
        code={`fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-1.5-ui',
    messages: [
      { role: 'user', content: 'Create a simple login form with a "Submit" button.' }
    ],
    format: 'markdown' // Requesting Markdown output
  })
})
.then(response => response.json())
.then(data => {
  console.log(data.choices[0].message.content);
  // Expected output (Markdown, no <Button> tag):
  // "## Login Form\\n\\n- Username: [Input]\\n- Password: [Input]\\n\\nSubmit"
})
.catch(error => console.error('Error:', error));`}
        language="javascript"
        type="code"
      />

      <h4>4. Requesting Plain Text Format</h4>
      <CodeBlock
        code={`fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-2.5-cog-thinking',
    messages: [
      { role: 'user', content: 'Summarize the key differences between classical and quantum computing.' }
    ],
    format: 'text' // Requesting plain text output
  })
})
.then(response => response.json())
.then(data => {
  console.log(data.choices[0].message.content);
  // Expected output (plain text):
  // "Classical computing uses bits that are either 0 or 1. Quantum computing uses qubits that can be 0, 1, or both simultaneously..."
})
.catch(error => console.error('Error:', error));`}
        language="javascript"
        type="code"
      />

      <h4>5. Example with Tool Calls (Conceptual)</h4>
      <CodeBlock
        code={`fetch('/api/v1/chat/completions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'sheikh-2.5-cog-thinking',
    messages: [
      { role: 'user', content: 'What is the weather like in London?' }
    ],
    tools: [
      {
        type: 'function',
        function: {
          name: 'get_current_weather',
          description: 'Get the current weather in a given location',
          parameters: {
            type: 'object',
            properties: {
              location: { type: 'string', description: 'The city and state, e.g. London, UK' },
            },
            required: ['location'],
          },
        },
      },
    ],
    tool_choice: 'auto' // Allow the model to decide if it needs to call the tool
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
  // If the model decides to call the tool, the response might contain:
  // {
  //   "choices": [
  //     {
  //       "message": {
  //         "role": "assistant",
  //         "tool_calls": [
  //           {
  //             "id": "call_abc123",
  //             "type": "function",
  //             "function": {
  //               "name": "get_current_weather",
  //               "arguments": "{\\"location\\": \\"London, UK\\"}"
  //             }
  //           }
  //         ]
  //       },
  //       "finish_reason": "tool_calls"
  //     }
  //   ]
  // }
  // Your client-side logic or server-side MCP would then execute this tool and make a follow-up call.
})
.catch(error => console.error('Error:', error));`}
        language="javascript"
        type="code"
      />

      <p className="mt-8 text-muted-foreground">
        For more details on the underlying types and schemas, refer to the{" "}
        <a href="https://github.com/your-repo/sheikh-llm-docs/blob/main/types/schema.ts" className="underline">
          <code>types/schema.ts</code>
        </a>{" "}
        file in the project.
      </p>
    </div>
  )
}
