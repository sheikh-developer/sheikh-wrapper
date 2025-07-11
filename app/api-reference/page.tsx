import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "API Reference | Sheikh Wrapper",
  description: "Comprehensive API reference for the Sheikh Wrapper's chat completions endpoint.",
}

export default function ApiReference() {
  return (
    <main className="max-w-4xl mx-auto px-6 pb-20">
      <h1 className="text-4xl font-bold mb-6">API Reference</h1>
      <p className="text-xl mb-8 text-muted-foreground">
        This section provides a comprehensive reference for the Sheikh Wrapper's OpenAI-compatible API endpoint. You'll
        find detailed information about the request and response structures, parameters, and various usage examples.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Base URL</h2>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`https://your-project.vercel.app/api/v1`}</code>
      </pre>
      <p className="mb-6">
        All API requests should be made to this base URL. Replace `your-project.vercel.app` with your actual deployment
        URL.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Endpoint: `POST /v1/chat/completions`</h2>
      <p className="mb-4">
        This endpoint allows you to interact with the Sheikh LLMs for chat completions, supporting both streaming and
        non-streaming responses, and various output formats. It is designed to be compatible with the OpenAI Chat
        Completions API.
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-3">Request Body</h3>
      <p className="mb-4">The request body should be a JSON object with the following properties:</p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`interface ChatCompletionRequest {
  model: string;
  messages: ChatCompletionMessage[];
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | string[];
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Record<string, number>;
  user?: string;
  tools?: Tool[];
  tool_choice?: "none" | "auto" | { type: "function"; function: { name: string } };
  format?: "mdx" | "markdown" | "text"; // Custom: Output format
}`}</code>
      </pre>

      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          <code className="font-mono">model</code> (string, **required**): The ID of the Sheikh model to use.
          <br />
          **Allowed values**: <code className="font-mono">"sheikh-1.5-ui"</code>,{" "}
          <code className="font-mono">"sheikh-2.5-cog-thinking"</code>,{" "}
          <code className="font-mono">"sheikh-3.0-legacy"</code>.
        </li>
        <li>
          <code className="font-mono">messages</code> (array of objects, **required**): A list of messages comprising
          the conversation history. Each message object must have a <code className="font-mono">role</code> (e.g.,
          "user", "assistant", "system", "tool") and <code className="font-mono">content</code>.
          <pre className="bg-muted p-2 rounded-md mt-2 text-sm">
            <code>{`interface ChatCompletionMessage {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  name?: string; // Required for tool messages
  tool_calls?: ToolCall[]; // For assistant messages that call tools
  tool_call_id?: string; // For tool messages responding to a tool_call
}`}</code>
          </pre>
        </li>
        <li>
          <code className="font-mono">stream</code> (boolean, optional): If <code className="font-mono">true</code>,
          partial message deltas will be sent, like in ChatGPT. Tokens will be sent as data-only server-sent events as
          they become available. Defaults to <code className="font-mono">false</code>.
        </li>
        <li>
          <code className="font-mono">format</code> (string, optional): **Custom parameter**. Specifies the desired
          output format for non-streaming responses.
          <br />
          **Allowed values**: <code className="font-mono">"mdx"</code> (default),{" "}
          <code className="font-mono">"markdown"</code>, <code className="font-mono">"text"</code>.
        </li>
        <li>
          <code className="font-mono">temperature</code> (number, optional): What sampling temperature to use, between 0
          and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more
          focused and deterministic. Defaults to <code className="font-mono">0.7</code>.
        </li>
        <li>
          <code className="font-mono">max_tokens</code> (integer, optional): The maximum number of tokens to generate in
          the chat completion.
        </li>
        <li>
          <code className="font-mono">tools</code> (array of objects, optional): A list of tools the model may call.
          <pre className="bg-muted p-2 rounded-md mt-2 text-sm">
            <code>{`interface Tool {
  type: "function";
  function: {
    name: string;
    description?: string;
    parameters?: Record<string, any>; // JSON Schema
  };
}`}</code>
          </pre>
        </li>
        <li>
          <code className="font-mono">tool_choice</code> (string or object, optional): Controls which (if any) tool is
          called by the model.
          <br />
          <code className="font-mono">"none"</code> means the model will not call a tool and instead generates a
          message.
          <br />
          <code className="font-mono">"auto"</code> means the model can pick between generating a message or calling a
          tool.
          <br />
          Specifying a particular tool via{" "}
          <code className="font-mono">{`{ "type": "function", "function": { "name": "my_tool" } }`}</code> forces the
          model to call that tool.
        </li>
        <li>
          Other parameters like <code className="font-mono">top_p</code>, <code className="font-mono">n</code>,{" "}
          <code className="font-mono">stop</code>, <code className="font-mono">presence_penalty</code>,{" "}
          <code className="font-mono">frequency_penalty</code>, <code className="font-mono">logit_bias</code>, and{" "}
          <code className="font-mono">user</code> are supported for compatibility with OpenAI's API.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">Response Body</h3>
      <p className="mb-4">The response body will be a JSON object with the following properties:</p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`interface ChatCompletionResponse {
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
}`}</code>
      </pre>
      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>
          <code className="font-mono">id</code> (string): A unique identifier for the chat completion.
        </li>
        <li>
          <code className="font-mono">object</code> (string): The object type, which is always{" "}
          <code className="font-mono">"chat.completion"</code>.
        </li>
        <li>
          <code className="font-mono">created</code> (integer): The Unix timestamp (in seconds) of when the chat
          completion was created.
        </li>
        <li>
          <code className="font-mono">model</code> (string): The model used for the chat completion.
        </li>
        <li>
          <code className="font-mono">choices</code> (array of objects): A list of chat completion choices.
          <pre className="bg-muted p-2 rounded-md mt-2 text-sm">
            <code>{`interface ChatCompletionChoice {
  index: number;
  message: ChatCompletionMessage; // The generated message
  finish_reason: "stop" | "length" | "tool_calls" | "content_filter" | null;
}`}</code>
          </pre>
        </li>
        <li>
          <code className="font-mono">usage</code> (object): Usage statistics for the completion request.
          <br />
          <code className="font-mono">prompt_tokens</code>: Number of tokens in the prompt.
          <br />
          <code className="font-mono">completion_tokens</code>: Number of tokens in the generated completion.
          <br />
          <code className="font-mono">total_tokens</code>: Total number of tokens used in the request (prompt +
          completion).
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6 mb-3">Examples</h3>

      <h4 className="text-lg font-semibold mt-4 mb-2">1. Basic Text Completion (Non-Streaming, MDX Output)</h4>
      <p className="mb-2">
        This example demonstrates a simple request for a chat completion, returning the response in MDX format
        (default).
      </p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`fetch('/api/v1/chat/completions', {
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
  // "# Quantum Entanglement Explained\n\nQuantum entanglement is a bizarre phenomenon..."
})
.catch(error => console.error('Error:', error));`}</code>
      </pre>

      <h4 className="text-lg font-semibold mt-4 mb-2">2. Streaming Text Completion</h4>
      <p className="mb-2">
        This example shows how to request a streaming response, useful for real-time chat interfaces.
      </p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`fetch('/api/v1/chat/completions', {
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
      // Each chunk might contain multiple SSE 'data:' lines
      chunk.split('\\n').forEach(line => {
        if (line.startsWith('data:')) {
          try {
            const data = JSON.parse(line.substring(5));
            if (data.choices && data.choices[0].delta && data.choices[0].delta.content) {
              result += data.choices[0].delta.content;
              process.stdout.write(data.choices[0].delta.content); // Or update UI
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
.catch(error => console.error('Fetch error:', error));`}</code>
      </pre>

      <h4 className="text-lg font-semibold mt-4 mb-2">3. Requesting Markdown Format</h4>
      <p className="mb-2">
        Use the custom <code className="font-mono">format</code> parameter to get a pure Markdown output, stripping any
        embedded JSX components.
      </p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`fetch('/api/v1/chat/completions', {
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
  // "## Login Form\n\n- Username: [Input]\n- Password: [Input]\n\nSubmit"
})
.catch(error => console.error('Error:', error));`}</code>
      </pre>

      <h4 className="text-lg font-semibold mt-4 mb-2">4. Requesting Plain Text Format</h4>
      <p className="mb-2">
        Use the <code className="font-mono">format: 'text'</code> parameter to receive a plain text response, free of
        any Markdown or JSX formatting.
      </p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`fetch('/api/v1/chat/completions', {
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
.catch(error => console.error('Error:', error));`}</code>
      </pre>

      <h4 className="text-lg font-semibold mt-4 mb-2">5. Example with Tool Calls (Conceptual)</h4>
      <p className="mb-2">
        While the full tool execution logic is handled by the MCP layer, here's how a request might look if you were to
        define tools for the model to use.
      </p>
      <pre className="bg-muted p-4 rounded-md mb-6">
        <code>{`fetch('/api/v1/chat/completions', {
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
.catch(error => console.error('Error:', error));`}</code>
      </pre>

      <p className="mt-8 text-muted-foreground">
        For more details on the underlying types and schemas, refer to the{" "}
        <code className="font-mono">types/schema.ts</code> file in the project.
      </p>
    </main>
  )
}
