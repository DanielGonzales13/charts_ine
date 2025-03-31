import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Loading() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Skeleton className="h-10 w-[200px] mb-2" />
      <Skeleton className="h-5 w-full max-w-2xl mb-8" />

      {/* Tabs principales */}
      <Tabs defaultValue="delegaciones">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="delegaciones" className="text-base py-3">
            Delegaciones
          </TabsTrigger>
          <TabsTrigger value="empleo" className="text-base py-3">
            Trabaja con nosotros
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Buscador */}
      <Skeleton className="h-12 w-full mb-8" />

      {/* Tabs de categorías */}
      <Tabs defaultValue="capital">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="capital" className="text-base py-3">
            Delegación en la Capital
          </TabsTrigger>
          <TabsTrigger value="departamentos" className="text-base py-3">
            Delegaciones Departamentales
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Tarjetas de delegaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <Card key={i} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="w-full md:w-1/3 h-48" />
              <div className="p-4 md:p-6 flex-1">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-2/3 mb-3" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <Skeleton className="h-4 w-1/2 mb-4" />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-9 w-28" />
                  <Skeleton className="h-9 w-28" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Esqueleto para el formulario de empleo */}
      <div className="hidden">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-64 mb-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información de contacto general */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Skeleton className="h-10 w-10 rounded-full mb-4" />
                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-4 w-36" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

