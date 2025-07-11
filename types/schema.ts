// This file defines the TypeScript interfaces for OpenAI-compatible
// chat completion requests and responses, including extensions for tools.

/**
 * Represents a single message in a chat conversation.
 */
export interface ChatCompletionMessage {
  role: "system" | "user" | "assistant" | "tool"
  content: string
  name?: string // Optional: For tool messages, the name of the tool that generated the content.
  tool_calls?: ToolCall[] // Optional: For assistant messages that invoke tools.
  tool_call_id?: string // Optional: For tool messages, the ID of the tool call that this message is responding to.
}

/**
 * Represents a single tool call made by the model.
 */
export interface ToolCall {
  id: string // A unique ID for the tool call.
  type: "function" // The type of the tool call, currently only "function".
  function: {
    name: string // The name of the function to call.
    arguments: string // The arguments to call the function with, as a JSON string.
  }
}

/**
 * Represents the structure of a chat completion request.
 */
export interface ChatCompletionRequest {
  model: string // The ID of the model to use (e.g., "sheikh-1.5-ui").
  messages: ChatCompletionMessage[] // A list of messages comprising the conversation.
  temperature?: number // Optional: Controls randomness (0 to 2).
  top_p?: number // Optional: Nucleus sampling (0 to 1).
  n?: number // Optional: Number of chat completion choices to generate.
  stream?: boolean // Optional: If true, streams partial message deltas.
  stop?: string | string[] // Optional: Up to 4 sequences where the API will stop generating further tokens.
  max_tokens?: number // Optional: Maximum number of tokens to generate.
  presence_penalty?: number // Optional: Penalty for new tokens based on their presence in the text so far.
  frequency_penalty?: number // Optional: Penalty for new tokens based on their existing frequency.
  logit_bias?: Record<string, number> // Optional: Modifies the likelihood of specified tokens appearing.
  user?: string // Optional: A unique identifier representing your end-user.
  tools?: Tool[] // Optional: A list of tools the model may call.
  tool_choice?: "none" | "auto" | { type: "function"; function: { name: string } } // Optional: Controls which (if any) tool is called.
  format?: "mdx" | "markdown" | "text" // Custom: Output format for non-streaming responses.
}

/**
 * Represents a tool definition for the model.
 */
export interface Tool {
  type: "function" // The type of the tool, currently only "function".
  function: {
    name: string // The name of the function.
    description?: string // Optional: A description of the function.
    parameters?: Record<string, any> // Optional: The parameters the function accepts, described as a JSON Schema object.
  }
}

/**
 * Represents a single choice in a chat completion response.
 */
export interface ChatCompletionChoice {
  index: number // The index of the choice in the list of choices.
  message: ChatCompletionMessage // The generated message.
  finish_reason: "stop" | "length" | "tool_calls" | "content_filter" | null // The reason the model stopped generating tokens.
}

/**
 * Represents the structure of a chat completion response.
 */
export interface ChatCompletionResponse {
  id: string // A unique identifier for the chat completion.
  object: "chat.completion" // The object type, always "chat.completion".
  created: number // The Unix timestamp (in seconds) of when the chat completion was created.
  model: string // The model used for the chat completion.
  choices: ChatCompletionChoice[] // A list of chat completion choices.
  usage: {
    prompt_tokens: number // The number of tokens in the prompt.
    completion_tokens: number // The number of tokens in the generated completion.
    total_tokens: number // The total number of tokens used in the request.
  }
}
