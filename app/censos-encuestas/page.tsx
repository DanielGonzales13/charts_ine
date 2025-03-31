"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import ChartComponent from "@/components/chart-component"

// Datos de ejemplo para censos y encuestas
const censosEncuestas = [
  {
    id: "1",
    title: "Censo de Población 2018",
    description: "Distribución de la población por grupos de edad",
    type: "pie" as const,
    data: [
      { name: "0-14 años", value: 25.3 },
      { name: "15-29 años", value: 24.8 },
      { name: "30-44 años", value: 21.5 },
      { name: "45-59 años", value: 16.7 },
      { name: "60+ años", value: 11.7 },
    ],
  },
  {
    id: "2",
    title: "Encuesta Nacional de Empleo",
    description: "Tasa de desempleo por trimestre",
    type: "line" as const,
    data: [
      { name: "Q1 2022", value: 5.8 },
      { name: "Q2 2022", value: 5.5 },
      { name: "Q3 2022", value: 5.3 },
      { name: "Q4 2022", value: 5.1 },
      { name: "Q1 2023", value: 5.2 },
      { name: "Q2 2023", value: 5.0 },
      { name: "Q3 2023", value: 4.8 },
      { name: "Q4 2023", value: 4.7 },
    ],
  },
  {
    id: "3",
    title: "Encuesta de Ingresos y Gastos de los Hogares",
    description: "Distribución del gasto por categoría",
    type: "bar" as const,
    data: [
      { name: "Alimentos", value: 34.5 },
      { name: "Vivienda", value: 22.8 },
      { name: "Transporte", value: 15.3 },
      { name: "Educación", value: 8.7 },
      { name: "Salud", value: 7.2 },
      { name: "Vestido", value: 5.8 },
      { name: "Otros", value: 5.7 },
    ],
  },
]

export default function CensosEncuestasPage() {
  const [activeTab, setActiveTab] = useState("todas")

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Censos y Encuestas</h1>
          <p className="text-gray-600">Análisis de datos de censos y encuestas poblacionales</p>
        </div>
        <Link href="/crear" className="mt-4 md:mt-0">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Nueva Gráfica</span>
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="todas" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="bar">Barras</TabsTrigger>
          <TabsTrigger value="line">Líneas</TabsTrigger>
          <TabsTrigger value="pie">Circular</TabsTrigger>
        </TabsList>

        <TabsContent value="todas" className="mt-0">
          {censosEncuestas.length === 0 ? (
            <EmptyState title="No hay censos o encuestas disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {censosEncuestas.map((chart) => (
                <ChartCard key={chart.id} chart={chart} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bar" className="mt-0">
          {censosEncuestas.filter((c) => c.type === "bar").length === 0 ? (
            <EmptyState title="No hay gráficas de barras disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {censosEncuestas
                .filter((c) => c.type === "bar")
                .map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="line" className="mt-0">
          {censosEncuestas.filter((c) => c.type === "line").length === 0 ? (
            <EmptyState title="No hay gráficas de líneas disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {censosEncuestas
                .filter((c) => c.type === "line")
                .map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pie" className="mt-0">
          {censosEncuestas.filter((c) => c.type === "pie").length === 0 ? (
            <EmptyState title="No hay gráficas circulares disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {censosEncuestas
                .filter((c) => c.type === "pie")
                .map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}

function ChartCard({ chart }: { chart: any }) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{chart.title}</CardTitle>
        <CardDescription>{chart.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-64 mb-4">
          <ChartComponent type={chart.type} data={chart.data} />
        </div>
      </CardContent>
    </Card>
  )
}

function EmptyState({ title }: { title: string }) {
  return (
    <Card className="w-full p-8 flex flex-col items-center justify-center text-center">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500 mb-6">No se encontraron gráficas para mostrar.</p>
      <Link href="/crear">
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Crear Nueva Gráfica</span>
        </Button>
      </Link>
    </Card>
  )
}

