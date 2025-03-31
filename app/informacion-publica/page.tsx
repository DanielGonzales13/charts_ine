"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ArrowRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function InformacionPublicaPage() {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Lista de artículos de información pública
  const infoItems = [
    { id: 1, title: "Estructura Orgánica", description: "Información sobre la estructura organizativa del INE" },
    { id: 2, title: "Directorio y teléfonos", description: "Contactos y números telefónicos de la institución" },
    { id: 3, title: "Directorio de empleados", description: "Listado de empleados y servidores públicos" },
    { id: 4, title: "Número y nombre de empleados", description: "Información detallada del personal" },
    { id: 5, title: "Misión y objetivos", description: "Misión, visión y objetivos institucionales" },
    { id: 6, title: "Manuales Institucionales", description: "Documentos y manuales de procedimientos" },
    { id: 7, title: "Presupuesto", description: "Presupuesto de ingresos y egresos" },
    { id: 8, title: "Informes presupuestarios", description: "Informes mensuales de ejecución presupuestaria" },
    { id: 9, title: "Depósitos con fondos públicos", description: "Información sobre fondos públicos" },
    {
      id: 10,
      title: "Procesos de cotización",
      description: "Procesos de cotización y licitación para desarrollo rural",
    },
    { id: 11, title: "Contratación de bienes", description: "Contratación de bienes y servicios" },
  ]

  // Objetivos de la ley
  const objetivos = [
    "Garantizar a toda persona interesada, sin discriminación alguna, el derecho a solicitar y a tener acceso a la información pública en posesión de las autoridades y sujetos obligados por la presente ley.",
    "Garantizar a toda persona individual el derecho a conocer y proteger los datos personales de lo que de ella conste en archivos estatales, así como de las actualizaciones de los mismos.",
    "Garantizar la transparencia de la administración pública y de los sujetos obligados y el derecho de toda persona a tener acceso libre a la información pública.",
    "Establecer como obligatorio el principio de máxima publicidad y transparencia en la administración pública y para los sujetos obligados en la presente ley.",
    "Establecer, a manera de excepción y de manera limitativa, los supuestos en que se restrinja el acceso a la información pública.",
    "Favorecer por el estado la rendición de cuentas a los gobernados, de manera que puedan auditar el desempeño de la administración pública.",
    "Garantizar que toda persona tenga acceso a los actos de la administración pública.",
  ]

  // Filtrar los items basados en el término de búsqueda
  const filteredItems = infoItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-blue-500 mb-2">Información Pública de Oficio</h1>
      <h2 className="text-xl text-blue-500 mb-8">Ley de Acceso a la Información Pública, Decreto 57-2008</h2>

      <div className="border-t border-gray-200 pt-8 mb-8"></div>

      {/* Sección de introducción */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-blue-500 mb-6">Información Pública de Oficio</h2>
          <p className="text-gray-700 mb-4">
            El Instituto Nacional de Estadística, en cumplimiento de la Ley de Acceso a la Información Pública, Decreto
            57-2008, presenta la información pública de oficio contemplada en los artículos 10 y 11 de la referida ley.
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <Button className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Ley de acceso a la información pública
          </Button>
        </div>
      </div>

      {/* Buscador para filtrar cards */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar información pública..."
          className="pl-10 py-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cards de información pública que ocupan toda la pantalla */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setActiveItem(item.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
                <div className="mt-auto flex justify-end">
                  <Button
                    variant="ghost"
                    className="p-0 hover:bg-transparent text-blue-500 hover:text-blue-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveItem(item.id)
                    }}
                  >
                    Ver información <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">No se encontraron resultados para "{searchTerm}"</p>
          <Button variant="outline" onClick={() => setSearchTerm("")}>
            Limpiar búsqueda
          </Button>
        </div>
      )}

      {/* Sección de objetivos de la ley */}
      <Card className="bg-gray-50 mb-8">
        <CardHeader>
          <CardTitle>Objetivos de la Ley</CardTitle>
          <CardDescription>
            La Ley de Acceso a la Información Pública, tiene como objetivos (Artículo 1):
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-8 space-y-3">
            {objetivos.map((objetivo, index) => (
              <li key={index} className="text-gray-700">
                {objetivo}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Contenido detallado cuando se selecciona un ítem */}
      {activeItem && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{infoItems.find((item) => item.id === activeItem)?.title}</CardTitle>
            <CardDescription>{infoItems.find((item) => item.id === activeItem)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Contenido detallado de {infoItems.find((item) => item.id === activeItem)?.title}. Esta sección mostraría
              la información específica relacionada con este ítem.
            </p>

            {/* Aquí se podría agregar contenido específico para cada ítem */}
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-500">La información detallada se cargará según el ítem seleccionado.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  )
}

