"use client"

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

interface ChartComponentProps {
  type: "bar" | "line" | "pie"
  data: any[]
}

export default function ChartComponent({ type, data }: ChartComponentProps) {
  // Colores para las gráficas
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

  // Verificar si los datos tienen múltiples series (para gráficas de barras)
  const hasMultipleSeries = data.length > 0 && Object.keys(data[0]).some((key) => key !== "name" && key !== "value")

  // Obtener las claves de las series para gráficas de barras múltiples
  const seriesKeys = hasMultipleSeries ? Object.keys(data[0]).filter((key) => key !== "name") : ["value"]

  switch (type) {
    case "bar":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {hasMultipleSeries ? (
              seriesKeys.map((key, index) => <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />)
            ) : (
              <Bar dataKey="value" fill="#0088FE" />
            )}
          </BarChart>
        </ResponsiveContainer>
      )

    case "line":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {hasMultipleSeries ? (
              seriesKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))
            ) : (
              <Line
                type="monotone"
                dataKey="value"
                stroke="#0088FE"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      )

    case "pie":
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )

    default:
      return <div>Tipo de gráfica no soportado</div>
  }
}

