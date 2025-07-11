// This file handles the OpenAI-compatible chat completions API endpoint.
// It acts as a proxy, routing requests to the appropriate Sheikh model and then to the Gemini API.

// Import necessary modules from Next.js server, model registry, and utility functions.
import { NextResponse } from "next/server"
import { sheikhModels } from "../../../../models/registry"
import { loadPrompt } from "../../../../utils/loadPrompt"
import { callGemini } from "../../../../utils/callGemini"
import { convertToMarkdown, extractText } from "../../../../utils/mdxFormatter" // Import new formatter functions

// Define the GET handler for the API route. This is a standard Next.js App Router convention for API routes.
// The `request` object contains information about the incoming HTTP request.
export async function GET(request: Request) {
  // For simplicity, this example uses GET, but typically chat completions are POST requests.
  // We'll adapt the logic to handle the expected `model`, `messages`, and `stream` from a request body.
  // In a real-world scenario, you'd parse `req.json()` for POST requests.
  const url = new URL(request.url)
  const model = url.searchParams.get("model") || "sheikh-1.5-ui" // Default model
  const messageContent = url.searchParams.get("message") || "Hello, how are you?"
  const stream = url.searchParams.get("stream") === "true"
  const format = url.searchParams.get("format") // New: 'markdown' or 'text'

  const messages = [{ role: "user", content: messageContent }]

  // Retrieve the configuration for the requested model from the registry.
  const config = sheikhModels[model as keyof typeof sheikhModels]
  // If the model ID is invalid, return a 400 Bad Request response.
  if (!config) {
    return NextResponse.json({ error: "Invalid model ID." }, { status: 400 })
  }

  try {
    // Load the system prompt associated with the selected model.
    const systemPrompt = await loadPrompt(config.promptFile)
    // Prepare the payload for the Gemini API call, including the system prompt and user messages.
    const payload = {
      model: config.model,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream,
    }

    // Call the Gemini API using the abstraction layer.
    const geminiResponse = await callGemini(payload)

    // If streaming is requested, return the ReadableStream directly.
    if (stream) {
      return new Response(geminiResponse as ReadableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    } else {
      // If not streaming, parse the JSON response and format it to be OpenAI-compatible.
      const responseData = geminiResponse
      let content = responseData.choices?.[0]?.message?.content || ""

      // Apply formatting if requested and not streaming
      if (format === "markdown") {
        content = convertToMarkdown(content)
      } else if (format === "text") {
        content = extractText(content)
      }
      responseData.choices[0].message.content = content

      return NextResponse.json(responseData)
    }
  } catch (error: any) {
    // Log and return an error response if anything goes wrong during the process.
    console.error("Error in chat completions API:", error)
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
  }
}

// For POST requests (more typical for chat completions), you would define a POST handler:
export async function POST(request: Request) {
  const { model, messages, stream = false, format } = await request.json() // New: 'format' parameter

  const config = sheikhModels[model as keyof typeof sheikhModels]
  if (!config) {
    return NextResponse.json({ error: "Invalid model ID." }, { status: 400 })
  }

  try {
    const systemPrompt = await loadPrompt(config.promptFile)
    const payload = {
      model: config.model,
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream,
    }

    const geminiResponse = await callGemini(payload)

    if (stream) {
      return new Response(geminiResponse as ReadableStream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      })
    } else {
      const responseData = geminiResponse
      let content = responseData.choices?.[0]?.message?.content || ""

      // Apply formatting if requested and not streaming
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
