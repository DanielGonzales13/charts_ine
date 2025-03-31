"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Phone, Mail, Clock, Car, BriefcaseIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { EmpleoForm } from "@/components/empleo-form"

// Datos de las delegaciones del INE
const delegaciones = {
  capital: [
    {
      id: 1,
      nombre: "Sede Central",
      direccion: "8a Calle 9-55 Zona 1, Ciudad de Guatemala",
      telefono: "(502) 2315-4700",
      email: "contacto@ine.gob.gt",
      horario: "Lunes a viernes 08:00 a 16:00",
      imagen: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      coordenadas: {
        lat: 14.642485,
        lng: -90.513386,
      },
    },
  ],
  departamentos: [
    {
      id: 3,
      nombre: "Delegación Quetzaltenango",
      direccion: "4a Calle 14-53 Zona 3, Quetzaltenango",
      telefono: "(502) 7761-4830",
      email: "quetzaltenango@ine.gob.gt",
      horario: "Lunes a viernes 08:00 a 16:00",
      imagen: "https://images.unsplash.com/photo-1580742314608-daa2e2b6b6cb?q=80&w=2071&auto=format&fit=crop",
      coordenadas: {
        lat: 14.833333,
        lng: -91.516667,
      },
    },
    {
      id: 4,
      nombre: "Delegación Huehuetenango",
      direccion: "5a Avenida 4-25 Zona 1, Huehuetenango",
      telefono: "(502) 7764-5872",
      email: "huehuetenango@ine.gob.gt",
      horario: "Lunes a viernes 08:00 a 16:00",
      imagen: "https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?q=80&w=2072&auto=format&fit=crop",
      coordenadas: {
        lat: 15.319444,
        lng: -91.470833,
      },
    },
    {
      id: 5,
      nombre: "Delegación Alta Verapaz",
      direccion: "3a Calle 3-40 Zona 4, Cobán, Alta Verapaz",
      telefono: "(502) 7951-3060",
      email: "altaverapaz@ine.gob.gt",
      horario: "Lunes a viernes 08:00 a 16:00",
      imagen: "https://images.unsplash.com/photo-1604868189265-219ba7bf7ea3?q=80&w=2070&auto=format&fit=crop",
      coordenadas: {
        lat: 15.483333,
        lng: -90.366667,
      },
    },
    {
      id: 6,
      nombre: "Delegación Petén",
      direccion: "Barrio El Centro, Flores, Petén",
      telefono: "(502) 7867-5024",
      email: "peten@ine.gob.gt",
      horario: "Lunes a viernes 08:00 a 16:00",
      imagen: "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?q=80&w=2064&auto=format&fit=crop",
      coordenadas: {
        lat: 16.933333,
        lng: -89.883333,
      },
    },
  ],
}

export default function ContactenosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("capital")
  const [contactTab, setContactTab] = useState("delegaciones")

  // Filtrar delegaciones
  const filteredDelegaciones = {
    capital: delegaciones.capital.filter(
      (d) =>
        d.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.direccion.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    departamentos: delegaciones.departamentos.filter(
      (d) =>
        d.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.direccion.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Contáctenos</h1>
      <p className="text-gray-600 mb-8">Encuentre información de contacto o envíe su solicitud</p>

      {/* Tabs principales para elegir entre delegaciones y empleo */}
      <Tabs defaultValue="delegaciones" value={contactTab} onValueChange={setContactTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="delegaciones" className="text-base py-3">
            Delegaciones
          </TabsTrigger>
          <TabsTrigger value="empleo" className="text-base py-3">
            Trabaja con nosotros
          </TabsTrigger>
        </TabsList>

        {/* Contenido de la tab de delegaciones */}
        <TabsContent value="delegaciones" className="mt-6">
          {/* Buscador */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar delegación por nombre o dirección"
              className="pl-10 py-6"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tabs de categorías */}
          <Tabs defaultValue="capital" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="capital" className="text-base py-3">
                Delegación en la Capital
              </TabsTrigger>
              <TabsTrigger value="departamentos" className="text-base py-3">
                Delegaciones Departamentales
              </TabsTrigger>
            </TabsList>

            {/* Contenido de las tabs */}
            <TabsContent value="capital" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDelegaciones.capital.map((delegacion) => (
                  <DelegacionCard key={delegacion.id} delegacion={delegacion} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="departamentos" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDelegaciones.departamentos.map((delegacion) => (
                  <DelegacionCard key={delegacion.id} delegacion={delegacion} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Contenido de la tab de empleo */}
        <TabsContent value="empleo" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EmpleoForm />
            </div>
            <div className="lg:col-span-1">
              <Card className="bg-white/95 backdrop-blur-sm h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-700 mb-4">Trabaja en el INE</h3>
                  <p className="text-gray-700 mb-4">
                    El Instituto Nacional de Estadística busca constantemente profesionales talentosos y comprometidos
                    para unirse a nuestro equipo.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Ofrecemos un ambiente de trabajo dinámico y la oportunidad de contribuir al desarrollo estadístico
                    del país.
                  </p>
                  <h4 className="font-semibold text-blue-700 mb-2">Beneficios de trabajar con nosotros:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
                    <li>Desarrollo profesional continuo</li>
                    <li>Ambiente laboral colaborativo</li>
                    <li>Oportunidades de capacitación</li>
                    <li>Estabilidad laboral</li>
                    <li>Impacto positivo en el desarrollo del país</li>
                  </ul>
                  <p className="text-gray-700 mb-4">
                    Complete el formulario adjunto para ser considerado en nuestros procesos de selección actuales y
                    futuros.
                  </p>
                  <div className="flex items-center justify-center mt-6">
                    <BriefcaseIcon className="h-16 w-16 text-blue-200" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Información de contacto general */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Phone className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Atención al Cliente</h3>
              <p className="text-gray-600 mb-1">Lunes a Viernes de 8 a 16 hrs.</p>
              <p className="text-blue-600 font-semibold">(502) 2315-4700</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Mail className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Correo Electrónico</h3>
              <p className="text-gray-600 mb-1">Consultas y solicitudes</p>
              <p className="text-blue-600 font-semibold">contacto@ine.gob.gt</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Horario de Atención</h3>
              <p className="text-gray-600 mb-1">Lunes a Viernes</p>
              <p className="text-blue-600 font-semibold">8:00 AM - 4:00 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

// Componente para mostrar cada delegación
function DelegacionCard({ delegacion }: { delegacion: any }) {
  return (
    <Card className="overflow-hidden bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/3 h-48 md:h-auto">
          <Image src={delegacion.imagen || "/placeholder.svg"} alt={delegacion.nombre} fill className="object-cover" />
        </div>
        <div className="p-4 md:p-6 flex-1">
          <h3 className="text-xl font-bold text-blue-700 mb-2">{delegacion.nombre}</h3>

          <div className="flex items-start gap-2 mb-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">{delegacion.direccion}</p>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">{delegacion.telefono}</p>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">{delegacion.email}</p>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />
            <p className="text-gray-700">{delegacion.horario}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${delegacion.coordenadas.lat},${delegacion.coordenadas.lng}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Ir con Maps</span>
              </Button>
            </Link>

            <Link
              href={`https://waze.com/ul?ll=${delegacion.coordenadas.lat},${delegacion.coordenadas.lng}&navigate=yes`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>Ir con Waze</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

