"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Importar el mapa dinámicamente para evitar errores de SSR
const DynamicGuatemalaMap = dynamic(() => import("@/components/guatemala-map").then((mod) => mod.GuatemalaMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
      <p className="text-gray-500">Cargando mapa...</p>
    </div>
  ),
})

export function DynamicGuatemalaMapWrapper() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Cargando mapa...</p>
      </div>
    )
  }

  return <DynamicGuatemalaMap />
}

