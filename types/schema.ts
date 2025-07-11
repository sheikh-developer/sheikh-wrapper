export interface ChatCompletionMessage {
  role: "system" | "user" | "assistant" | "tool"
  content: string
  name?: string
  tool_calls?: ToolCall[]
  tool_call_id?: string
}

export interface ToolCall {
  id: string
  type: "function"
  function: {
    name: string
    arguments: string
  }
}

export interface ChatCompletionRequest {
  model: string
  messages: ChatCompletionMessage[]
  temperature?: number
  top_p?: number
  n?: number
  stream?: boolean
  stop?: string | string[]
  max_tokens?: number
  presence_penalty?: number
  frequency_penalty?: number
  logit_bias?: Record<string, number>
  user?: string
  tools?: Tool[]
  tool_choice?: "none" | "auto" | { type: "function"; function: { name: string } }
}

export interface Tool {
  type: "function"
  function: {
    name: string
    description?: string
    parameters?: Record<string, any>
  }
}

export interface ChatCompletionResponse {
  id: string
  object: "chat.completion"
  created: number
  model: string
  choices: ChatCompletionChoice[]
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

export interface ChatCompletionChoice {
  index: number
  message: ChatCompletionMessage
  finish_reason: "stop" | "length" | "tool_calls" | "content_filter" | null
}
