"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText } from "lucide-react"
import Link from "next/link"

export default function PublicacionesPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Publicaciones</h1>
          <p className="text-gray-600">Documentos, informes y publicaciones oficiales del INE</p>
        </div>
        <Link href="/crear" className="mt-4 md:mt-0">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Nueva Gráfica</span>
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Publicación 1 */}
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Boletín Estadístico 2023
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-600 mb-4">
              Resumen de los principales indicadores estadísticos del país durante el año 2023.
            </p>
            <p className="text-sm text-gray-500 mb-4">Publicado: 15 de enero de 2023</p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                Descargar PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Publicación 2 */}
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Informe ENEIC 2023
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-600 mb-4">
              Resultados de la Encuesta Nacional de Egresos e Ingresos Continua (ENEIC) del año 2023.
            </p>
            <p className="text-sm text-gray-500 mb-4">Publicado: 10 de marzo de 2023</p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                Descargar PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Publicación 3 */}
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Análisis del IPC 2023
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <p className="text-gray-600 mb-4">
              Análisis detallado del comportamiento del Índice de Precios al Consumidor durante el año 2023.
            </p>
            <p className="text-sm text-gray-500 mb-4">Publicado: 5 de febrero de 2023</p>
            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                Descargar PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

