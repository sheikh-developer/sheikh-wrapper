import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
            Powerfully Simple. Unmatched Server Performance.
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Experience the next generation of server solutions designed for speed, reliability, and effortless
            management.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row justify-center">
            <Button asChild className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              <Link href="#features">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-3 text-lg border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md bg-transparent"
            >
              <Link href="#contact">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
