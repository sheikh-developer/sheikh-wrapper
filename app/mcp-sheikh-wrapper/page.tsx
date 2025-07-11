import type { Metadata } from "next"
import McpSheikhWrapperClient from "./McpSheikhWrapperClient"

export const metadata: Metadata = {
  title: "MCP Sheikh Wrapper | Documentation",
  description: "Model Context Protocol + OpenAI-compatible API with custom Sheikh LLMs",
}

export default function McpSheikhWrapper() {
  return <McpSheikhWrapperClient />
}
