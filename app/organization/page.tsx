import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Organization | Minimal Docs Site",
  description: "Information about our organization.",
}

export default function OrganizationPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 pb-20">
      <h1 className="mb-6 text-4xl font-bold">Organization</h1>
      <p className="mb-4 text-xl">Find out more about our organization, our mission, and our team.</p>
      <p className="mb-4">We are committed to transparency and fostering a strong community.</p>
    </main>
  )
}
