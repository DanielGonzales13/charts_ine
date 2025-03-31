import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <main className="container mx-auto py-10 px-4">
      <Skeleton className="h-10 w-64 mb-2" />
      <Skeleton className="h-5 w-96 mb-8" />

      <Skeleton className="h-10 w-64 mb-4" />

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full mb-4" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-48" />
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Skeleton className="h-48 w-full mt-8" />
    </main>
  )
}

