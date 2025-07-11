import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function ManagementDashboardPreview() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simplify Your Operations with Our Intuitive Dashboard
            </h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our beautifully designed management interface puts you in control. Monitor performance, manage resources,
              and deploy applications with just a few clicks.
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Real-time performance monitoring</li>
              <li>Effortless resource allocation</li>
              <li>One-click application deployment</li>
              <li>Comprehensive analytics and reporting</li>
            </ul>
          </div>
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl overflow-hidden rounded-lg shadow-xl">
              <CardContent className="p-0">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  width={800}
                  height={400}
                  alt="Management Dashboard Preview"
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
