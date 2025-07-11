import { NextResponse } from "next/server"
// Assuming these utilities and types exist from previous context
// In a real project, these would be in your project's root or lib folder
import { sheikhModels } from "@/models/registry" // Adjust path as needed
import { loadPrompt } from "@/utils/loadPrompt" // Adjust path as needed
import { callGemini } from "@/utils/callGemini" // Adjust path as needed
import { convertToMarkdown, extractText } from "@/utils/mdxFormatter" // Adjust path as needed
import type { ChatCompletionRequest, ChatCompletionMessage } from "@/types/schema" // Adjust path as needed

// Mock data for demonstration purposes. In a real app, this would come from a database or external service.
const mockToolOutput = {
  get_current_weather: {
    location: "London, UK",
    temperature: "15°C",
    unit: "celsius",
    description: "Partly cloudy",
  },
}

export async function POST(request: Request) {
  try {
    const body: ChatCompletionRequest = await request.json()
    const { model, messages, stream = false, format, tools, tool_choice } = body

    // 1. Input Validation
    if (!model || !messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request: 'model' and 'messages' are required." }, { status: 400 })
    }

    const config = sheikhModels[model as keyof typeof sheikhModels]
    if (!config) {
      return NextResponse.json({ error: `Invalid model ID: ${model}` }, { status: 400 })
    }

    // 2. Load System Prompt (MCP-like behavior)
    const systemPrompt = await loadPrompt(config.promptFile)

    // 3. Prepare Messages for LLM (including system prompt)
    const messagesForGemini: ChatCompletionMessage[] = [{ role: "system", content: systemPrompt }, ...messages]

    // 4. Call LLM (Gemini Proxy Layer)
    const geminiPayload = {
      model: config.model,
      messages: messagesForGemini,
      stream,
      // Pass tools and tool_choice to the underlying LLM call if supported
      tools: tools,
      tool_choice: tool_choice,
    }

    const geminiResponse = await callGemini(geminiPayload)

    // 5. Handle Streaming vs. Non-Streaming Responses
    if (stream) {
      // For streaming, return the raw ReadableStream
      return new Response(geminiResponse as ReadableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    } else {
      // For non-streaming, process the full response
      const responseData = geminiResponse

      // 6. MCP: Handle Tool Calls (Conceptual)
      // In a real MCP, this would involve more complex state management and re-calling the LLM
      // after tool execution. This is a simplified mock.
      const firstChoice = responseData.choices?.[0]
      if (firstChoice?.finish_reason === "tool_calls" && firstChoice.message?.tool_calls) {
        const toolCalls = firstChoice.message.tool_calls
        const toolOutputs: ChatCompletionMessage[] = []

        for (const toolCall of toolCalls) {
          const toolName = toolCall.function.name
          // Mock tool execution
          const output = mockToolOutput[toolName as keyof typeof mockToolOutput] || {
            error: "Tool not found or failed",
          }
          toolOutputs.push({
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(output),
          })
        }

        // For simplicity, we'll just return the tool call and its mock output.
        // In a full MCP, you'd re-call Gemini with the tool outputs appended to messages.
        responseData.choices[0].message.content = `Tool calls detected: ${JSON.stringify(toolCalls)}. Mock output: ${JSON.stringify(toolOutputs)}`
        responseData.choices[0].finish_reason = "stop" // Change finish reason as we're not re-calling LLM
      }

      // 7. Apply Output Formatting
      let content = responseData.choices?.[0]?.message?.content || ""
      if (format === "markdown") {
        content = convertToMarkdown(content)
      } else if (format === "text") {
        content = extractText(content)
      }
      responseData.choices[0].message.content = content

      return NextResponse.json(responseData)
    }
  } catch (error: any) {
    console.error("Error in chat completions API:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}

// For simple GET requests (e.g., for testing from browser)
export async function GET(request: Request) {
  const url = new URL(request.url)
  const model = url.searchParams.get("model") || "sheikh-1.5-ui"
  const messageContent = url.searchParams.get("message") || "Hello, how are you?"
  const stream = url.searchParams.get("stream") === "true"
  const format = url.searchParams.get("format")

  const mockRequest: ChatCompletionRequest = {
    model,
    messages: [{ role: "user", content: messageContent }],
    stream,
    format,
  }

  // Re-use the POST logic for GET requests for consistency
  const response = await POST(
    new Request(request.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockRequest),
    }),
  )

  return response
}
