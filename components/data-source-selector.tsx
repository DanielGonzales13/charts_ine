"use client"

import { useEffect, useState } from "react"
import { getDataSources } from "@/lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"

interface DataSourceSelectorProps {
  departmentId: string
  onSelect: (sourceId: string) => void
  selectedValue: string
}

interface DataSource {
  id: string
  name: string
  description: string
}

export default function DataSourceSelector({ departmentId, onSelect, selectedValue }: DataSourceSelectorProps) {
  const [dataSources, setDataSources] = useState<DataSource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDataSources = async () => {
      try {
        const sources = await getDataSources(departmentId)
        setDataSources(sources)

        // Auto-select the first data source if none is selected
        if (sources.length > 0 && !selectedValue) {
          onSelect(sources[0].id)
        }
      } catch (error) {
        console.error("Error fetching data sources:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDataSources()
  }, [departmentId, onSelect, selectedValue])

  if (loading) {
    return <Skeleton className="h-10 w-full" />
  }

  if (dataSources.length === 0) {
    return (
      <div className="text-sm text-red-500">
        No hay fuentes de datos disponibles para este departamento. Contacta al administrador para crear una fuente de
        datos.
      </div>
    )
  }

  return (
    <Select value={selectedValue} onValueChange={onSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Selecciona una fuente de datos" />
      </SelectTrigger>
      <SelectContent>
        {dataSources.map((source) => (
          <SelectItem key={source.id} value={source.id}>
            {source.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

