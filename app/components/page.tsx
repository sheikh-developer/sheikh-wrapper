import ClientComponents from "./ClientComponents"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Components | Sheikh LLM Docs",
  description: "Explore the reusable UI components in the Sheikh Wrapper system",
}

export default function Components() {
  return <ClientComponents />
}
