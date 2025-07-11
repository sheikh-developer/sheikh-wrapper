// This utility provides an abstraction layer for calling the Google Gemini API.
// It handles message formatting, system instructions, and both streaming and non-streaming responses.

interface GeminiMessagePart {
  text: string
}

interface GeminiContent {
  role: "user" | "model" | "tool"
  parts: GeminiMessagePart[]
}

interface GeminiSystemInstruction {
  parts: GeminiMessagePart[]
}

interface GeminiPayload {
  model: string
  messages: ChatCompletionMessage[] // Using ChatCompletionMessage from schema.ts
  stream: boolean
  tools?: Tool[] // Pass tools from ChatCompletionRequest
  tool_choice?: "none" | "auto" | { type: "function"; function: { name: string } } // Pass tool_choice
}

// Assuming ChatCompletionMessage and Tool types are imported or defined elsewhere
import type {
  ChatCompletionMessage,
  Tool,
  ChatCompletionResponse,
  ToolCall,
  ChatCompletionChoice,
} from "@/types/schema"

// The `callGemini` function sends a request to the Gemini API.
// It returns a ReadableStream for streaming responses or a JSON object for non-streaming.
export async function callGemini(payload: GeminiPayload): Promise<ReadableStream | ChatCompletionResponse> {
  const { model, messages, stream, tools, tool_choice } = payload

  // Filter out system messages and format user/assistant messages for Gemini's `contents` array.
  const geminiContents: GeminiContent[] = messages
    .filter((msg) => msg.role !== "system")
    .map((msg) => {
      if (msg.role === "user") {
        return { role: "user", parts: [{ text: msg.content }] }
      } else if (msg.role === "assistant") {
        // Handle assistant messages that might include tool_calls
        if (msg.tool_calls && msg.tool_calls.length > 0) {
          return {
            role: "model",
            parts: [
              {
                functionCall: {
                  name: msg.tool_calls[0].function.name, // Assuming one tool call for simplicity
                  args: JSON.parse(msg.tool_calls[0].function.arguments),
                },
              },
            ],
          }
        }
        return { role: "model", parts: [{ text: msg.content }] }
      } else if (msg.role === "tool" && msg.tool_call_id) {
        // Handle tool messages (tool outputs)
        return {
          role: "tool",
          parts: [
            {
              functionResponse: {
                name:
                  messages.find((m) => m.role === "assistant" && m.tool_calls?.[0]?.id === msg.tool_call_id)
                    ?.tool_calls?.[0]?.function.name || "unknown_tool", // Infer tool name
                response: JSON.parse(msg.content),
              },
            },
          ],
        }
      }
      return { role: "user", parts: [{ text: msg.content }] } // Fallback for unexpected roles
    })

  // Extract the system prompt from the messages, if present.
  const systemPromptContent = messages.find((msg) => msg.role === "system")?.content || ""
  const systemInstruction: GeminiSystemInstruction | undefined = systemPromptContent
    ? { parts: [{ text: systemPromptContent }] }
    : undefined

  // Construct the payload for the Gemini API request.
  const geminiRequestPayload: any = {
    contents: geminiContents,
    systemInstruction: systemInstruction,
    generationConfig: {
      temperature: 0.7, // Controls randomness of the response
      topK: 40, // Top-k sampling
      topP: 0.95, // Top-p sampling
      maxOutputTokens: 8192, // Maximum number of tokens in the response
    },
  }

  // Add tools to the payload if provided
  if (tools && tools.length > 0) {
    geminiRequestPayload.tools = tools.map((tool) => ({
      functionDeclarations: [
        {
          name: tool.function.name,
          description: tool.function.description,
          parameters: tool.function.parameters,
        },
      ],
    }))
  }

  // Handle tool_choice (Gemini's API might have a different structure for this)
  if (tool_choice) {
    // This is a simplified mapping. Gemini's tool_choice might be more nuanced.
    if (tool_choice === "none") {
      geminiRequestPayload.tool_config = { mode: "NONE" }
    } else if (tool_choice === "auto") {
      geminiRequestPayload.tool_config = { mode: "AUTO" }
    } else if (typeof tool_choice === "object" && tool_choice.type === "function") {
      geminiRequestPayload.tool_config = {
        mode: "ANY", // Or specific tool mode if Gemini supports it
        allowedFunctionNames: [tool_choice.function.name],
      }
    }
  }

  // Retrieve the Gemini API key from environment variables.
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is required")
  }

  // Determine the API endpoint based on whether streaming is requested.
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:${stream ? "streamGenerateContent" : "generateContent"}?key=${apiKey}`

  // Send the request to the Gemini API.
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(geminiRequestPayload),
  })

  // Handle non-OK HTTP responses from the Gemini API.
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(`Gemini API error: ${response.status} - ${errorData.message || JSON.stringify(errorData)}`)
  }

  // If streaming is requested, return the raw ReadableStream from the response body.
  if (stream) {
    return response.body as ReadableStream
  } else {
    // If not streaming, parse the JSON response and format it to be OpenAI-compatible.
    const data = await response.json()

    const firstCandidate = data.candidates?.[0]
    let content = "No response generated"
    let finishReason: ChatCompletionChoice["finish_reason"] = "stop"
    let toolCalls: ToolCall[] | undefined

    if (firstCandidate?.content?.parts?.[0]?.text) {
      content = firstCandidate.content.parts[0].text
    } else if (firstCandidate?.content?.parts?.[0]?.functionCall) {
      // Handle function calls from Gemini
      const funcCall = firstCandidate.content.parts[0].functionCall
      toolCalls = [
        {
          id: `call_${Date.now()}`, // Mock ID
          type: "function",
          function: {
            name: funcCall.name,
            arguments: JSON.stringify(funcCall.args),
          },
        },
      ]
      finishReason = "tool_calls"
      content = "" // Content is empty if tool_calls are present
    }

    return {
      id: `chatcmpl-${Date.now()}`, // Unique ID for the completion
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000), // Timestamp
      model: payload.model,
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: content,
            ...(toolCalls && { tool_calls: toolCalls }),
          },
          finish_reason: finishReason,
        },
      ],
      usage: {
        prompt_tokens: 0, // Placeholder, actual token usage would require parsing Gemini's response
        completion_tokens: 0,
        total_tokens: 0,
      },
    } as ChatCompletionResponse
  }
}
