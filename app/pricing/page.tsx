import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pricing | Minimal Docs Site",
  description: "Explore our flexible pricing plans.",
}

export default function PricingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">Pricing</h1>
      <p className="mb-4 text-xl">Discover our various pricing tiers designed to fit different needs and budgets.</p>
      <p className="mb-4">
        Whether you're an individual, a small team, or a large enterprise, we have a plan that's right for you.
      </p>
    </main>
  )
}
