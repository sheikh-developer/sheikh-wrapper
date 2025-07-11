import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Help & Support | Minimal Docs Site",
  description: "Get assistance and find answers to your questions.",
}

export default function HelpSupportPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">Help & Support</h1>
      <p className="mb-4 text-xl">Access our comprehensive help resources, FAQs, and contact options for support.</p>
      <p className="mb-4">Our team is here to assist you with any questions or issues you may encounter.</p>
    </main>
  )
}
