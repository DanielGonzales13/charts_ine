"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChartPreview from "@/components/chart-preview"

export default function CreateChartPage() {
  const router = useRouter()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [chartType, setChartType] = useState("bar")
  const [department, setDepartment] = useState("")
  const [jsonData, setJsonData] = useState("")
  const [parsedData, setParsedData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Departamentos disponibles
  const departments = [
    { id: "ventas", name: "Ventas" },
    { id: "finanzas", name: "Finanzas" },
    { id: "rrhh", name: "Recursos Humanos" },
    { id: "operaciones", name: "Operaciones" },
  ]

  // Función para validar y parsear los datos JSON
  const validateJsonData = () => {
    try {
      if (!jsonData.trim()) {
        setParsedData([])
        setError(null)
        return
      }

      const data = JSON.parse(jsonData)

      if (!Array.isArray(data)) {
        setError("Los datos deben ser un array de objetos")
        return
      }

      if (data.length === 0) {
        setError("El array no puede estar vacío")
        return
      }

      // Validar estructura según el tipo de gráfica
      if (chartType === "pie") {
        const isValid = data.every(
          (item) => typeof item === "object" && item !== null && "name" in item && "value" in item,
        )

        if (!isValid) {
          setError('Cada objeto debe tener propiedades "name" y "value"')
          return
        }
      } else {
        // Para gráficas de barras y líneas
        const isValid = data.every((item) => typeof item === "object" && item !== null && "name" in item)

        if (!isValid) {
          setError('Cada objeto debe tener al menos una propiedad "name"')
          return
        }
      }

      setParsedData(data)
      setError(null)
    } catch (err) {
      setError("JSON inválido. Verifica la sintaxis.")
    }
  }

  // Cargar datos de ejemplo según el tipo de gráfica
  const loadSampleData = () => {
    let sampleData = []

    if (chartType === "bar") {
      sampleData = [
        { name: "Ene", value: 1200 },
        { name: "Feb", value: 1900 },
        { name: "Mar", value: 1500 },
        { name: "Abr", value: 2200 },
        { name: "May", value: 2500 },
        { name: "Jun", value: 2100 },
      ]
    } else if (chartType === "line") {
      sampleData = [
        { name: "Ene", value: 400 },
        { name: "Feb", value: 600 },
        { name: "Mar", value: 550 },
        { name: "Abr", value: 700 },
        { name: "May", value: 900 },
        { name: "Jun", value: 750 },
        { name: "Jul", value: 1000 },
        { name: "Ago", value: 850 },
      ]
    } else if (chartType === "pie") {
      sampleData = [
        { name: "Producto A", value: 35 },
        { name: "Producto B", value: 25 },
        { name: "Producto C", value: 20 },
        { name: "Producto D", value: 15 },
        { name: "Otros", value: 5 },
      ]
    }

    setJsonData(JSON.stringify(sampleData, null, 2))
    setParsedData(sampleData)
    setError(null)
  }

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !chartType || !department || parsedData.length === 0) {
      return
    }

    setIsSubmitting(true)

    // Simulamos la creación de la gráfica
    setTimeout(() => {
      // En una implementación real, aquí enviarías los datos al servidor
      console.log({
        title,
        description,
        chartType,
        department,
        data: parsedData,
      })

      // Redirigir al usuario a la página del departamento
      router.push(`/departamento/${department}`)
    }, 1000)
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Crear Nueva Gráfica</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Gráfica</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Ventas Mensuales 2023"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Breve descripción de la gráfica"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chartType">Tipo de Gráfica</Label>
                    <Select
                      value={chartType}
                      onValueChange={(value) => {
                        setChartType(value)
                        // Limpiar los datos al cambiar el tipo
                        setJsonData("")
                        setParsedData([])
                      }}
                    >
                      <SelectTrigger id="chartType">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Gráfica de Barras</SelectItem>
                        <SelectItem value="line">Gráfica de Líneas</SelectItem>
                        <SelectItem value="pie">Gráfica Circular</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Selecciona un departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="jsonData">Datos JSON</Label>
                    <Button type="button" variant="outline" size="sm" onClick={loadSampleData}>
                      Cargar datos de ejemplo
                    </Button>
                  </div>
                  <Textarea
                    id="jsonData"
                    value={jsonData}
                    onChange={(e) => {
                      setJsonData(e.target.value)
                      // No validamos en cada cambio para evitar mensajes de error mientras el usuario escribe
                    }}
                    onBlur={validateJsonData}
                    placeholder={`[
  { "name": "Etiqueta1", "value": 100 },
  { "name": "Etiqueta2", "value": 200 }
]`}
                    rows={8}
                    className="font-mono text-sm"
                  />
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.push("/")}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !title || !chartType || !department || parsedData.length === 0}
                  >
                    {isSubmitting ? "Creando..." : "Crear Gráfica"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Vista Previa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mb-4">
                <ChartPreview type={chartType as "bar" | "line" | "pie"} data={parsedData} />
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Formato de Datos</h3>
                <Tabs defaultValue="simple">
                  <TabsList className="mb-2">
                    <TabsTrigger value="simple">Simple</TabsTrigger>
                    <TabsTrigger value="multiple">Múltiples Series</TabsTrigger>
                  </TabsList>
                  <TabsContent value="simple">
                    <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-xs">
                      {`[
  { "name": "Ene", "value": 1200 },
  { "name": "Feb", "value": 1900 },
  { "name": "Mar", "value": 1500 }
]`}
                    </pre>
                  </TabsContent>
                  <TabsContent value="multiple">
                    <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-xs">
                      {`[
  { "name": "Ene", "Serie1": 1200, "Serie2": 900 },
  { "name": "Feb", "Serie1": 1900, "Serie2": 1200 },
  { "name": "Mar", "Serie1": 1500, "Serie2": 1100 }
]`}
                    </pre>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

