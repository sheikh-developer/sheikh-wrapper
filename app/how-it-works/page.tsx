import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "How it Works | Minimal Docs Site",
  description: "Understand the mechanics of our platform.",
}

export default function HowItWorksPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">How it Works</h1>
      <p className="mb-4 text-xl">
        Get a step-by-step guide on how our platform operates, from setup to advanced usage.
      </p>
      <p className="mb-4">
        We aim for simplicity and efficiency, making it easy for you to get started and achieve your goals.
      </p>
    </main>
  )
}
