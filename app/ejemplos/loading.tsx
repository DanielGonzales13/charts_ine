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
          <Skeleton className="h-[400px] w-full mb-4" />
          <Skeleton className="h-5 w-48 mb-2" />
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>

      <Skeleton className="h-48 w-full mt-8" />
    </main>
  )
}

