// This utility provides an abstraction layer for calling the Google Gemini API.
// It handles message formatting, system instructions, and both streaming and non-streaming responses.

interface GeminiMessage {
  role: "system" | "user" | "assistant"
  content: string
}

interface GeminiPayload {
  model: string
  messages: GeminiMessage[]
  stream: boolean // Indicates whether to stream the response
}

// The `callGemini` function sends a request to the Gemini API.
// It returns a ReadableStream for streaming responses or a JSON object for non-streaming.
export async function callGemini(payload: GeminiPayload): Promise<ReadableStream | any> {
  const { model, messages, stream } = payload

  // Filter out system messages and format user/assistant messages for Gemini's `contents` array.
  const geminiMessages = messages
    .filter((msg) => msg.role !== "system")
    .map((msg) => ({
      role: msg.role === "user" ? "user" : "model", // Map 'user' to 'user', 'assistant' to 'model'
      parts: [{ text: msg.content }],
    }))

  // Extract the system prompt from the messages, if present.
  const systemPrompt = messages.find((msg) => msg.role === "system")?.content || ""

  // Construct the payload for the Gemini API request.
  const geminiPayload = {
    contents: geminiMessages,
    // Include system instructions if a system prompt is provided.
    systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
    generationConfig: {
      temperature: 0.7, // Controls randomness of the response
      topK: 40, // Top-k sampling
      topP: 0.95, // Top-p sampling
      maxOutputTokens: 8192, // Maximum number of tokens in the response
    },
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
    body: JSON.stringify(geminiPayload),
  })

  // Handle non-OK HTTP responses from the Gemini API.
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: response.statusText }))
    throw new Error(`Gemini API error: ${response.status} - ${errorData.message || JSON.stringify(errorData)}`)
  }

  // If streaming is requested, return the raw ReadableStream from the response body.
  if (stream) {
    return response.body
  } else {
    // If not streaming, parse the JSON response and format it to be OpenAI-compatible.
    const data = await response.json()
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
            content: data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated", // Extract content
          },
          finish_reason: "stop", // Standard finish reason
        },
      ],
      usage: {
        prompt_tokens: 0, // Placeholder, actual token usage would require parsing Gemini's response
        completion_tokens: 0,
        total_tokens: 0,
      },
    }
  }
}
