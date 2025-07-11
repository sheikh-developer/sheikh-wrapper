import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fiscal Hosting | Minimal Docs Site",
  description: "Learn about our fiscal hosting services.",
}

export default function FiscalHostingPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">Fiscal Hosting</h1>
      <p className="mb-4 text-xl">
        Explore our fiscal hosting solutions, designed to support your projects and initiatives.
      </p>
      <p className="mb-4">We provide the legal and financial infrastructure so you can focus on your mission.</p>
    </main>
  )
}
