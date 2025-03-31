"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ChartPreview from "@/components/chart-preview"

interface Chart {
  id: string
  title: string
  description: string
  type: "bar" | "line" | "pie"
  createdAt: string
}

interface ChartListProps {
  charts: Chart[]
  departmentId: string
}

export default function ChartList({ charts, departmentId }: ChartListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gráficas</h2>
        <Link href={`/crear-grafica?departmentId=${departmentId}`}>
          <Button>Nueva Gráfica</Button>
        </Link>
      </div>

      {charts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">No hay gráficas disponibles para este departamento.</p>
          <Link href={`/crear-grafica?departmentId=${departmentId}`}>
            <Button>Crear Primera Gráfica</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {charts.map((chart) => (
            <Card key={chart.id}>
              <CardHeader>
                <CardTitle>{chart.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-4">
                  <ChartPreview chartId={chart.id} type={chart.type} />
                </div>
                <p className="text-sm text-gray-500 mb-4">{chart.description}</p>
                <div className="flex justify-end">
                  <Link href={`/grafica/${chart.id}`}>
                    <Button variant="outline">Ver Detalles</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

