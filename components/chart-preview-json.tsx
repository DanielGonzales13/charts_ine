"use client"

import type React from "react"

import { useState } from "react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Upload, FileJson } from "lucide-react"

interface ChartPreviewJsonProps {
  chartType: "bar" | "line" | "pie"
  defaultData?: any[]
}

export default function ChartPreviewJson({ chartType, defaultData = [] }: ChartPreviewJsonProps) {
  const [data, setData] = useState<any[]>(defaultData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Función para cargar datos desde un archivo JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    setError(null)

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string)

        // Validar que los datos tengan el formato correcto
        if (!Array.isArray(jsonData)) {
          throw new Error("El archivo debe contener un array de objetos")
        }

        setData(jsonData)
        setLoading(false)
      } catch (err) {
        setError("Error al procesar el archivo JSON. Asegúrate de que sea un JSON válido con formato de array.")
        setLoading(false)
      }
    }

    reader.onerror = () => {
      setError("Error al leer el archivo")
      setLoading(false)
    }

    reader.readAsText(file)
  }

  // Cargar datos de ejemplo
  const loadSampleData = () => {
    setLoading(true)

    // Datos de ejemplo según el tipo de gráfica
    setTimeout(() => {
      if (chartType === "bar") {
        setData([
          { name: "Ene", value: 1200 },
          { name: "Feb", value: 1900 },
          { name: "Mar", value: 1500 },
          { name: "Abr", value: 2200 },
          { name: "May", value: 2500 },
          { name: "Jun", value: 2100 },
        ])
      } else if (chartType === "line") {
        setData([
          { name: "Ene", value: 400 },
          { name: "Feb", value: 600 },
          { name: "Mar", value: 550 },
          { name: "Abr", value: 700 },
          { name: "May", value: 900 },
          { name: "Jun", value: 750 },
          { name: "Jul", value: 1000 },
          { name: "Ago", value: 850 },
        ])
      } else if (chartType === "pie") {
        setData([
          { name: "Producto A", value: 35 },
          { name: "Producto B", value: 25 },
          { name: "Producto C", value: 20 },
          { name: "Producto D", value: 15 },
          { name: "Otros", value: 5 },
        ])
      }

      setLoading(false)
    }, 500) // Simulamos una pequeña carga
  }

  // Renderizar la gráfica según el tipo
  const renderChart = () => {
    if (loading) {
      return <Skeleton className="w-full h-full" />
    }

    if (data.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
          <FileJson className="w-12 h-12 text-gray-400" />
          <p>No hay datos para mostrar</p>
          <Button onClick={loadSampleData} variant="outline" size="sm">
            Cargar datos de ejemplo
          </Button>
        </div>
      )
    }

    switch (chartType) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#4f46e5" name="Valor" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4f46e5"
                name="Valor"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#4f46e5"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="h-[300px] mb-4">{renderChart()}</div>

      {error && <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded-md">{error}</div>}

      <div className="flex items-center justify-between mt-auto">
        <div className="text-sm text-gray-500">Formato esperado: [{'"name": "Etiqueta", "value": 100'}, ...]</div>

        <div className="flex space-x-2">
          <Button onClick={loadSampleData} variant="outline" size="sm">
            Datos de ejemplo
          </Button>

          <label className="cursor-pointer">
            <Button variant="default" size="sm" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>Cargar JSON</span>
            </Button>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}

