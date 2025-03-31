"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import ChartComponent from "@/components/chart-component"

// Datos de ejemplo para los departamentos
const departments = [
  { id: "1", name: "Ventas", slug: "ventas", description: "Visualización de datos de ventas y marketing" },
  { id: "2", name: "Finanzas", slug: "finanzas", description: "Análisis financiero y contabilidad" },
  { id: "3", name: "Recursos Humanos", slug: "rrhh", description: "Métricas de recursos humanos" },
  { id: "4", name: "Operaciones", slug: "operaciones", description: "Indicadores de operaciones" },
]

// Datos de ejemplo para las gráficas
const chartsByDepartment = {
  ventas: [
    {
      id: "1",
      title: "Ventas Mensuales",
      description: "Ventas mensuales del año actual",
      type: "bar",
      data: [
        { name: "Ene", value: 4200 },
        { name: "Feb", value: 3800 },
        { name: "Mar", value: 5100 },
        { name: "Abr", value: 4800 },
        { name: "May", value: 5600 },
        { name: "Jun", value: 6200 },
      ],
    },
    {
      id: "2",
      title: "Ventas por Categoría",
      description: "Distribución de ventas por categoría de producto",
      type: "pie",
      data: [
        { name: "Electrónicos", value: 35 },
        { name: "Ropa", value: 25 },
        { name: "Hogar", value: 20 },
        { name: "Deportes", value: 15 },
        { name: "Otros", value: 5 },
      ],
    },
    {
      id: "3",
      title: "Tendencia de Ventas",
      description: "Tendencia de ventas de los últimos 12 meses",
      type: "line",
      data: [
        { name: "Jul 22", value: 3200 },
        { name: "Ago 22", value: 3400 },
        { name: "Sep 22", value: 3600 },
        { name: "Oct 22", value: 3800 },
        { name: "Nov 22", value: 4000 },
        { name: "Dic 22", value: 4500 },
        { name: "Ene 23", value: 4200 },
        { name: "Feb 23", value: 3800 },
        { name: "Mar 23", value: 5100 },
        { name: "Abr 23", value: 4800 },
        { name: "May 23", value: 5600 },
        { name: "Jun 23", value: 6200 },
      ],
    },
  ],
  finanzas: [
    {
      id: "4",
      title: "Ingresos vs Gastos",
      description: "Comparación de ingresos y gastos mensuales",
      type: "bar",
      data: [
        { name: "Ene", ingresos: 8500, gastos: 6200 },
        { name: "Feb", ingresos: 7900, gastos: 5800 },
        { name: "Mar", ingresos: 9200, gastos: 6500 },
        { name: "Abr", ingresos: 9800, gastos: 7100 },
        { name: "May", ingresos: 10500, gastos: 7300 },
        { name: "Jun", ingresos: 11200, gastos: 7800 },
      ],
    },
  ],
  rrhh: [
    {
      id: "5",
      title: "Distribución de Personal",
      description: "Distribución del personal por departamento",
      type: "pie",
      data: [
        { name: "Ventas", value: 30 },
        { name: "Desarrollo", value: 25 },
        { name: "Soporte", value: 20 },
        { name: "Administración", value: 15 },
        { name: "Otros", value: 10 },
      ],
    },
  ],
  operaciones: [],
}

export default function DepartmentPage({ params }: { params: { slug: string } }) {
  const [activeTab, setActiveTab] = useState("todas")
  const [department, setDepartment] = useState<any>(null)
  const [charts, setCharts] = useState<any[]>([])

  useEffect(() => {
    // Buscar el departamento por slug
    const dept = departments.find((d) => d.slug === params.slug)
    if (!dept) {
      notFound()
    }

    setDepartment(dept)

    // Obtener las gráficas del departamento
    const deptCharts = chartsByDepartment[params.slug as keyof typeof chartsByDepartment] || []
    setCharts(deptCharts)
  }, [params.slug])

  if (!department) {
    return null // O un componente de carga
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{department.name}</h1>
          <p className="text-gray-600">{department.description}</p>
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
          {charts.length === 0 ? (
            <EmptyState departmentName={department.name} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charts.map((chart) => (
                <ChartCard key={chart.id} chart={chart} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bar" className="mt-0">
          {charts.filter((c) => c.type === "bar").length === 0 ? (
            <EmptyState departmentName={department.name} type="barras" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charts
                .filter((c) => c.type === "bar")
                .map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="line" className="mt-0">
          {charts.filter((c) => c.type === "line").length === 0 ? (
            <EmptyState departmentName={department.name} type="líneas" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charts
                .filter((c) => c.type === "line")
                .map((chart) => (
                  <ChartCard key={chart.id} chart={chart} />
                ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pie" className="mt-0">
          {charts.filter((c) => c.type === "pie").length === 0 ? (
            <EmptyState departmentName={department.name} type="circulares" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charts
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

function EmptyState({ departmentName, type = "gráficas" }: { departmentName: string; type?: string }) {
  return (
    <Card className="w-full p-8 flex flex-col items-center justify-center text-center">
      <h3 className="text-xl font-semibold mb-2">No hay {type} disponibles</h3>
      <p className="text-gray-500 mb-6">
        No se encontraron {type} para el departamento de {departmentName}.
      </p>
      <Link href="/crear">
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>Crear Nueva Gráfica</span>
        </Button>
      </Link>
    </Card>
  )
}

