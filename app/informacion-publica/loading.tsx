import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Skeleton className="h-10 w-[400px] mb-2" />
      <Skeleton className="h-6 w-[500px] mb-8" />

      <div className="border-t border-gray-200 pt-8 mb-8"></div>

      {/* Esqueleto del buscador */}
      <div className="relative mb-6">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <Skeleton className="h-8 w-[300px] mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Skeleton className="h-10 w-[250px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className="border border-gray-200">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-4" />
                <div className="flex justify-end">
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3 pl-8">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex gap-2">
                  <Skeleton className="h-4 w-4 flex-shrink-0" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

