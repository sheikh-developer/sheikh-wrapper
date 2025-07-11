import { POST, GET } from "@/api/v1/chat/completions"
import { NextRequest } from "next/server"
import { loadPrompt } from "@/utils/loadPrompt"
import { callGemini } from "@/utils/callGemini"
import jest from "jest" // Declare the jest variable

// Mock external dependencies
jest.mock("@/models/registry", () => ({
  sheikhModels: {
    "sheikh-1.5-ui": { model: "gemini-1.5-flash", promptFile: "sheikh-1.5-ui.md" },
    "sheikh-2.5-cog-thinking": { model: "gemini-1.5-pro", promptFile: "sheikh-2.5-cog-thinking.md" },
  },
}))

jest.mock("@/utils/loadPrompt", () => ({
  loadPrompt: jest.fn((file: string) => Promise.resolve(`<system>Mock system prompt for ${file}</system>`)),
}))

jest.mock("@/utils/callGemini", () => ({
  callGemini: jest.fn((payload: any) => {
    if (payload.stream) {
      // Mock a ReadableStream for streaming tests
      const encoder = new TextEncoder()
      let counter = 0
      const stream = new ReadableStream({
        start(controller) {
          const interval = setInterval(() => {
            if (counter < 3) {
              const chunk = {
                choices: [{ delta: { content: `chunk ${counter + 1} ` } }],
              }
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`))
              counter++
            } else {
              controller.close()
              clearInterval(interval)
            }
          }, 10)
        },
      })
      return Promise.resolve(stream)
    } else {
      // Mock a non-streaming response
      return Promise.resolve({
        id: "mock-id",
        object: "chat.completion",
        created: Date.now(),
        model: payload.model,
        choices: [
          {
            index: 0,
            message: {
              role: "assistant",
              content: `# Mock response from ${payload.model}\n<Button>Test</Button>`,
            },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 10, completion_tokens: 20, total_tokens: 30 },
      })
    }
  }),
}))

describe("/api/v1/chat/completions (POST)", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return a successful chat completion response (MDX default)", async () => {
    const mockRequest = new NextRequest("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sheikh-1.5-ui",
        messages: [{ role: "user", content: "Hello" }],
      }),
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.choices[0].message.content).toBe("# Mock response from gemini-1.5-flash\n<Button>Test</Button>")
    expect(loadPrompt).toHaveBeenCalledWith("sheikh-1.5-ui.md")
    expect(callGemini).toHaveBeenCalledTimes(1)
  })

  it("should return a successful chat completion response (Markdown format)", async () => {
    const mockRequest = new NextRequest("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sheikh-1.5-ui",
        messages: [{ role: "user", content: "Hello" }],
        format: "markdown",
      }),
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.choices[0].message.content).toBe("# Mock response from gemini-1.5-flash\nTest") // JSX stripped
  })

  it("should return a successful chat completion response (Text format)", async () => {
    const mockRequest = new NextRequest("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sheikh-1.5-ui",
        messages: [{ role: "user", content: "Hello" }],
        format: "text",
      }),
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.choices[0].message.content).toBe("Mock response from gemini-1.5-flashTest") // All formatting stripped
  })

  it("should return 400 for invalid model ID", async () => {
    const mockRequest = new NextRequest("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "invalid-model",
        messages: [{ role: "user", content: "Hello" }],
      }),
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe("Invalid model ID: invalid-model")
  })

  it("should return 400 for missing messages", async () => {
    const mockRequest = new NextRequest("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sheikh-1.5-ui",
      }),
    })

    const response = await POST(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe("Invalid request: 'model' and 'messages' are required.")
  })

  it("should handle streaming response", async () => {
    const mockRequest = new NextRequest("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sheikh-1.5-ui",
        messages: [{ role: "user", content: "Stream me a response" }],
        stream: true,
      }),
    })

    const response = await POST(mockRequest)

    expect(response.status).toBe(200)
    expect(response.headers.get("Content-Type")).toBe("text/event-stream")
    expect(response.body).toBeInstanceOf(ReadableStream)

    // Read the stream to verify content
    const reader = response.body!.getReader()
    const decoder = new TextDecoder()
    let receivedContent = ""
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      receivedContent += decoder.decode(value)
    }
    expect(receivedContent).toContain('data: {"choices":[{"delta":{"content":"chunk 1 "}}]}')
    expect(receivedContent).toContain('data: {"choices":[{"delta":{"content":"chunk 2 "}}]}')
    expect(receivedContent).toContain('data: {"choices":[{"delta":{"content":"chunk 3 "}}]}')
  })
})

describe("/api/v1/chat/completions (GET)", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should return a successful chat completion response for GET requests", async () => {
    const mockRequest = new NextRequest("http://localhost/api/v1/chat/completions?model=sheikh-1.5-ui&message=Hello", {
      method: "GET",
    })

    const response = await GET(mockRequest)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.choices[0].message.content).toBe("# Mock response from gemini-1.5-flash\n<Button>Test</Button>")
    expect(loadPrompt).toHaveBeenCalledWith("sheikh-1.5-ui.md")
    expect(callGemini).toHaveBeenCalledTimes(1)
  })

  it("should handle streaming for GET requests", async () => {
    const mockRequest = new NextRequest(
      "http://localhost/api/v1/chat/completions?model=sheikh-1.5-ui&message=Stream&stream=true",
      {
        method: "GET",
      },
    )

    const response = await GET(mockRequest)

    expect(response.status).toBe(200)
    expect(response.headers.get("Content-Type")).toBe("text/event-stream")
    expect(response.body).toBeInstanceOf(ReadableStream)
  })
})
