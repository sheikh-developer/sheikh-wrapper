import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product | Minimal Docs Site",
  description: "Learn about our product offerings.",
}

export default function ProductPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">Product</h1>
      <p className="mb-4 text-xl">
        This section provides an overview of our product, its features, and how it can benefit you.
      </p>
      <p className="mb-4">
        We are constantly working to improve and expand our product to meet your needs. Stay tuned for updates!
      </p>
    </main>
  )
}
