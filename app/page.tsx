import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, PieChart, FileText, Phone, History } from "lucide-react"
import { Carousel } from "@/components/carousel"
import { StatCards } from "@/components/stat-cards"
import { DynamicGuatemalaMapWrapper } from "@/components/dynamic-guatemala-map-wrapper"

// Datos para el carrusel con imágenes más realistas
const carouselItems = [
  {
    title: "Índice de Precios al Consumidor (IPC)",
    description: "Conoce las últimas actualizaciones del IPC y su impacto en la economía guatemalteca",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop",
    link: "/indices",
  },
  {
    title: "Encuesta Nacional de Egresos e Ingresos Continua (ENEIC)",
    description: "Resultados de la última encuesta sobre la situación económica de los hogares guatemaltecos",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop",
    link: "/censos-encuestas",
  },
  {
    title: "Censo Nacional de Población",
    description: "Explora los datos demográficos más recientes de Guatemala",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    link: "/censos-encuestas",
  },
]

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Instituto Nacional de Estadística de Guatemala</h1>
      <p className="text-gray-600 mb-8">Visualiza y crea gráficas para diferentes servicios estadísticos</p>

      {/* Carrusel */}
      <div className="mb-10">
        <Carousel items={carouselItems} />
      </div>

      {/* Tarjetas estadísticas */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Indicadores Principales</h2>
        <StatCards />
      </div>

      {/* Mapa interactivo de Guatemala */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Estadísticas Territoriales</h2>
        <DynamicGuatemalaMapWrapper />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <Link href="/indices">
          <Card className="h-full hover:shadow-md transition-shadow bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Índices</CardTitle>
              <CardDescription>Visualización de índices estadísticos y económicos</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button variant="ghost" className="gap-2">
                Ver índices <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/censos-encuestas">
          <Card className="h-full hover:shadow-md transition-shadow bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Censos y Encuestas</CardTitle>
              <CardDescription>Análisis de datos de censos y encuestas poblacionales</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end">
              <Button variant="ghost" className="gap-2">
                Ver censos y encuestas <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="mb-10 bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" /> Historia del INE Guatemala
          </CardTitle>
          <CardDescription>Nuestra trayectoria al servicio de la estadística nacional</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Orígenes y Fundación</h3>
            <p className="text-gray-700">
              El Instituto Nacional de Estadística (INE) de Guatemala fue creado mediante el Decreto Ley 3-85, "Ley
              Orgánica del Instituto Nacional de Estadística", el 15 de enero de 1985. Sin embargo, sus antecedentes se
              remontan a la Dirección General de Estadística, que funcionaba desde principios del siglo XX para
              recopilar información demográfica y económica del país.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Consolidación y Desarrollo</h3>
            <p className="text-gray-700">
              Durante las décadas posteriores a su fundación, el INE se consolidó como la principal institución
              estadística de Guatemala, ampliando sus competencias para incluir estadísticas económicas, sociales y
              demográficas. Su papel fue fundamental en la planificación del desarrollo nacional, proporcionando datos
              esenciales para la formulación de políticas públicas en el contexto de la transición democrática del país.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Modernización y Avances Tecnológicos</h3>
            <p className="text-gray-700">
              A partir de los años 2000, el INE inició un importante proceso de modernización tecnológica, incorporando
              sistemas informáticos avanzados para la recogida, procesamiento y difusión de datos. Esto permitió mejorar
              la calidad y oportunidad de las estadísticas oficiales, así como ampliar su alcance a áreas rurales y
              comunidades indígenas, tradicionalmente subrepresentadas en las estadísticas nacionales.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">El INE en la Actualidad</h3>
            <p className="text-gray-700">
              Actualmente, el INE de Guatemala es responsable de producir y difundir estadísticas oficiales de alta
              calidad. Entre sus principales operaciones estadísticas se encuentran el Censo Nacional de Población y
              Vivienda, el Índice de Precios al Consumidor (IPC), la Encuesta Nacional de Egresos e Ingresos Continua
              (ENEIC), la Encuesta Nacional de Empleo e Ingresos, y las Estadísticas Vitales, entre otras. Estas
              estadísticas son fundamentales para entender la realidad socioeconómica del país y diseñar políticas
              públicas efectivas.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Misión y Valores</h3>
            <p className="text-gray-700">
              La misión del INE es diseñar y ejecutar la Política Estadística Nacional, para recopilar, producir,
              analizar y difundir estadísticas confiables, oportunas, transparentes y eficientes. Nos regimos por los
              principios de confidencialidad, transparencia, relevancia, oportunidad y accesibilidad, comprometidos con
              proporcionar información estadística que refleje la diversidad cultural, étnica y lingüística de
              Guatemala.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/informacion-publica">
          <Card className="hover:shadow-md transition-shadow h-full bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Información Pública</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Accede a información pública y datos abiertos</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/contactenos">
          <Card className="hover:shadow-md transition-shadow h-full bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contáctenos</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Ponte en contacto con nuestro equipo</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/crear">
          <Card className="hover:shadow-md transition-shadow h-full bg-white/95 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Crear Gráfica</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Crea una nueva gráfica personalizada</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </main>
  )
}

