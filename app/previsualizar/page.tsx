"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"
import ChartPreview from "@/components/chart-preview"

export default function PreviewPage() {
  const [activeTab, setActiveTab] = useState("bar")
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  // Función para cargar datos desde un archivo JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

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
      } catch (err) {
        setError("Error al procesar el archivo JSON. Asegúrate de que sea un JSON válido con formato de array.")
      }
    }

    reader.onerror = () => {
      setError("Error al leer el archivo")
    }

    reader.readAsText(file)
  }

  // Función para cargar datos de ejemplo
  const loadSampleData = () => {
    if (activeTab === "bar") {
      setData([
        { name: "Ene", value: 1200 },
        { name: "Feb", value: 1900 },
        { name: "Mar", value: 1500 },
        { name: "Abr", value: 2200 },
        { name: "May", value: 2500 },
        { name: "Jun", value: 2100 },
      ])
    } else if (activeTab === "line") {
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
    } else if (activeTab === "pie") {
      setData([
        { name: "Producto A", value: 35 },
        { name: "Producto B", value: 25 },
        { name: "Producto C", value: 20 },
        { name: "Producto D", value: 15 },
        { name: "Otros", value: 5 },
      ])
    }
  }

  // Función para descargar plantilla JSON
  const downloadTemplate = () => {
    let templateData: any[] = []

    if (activeTab === "bar" || activeTab === "line") {
      templateData = [
        { name: "Ene", value: 1000 },
        { name: "Feb", value: 1500 },
        { name: "Mar", value: 1200 },
        { name: "Abr", value: 1800 },
        { name: "May", value: 2000 },
      ]
    } else if (activeTab === "pie") {
      templateData = [
        { name: "Categoría A", value: 30 },
        { name: "Categoría B", value: 25 },
        { name: "Categoría C", value: 20 },
        { name: "Categoría D", value: 15 },
        { name: "Otros", value: 10 },
      ]
    }

    const jsonString = JSON.stringify(templateData, null, 2)
    const blob = new Blob([jsonString], { type: "application/json" })
    const url = URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = `plantilla-${activeTab}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Previsualización de Gráficas</h1>
      <p className="text-gray-600 mb-8">
        Carga un archivo JSON para previsualizar cómo se verán tus gráficas con tus datos.
      </p>

      <Tabs defaultValue="bar" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="bar">Gráfica de Barras</TabsTrigger>
            <TabsTrigger value="line">Gráfica de Líneas</TabsTrigger>
            <TabsTrigger value="pie">Gráfica Circular</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" onClick={downloadTemplate} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Descargar Plantilla</span>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "bar" && "Previsualización - Gráfica de Barras"}
              {activeTab === "line" && "Previsualización - Gráfica de Líneas"}
              {activeTab === "pie" && "Previsualización - Gráfica Circular"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] mb-4">
              <ChartPreview type={activeTab as "bar" | "line" | "pie"} data={data} />
            </div>

            {error && <div className="text-red-500 text-sm mb-4 p-2 bg-red-50 rounded-md">{error}</div>}

            <div className="flex items-center justify-between mt-4">
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
          </CardContent>
        </Card>
      </Tabs>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Formato de Datos JSON</h2>
        <p className="mb-2">
          Para que tus datos se visualicen correctamente, tu archivo JSON debe seguir este formato:
        </p>
        <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm">
          {`[
  { "name": "Etiqueta1", "value": 100 },
  { "name": "Etiqueta2", "value": 200 },
  { "name": "Etiqueta3", "value": 300 }
]`}
        </pre>
        <p className="mt-2 text-sm text-gray-600">
          Puedes descargar una plantilla para cada tipo de gráfica usando el botón "Descargar Plantilla".
        </p>
      </div>
    </main>
  )
}

