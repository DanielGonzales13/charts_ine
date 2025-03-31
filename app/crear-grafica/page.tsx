"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createChart } from "@/lib/api"
import DataSourceSelector from "@/components/data-source-selector"

export default function CreateChartPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const departmentId = searchParams.get("departmentId") || ""

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [chartType, setChartType] = useState("bar")
  const [dataSource, setDataSource] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !chartType || !dataSource) {
      return
    }

    setIsSubmitting(true)

    try {
      const chartId = await createChart({
        title,
        description,
        type: chartType as "bar" | "line" | "pie",
        departmentId,
        dataSource,
      })

      router.push(`/grafica/${chartId}`)
    } catch (error) {
      console.error("Error creating chart:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Crear Nueva Gráfica</h1>

      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chartType">Tipo de Gráfica</Label>
              <Select value={chartType} onValueChange={setChartType}>
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
              <Label>Fuente de Datos</Label>
              <DataSourceSelector departmentId={departmentId} onSelect={setDataSource} selectedValue={dataSource} />
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting || !title || !chartType || !dataSource}>
                {isSubmitting ? "Creando..." : "Crear Gráfica"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

