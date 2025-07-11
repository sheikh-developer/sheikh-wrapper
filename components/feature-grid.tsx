import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Bolt, LayoutDashboard, Scale, ShieldCheck } from "lucide-react"

export default function FeatureGrid() {
  return (
    <section id="features" className="py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features Designed for You</h2>
          <p className="max-w-[900px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Our server solutions are built from the ground up to deliver exceptional performance and unparalleled ease
            of use.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <Bolt className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-semibold">Blazing Fast Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Experience lightning-fast load times and seamless operations with our optimized server infrastructure.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <LayoutDashboard className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-semibold">Intuitive Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Manage your servers with ease using our user-friendly dashboard, no technical expertise required.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <Scale className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-semibold">Effortless Scalability</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Scale your resources up or down instantly to match your growing demands, without any downtime.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="flex flex-col items-center text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-4">
              <ShieldCheck className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle className="text-2xl font-semibold">Ironclad Security</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Your data is protected with advanced security measures, ensuring peace of mind for your operations.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
