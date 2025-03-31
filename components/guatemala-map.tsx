"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Info, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Componente para el mapa de Guatemala
const DynamicMap = () => {
  const [activeTab, setActiveTab] = useState("population")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const geoJsonRef = useRef<any>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)

  useEffect(() => {
    // Verificar si estamos en el navegador
    if (typeof window !== "undefined") {
      // Importar dinámicamente los componentes de react-leaflet
      Promise.all([
        import("react-leaflet").then((mod) => {
          window.MapContainer = mod.MapContainer
          window.TileLayer = mod.TileLayer
          window.GeoJSON = mod.GeoJSON
          return mod
        }),
        import("leaflet").then((L) => {
          // Asegurarse de que los estilos de Leaflet estén cargados
          if (!document.querySelector('link[href*="leaflet.css"]')) {
            const link = document.createElement("link")
            link.rel = "stylesheet"
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            link.crossOrigin = ""
            document.head.appendChild(link)
          }
          return L
        }),
      ])
        .then(() => {
          setLeafletLoaded(true)
          setTimeout(() => setMapLoaded(true), 100) // Pequeño retraso para asegurar que todo esté listo
        })
        .catch((err) => {
          console.error("Error cargando Leaflet:", err)
        })
    }
  }, [])

  if (!leafletLoaded || !mapLoaded) {
    return (
      <div className="h-[500px] rounded-md overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Skeleton className="h-10 w-10 rounded-full mx-auto mb-4" />
          <p className="text-gray-500">Cargando mapa...</p>
        </div>
      </div>
    )
  }

  // Renderizar el mapa solo si Leaflet está cargado
  if (typeof window !== "undefined" && window.MapContainer && window.TileLayer && window.GeoJSON) {
    const MapContainer = window.MapContainer
    const TileLayer = window.TileLayer
    const GeoJSON = window.GeoJSON

    // Aquí iría el código para renderizar el mapa con los componentes de Leaflet
    // Por simplicidad, mostramos un placeholder
    return (
      <div className="h-[500px] rounded-md overflow-hidden border border-gray-200">
        <MapContainer
          center={[15.7835, -90.2308]}
          zoom={7}
          style={{ height: "100%", width: "100%" }}
          zoomControl={true}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {/* Aquí iría el GeoJSON con los datos de Guatemala */}
        </MapContainer>
      </div>
    )
  }

  // Fallback si algo falla
  return (
    <div className="h-[500px] rounded-md overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
      <p className="text-gray-500">No se pudo cargar el mapa</p>
    </div>
  )
}

export function GuatemalaMap() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("population")
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Simular carga
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Datos estadísticos para todos los departamentos de Guatemala
  const departmentData: Record<string, any> = {
    "Alta Verapaz": {
      population: 1215038,
      density: 126,
      growth: 3.2,
      education: 6.2,
      indigenous: 89.7,
      year: 2023,
    },
    "Baja Verapaz": {
      population: 299476,
      density: 85,
      growth: 2.1,
      education: 5.8,
      indigenous: 65.2,
      year: 2023,
    },
    Chimaltenango: {
      population: 723938,
      density: 374,
      growth: 2.5,
      education: 6.7,
      indigenous: 78.4,
      year: 2023,
    },
    Chiquimula: {
      population: 415868,
      density: 158,
      growth: 1.9,
      education: 5.3,
      indigenous: 16.7,
      year: 2023,
    },
    "El Progreso": {
      population: 176632,
      density: 88,
      growth: 1.5,
      education: 6.1,
      indigenous: 1.2,
      year: 2023,
    },
    Escuintla: {
      population: 803488,
      density: 156,
      growth: 2.0,
      education: 5.9,
      indigenous: 7.5,
      year: 2023,
    },
    Guatemala: {
      population: 3573179,
      density: 1568,
      growth: 2.1,
      education: 9.8,
      indigenous: 12.5,
      year: 2023,
    },
    Huehuetenango: {
      population: 1352939,
      density: 168,
      growth: 2.7,
      education: 5.4,
      indigenous: 64.8,
      year: 2023,
    },
    Izabal: {
      population: 467982,
      density: 46,
      growth: 2.2,
      education: 5.6,
      indigenous: 29.3,
      year: 2023,
    },
    Jalapa: {
      population: 355566,
      density: 139,
      growth: 2.4,
      education: 5.2,
      indigenous: 19.2,
      year: 2023,
    },
    Jutiapa: {
      population: 488395,
      density: 129,
      growth: 1.7,
      education: 5.5,
      indigenous: 3.5,
      year: 2023,
    },
    Petén: {
      population: 781217,
      density: 22,
      growth: 3.5,
      education: 5.7,
      indigenous: 30.2,
      year: 2023,
    },
    Quetzaltenango: {
      population: 927358,
      density: 393,
      growth: 2.3,
      education: 7.2,
      indigenous: 54.1,
      year: 2023,
    },
    Quiché: {
      population: 1130778,
      density: 128,
      growth: 2.9,
      education: 5.1,
      indigenous: 88.6,
      year: 2023,
    },
    Retalhuleu: {
      population: 341378,
      density: 162,
      growth: 2.2,
      education: 5.8,
      indigenous: 22.7,
      year: 2023,
    },
    Sacatepéquez: {
      population: 362521,
      density: 723,
      growth: 2.0,
      education: 7.5,
      indigenous: 42.3,
      year: 2023,
    },
    "San Marcos": {
      population: 1147409,
      density: 285,
      growth: 2.4,
      education: 5.6,
      indigenous: 31.7,
      year: 2023,
    },
    "Santa Rosa": {
      population: 396607,
      density: 112,
      growth: 1.8,
      education: 5.7,
      indigenous: 3.2,
      year: 2023,
    },
    Sololá: {
      population: 491530,
      density: 464,
      growth: 2.6,
      education: 5.9,
      indigenous: 96.4,
      year: 2023,
    },
    Suchitepéquez: {
      population: 582162,
      density: 196,
      growth: 2.3,
      education: 5.5,
      indigenous: 51.5,
      year: 2023,
    },
    Totonicapán: {
      population: 562954,
      density: 477,
      growth: 2.7,
      education: 5.3,
      indigenous: 97.8,
      year: 2023,
    },
    Zacapa: {
      population: 245374,
      density: 79,
      growth: 1.6,
      education: 5.9,
      indigenous: 1.4,
      year: 2023,
    },
  }

  // Función para centrar el mapa en un departamento
  const centerMapOnDepartment = (departmentName: string) => {
    setSelectedDepartment(departmentName)
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-2xl">
          Consulta de indicadores sociodemográficos y económicos por área geográfica
        </CardTitle>
        <CardDescription>Seleccione un departamento para ver sus indicadores</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {loading ? (
              <Skeleton className="w-full h-[500px] rounded-md" />
            ) : isClient ? (
              <DynamicMap />
            ) : (
              <Skeleton className="w-full h-[500px] rounded-md" />
            )}
          </div>

          <div>
            {selectedDepartment ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-blue-800">{selectedDepartment}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDepartment(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4 mr-1" /> Cerrar
                  </Button>
                </div>

                {departmentData[selectedDepartment] && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-gray-600">Población, {departmentData[selectedDepartment]?.year}:</p>
                      <p className="text-xl font-bold">
                        {departmentData[selectedDepartment]?.population.toLocaleString()} personas
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-gray-600">Densidad poblacional:</p>
                      <p className="text-xl font-bold">{departmentData[selectedDepartment]?.density} hab/km²</p>
                    </div>

                    <Button className="w-full mt-4" variant="outline">
                      Ver más indicadores de {selectedDepartment}
                    </Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Consulta los indicadores de tu área geográfica</h3>
                <p className="text-gray-500">Seleccione un departamento en el mapa o búsquelo por nombre</p>

                <div className="space-y-2">
                  <label htmlFor="department-select" className="text-sm font-medium">
                    Seleccione un departamento:
                  </label>
                  <Select onValueChange={(value) => centerMapOnDepartment(value)} placeholder="Buscar departamento...">
                    <SelectTrigger id="department-select" className="w-full">
                      <SelectValue placeholder="Buscar departamento..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(departmentData)
                        .sort()
                        .map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="population">Población</TabsTrigger>
                  <TabsTrigger value="density">Densidad</TabsTrigger>
                  <TabsTrigger value="growth">Crecimiento</TabsTrigger>
                  <TabsTrigger value="indigenous">Pueblos</TabsTrigger>
                </TabsList>
              </Tabs>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  <h3 className="font-medium">
                    {activeTab === "population" && "Población total por departamento"}
                    {activeTab === "density" && "Densidad poblacional (hab/km²)"}
                    {activeTab === "growth" && "Tasa de crecimiento anual (%)"}
                    {activeTab === "indigenous" && "Población de Pueblos (%)"}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

