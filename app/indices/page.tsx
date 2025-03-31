"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import ChartComponent from "@/components/chart-component"

// Datos de ejemplo para los índices
const indices = [
  {
    id: "1",
    title: "Índice de Precios al Consumidor (IPC)",
    description: "Evolución mensual de los precios al consumidor",
    type: "line" as const,
    data: [
      { name: "Ene 2023", value: 102.5 },
      { name: "Feb 2023", value: 103.1 },
      { name: "Mar 2023", value: 103.8 },
      { name: "Abr 2023", value: 104.2 },
      { name: "May 2023", value: 104.9 },
      { name: "Jun 2023", value: 105.3 },
      { name: "Jul 2023", value: 105.8 },
      { name: "Ago 2023", value: 106.2 },
      { name: "Sep 2023", value: 106.7 },
      { name: "Oct 2023", value: 107.1 },
      { name: "Nov 2023", value: 107.6 },
      { name: "Dic 2023", value: 108.2 },
    ],
  },
  {
    id: "2",
    title: "IPM",
    description: "Evolución trimestral de la producción industrial",
    type: "bar" as const,
    data: [
      { name: "Q1 2022", value: 95.2 },
      { name: "Q2 2022", value: 96.8 },
      { name: "Q3 2022", value: 97.5 },
      { name: "Q4 2022", value: 98.3 },
      { name: "Q1 2023", value: 97.9 },
      { name: "Q2 2023", value: 99.1 },
      { name: "Q3 2023", value: 100.5 },
      { name: "Q4 2023", value: 101.2 },
    ],
  },
  {
    id: "3",
    title: "IPMC",
    description: "Indicador mensual de actividad económica",
    type: "line" as const,
    data: [
      { name: "Ene 2023", value: 99.2 },
      { name: "Feb 2023", value: 99.5 },
      { name: "Mar 2023", value: 100.1 },
      { name: "Abr 2023", value: 100.4 },
      { name: "May 2023", value: 100.8 },
      { name: "Jun 2023", value: 101.2 },
      { name: "Jul 2023", value: 101.5 },
      { name: "Ago 2023", value: 101.9 },
      { name: "Sep 2023", value: 102.3 },
      { name: "Oct 2023", value: 102.7 },
      { name: "Nov 2023", value: 103.1 },
      { name: "Dic 2023", value: 103.5 },
    ],
  },
]

export default function IndicesPage() {
  const [activeTab, setActiveTab] = useState("todas")

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Índices Estadísticos</h1>
          <p className="text-gray-600">Visualización de índices estadísticos y económicos</p>
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
          {indices.length === 0 ? (
            <EmptyState title="No hay índices disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indices.map((chart) => (
                <ChartCard key={chart.id} chart={chart} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bar" className="mt-0">
          {indices.filter((c) => c.type === "bar").length === 0 ? (
            <EmptyState title="No hay gráficas de barras disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indices
                .filter((c) => c.type === "bar")
                .map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="line" className="mt-0">
          {indices.filter((c) => c.type === "line").length === 0 ? (
            <EmptyState title="No hay gráficas de líneas disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indices
                .filter((c) => c.type === "line")
                .map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pie" className="mt-0">
          {indices.filter((c) => c.type === "pie").length === 0 ? (
            <EmptyState title="No hay gráficas circulares disponibles" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {indices
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

