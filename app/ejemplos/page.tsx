"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Cell,
} from "recharts"

// Datos de ejemplo en formato JSON
const sampleData = {
  ventas: [
    { name: "Ene", Electrónicos: 4000, Ropa: 3490 },
    { name: "Feb", Electrónicos: 3000, Ropa: 4300 },
    { name: "Mar", Electrónicos: 2000, Ropa: 2300 },
    { name: "Abr", Electrónicos: 2780, Ropa: 3200 },
    { name: "May", Electrónicos: 1890, Ropa: 2500 },
    { name: "Jun", Electrónicos: 2390, Ropa: 3100 },
  ],
  productos: [
    { name: "Smartphones", value: 35 },
    { name: "Laptops", value: 25 },
    { name: "Accesorios", value: 20 },
    { name: "Tablets", value: 15 },
    { name: "Otros", value: 5 },
  ],
  tendencia: [
    { name: "Semana 1", value: 1000 },
    { name: "Semana 2", value: 1200 },
    { name: "Semana 3", value: 1500 },
    { name: "Semana 4", value: 1300 },
    { name: "Semana 5", value: 1800 },
    { name: "Semana 6", value: 2000 },
    { name: "Semana 7", value: 2200 },
    { name: "Semana 8", value: 2500 },
  ],
}

export default function EjemplosPage() {
  const [activeTab, setActiveTab] = useState("bar")

  // Mostrar el JSON en formato legible
  const renderJsonExample = (data: any) => {
    return (
      <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm mt-4">{JSON.stringify(data, null, 2)}</pre>
    )
  }

  // Colores para las gráficas
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Ejemplos de Gráficas</h1>
      <p className="text-gray-600 mb-8">
        Estos ejemplos muestran diferentes tipos de gráficas y formatos de datos JSON.
      </p>

      <Tabs defaultValue="bar" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="bar">Gráfica de Barras</TabsTrigger>
          <TabsTrigger value="line">Gráfica de Líneas</TabsTrigger>
          <TabsTrigger value="pie">Gráfica Circular</TabsTrigger>
        </TabsList>

        <Card>
          <CardHeader>
            <CardTitle>
              {activeTab === "bar" && "Ejemplo - Gráfica de Barras Agrupadas"}
              {activeTab === "line" && "Ejemplo - Gráfica de Líneas"}
              {activeTab === "pie" && "Ejemplo - Gráfica Circular"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TabsContent value="bar" className="mt-0">
              <div className="h-[400px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleData.ventas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Electrónicos" fill="#0088FE" />
                    <Bar dataKey="Ropa" fill="#00C49F" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <h3 className="font-semibold mt-6 mb-2">Datos JSON para esta gráfica:</h3>
              {renderJsonExample(sampleData.ventas)}
            </TabsContent>

            <TabsContent value="line" className="mt-0">
              <div className="h-[400px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleData.tendencia}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#0088FE"
                      name="Ventas"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <h3 className="font-semibold mt-6 mb-2">Datos JSON para esta gráfica:</h3>
              {renderJsonExample(sampleData.tendencia)}
            </TabsContent>

            <TabsContent value="pie" className="mt-0">
              <div className="h-[400px] mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sampleData.productos}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {sampleData.productos.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <h3 className="font-semibold mt-6 mb-2">Datos JSON para esta gráfica:</h3>
              {renderJsonExample(sampleData.productos)}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Consejos para Estructurar tus Datos JSON</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Gráficas de barras simples y líneas:</strong> Usa un array de objetos con propiedades "name" y
            "value".
          </li>
          <li>
            <strong>Gráficas de barras agrupadas:</strong> Cada objeto debe tener una propiedad "name" y luego una
            propiedad para cada serie de datos.
          </li>
          <li>
            <strong>Gráficas circulares:</strong> Similar a las barras simples, usa un array de objetos con "name" y
            "value".
          </li>
          <li>
            <strong>Datos más complejos:</strong> Para visualizaciones más avanzadas, puedes incluir propiedades
            adicionales como "category", "color", etc.
          </li>
        </ul>
      </div>
    </main>
  )
}

