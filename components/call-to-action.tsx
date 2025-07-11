import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <section id="contact" className="py-12 md:py-24 lg:py-32 bg-gray-900 text-white text-center">
      <div className="container px-4 md:px-6 space-y-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Ready to Experience True Simplicity and Power?
        </h2>
        <p className="max-w-[800px] mx-auto text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Join countless businesses and developers who trust our performance servers for their critical applications.
          Get started today and transform your infrastructure.
        </p>
        <Button asChild className="px-10 py-4 text-xl bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          <Link href="#">Start Your Free Trial</Link>
        </Button>
      </div>
    </section>
  )
}
