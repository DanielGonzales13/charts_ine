// Esta es una implementación de ejemplo que deberías reemplazar con tu lógica real
// para conectar con WordPress y tu base de datos

// Función para obtener departamentos desde WordPress usando WPGraphQL
export async function getDepartments() {
  // En una implementación real, harías una petición a tu API GraphQL de WordPress
  // Ejemplo:
  // const response = await fetch(process.env.WORDPRESS_API_URL, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     query: `
  //       query GetDepartments {
  //         departments {
  //           nodes {
  //             id
  //             name
  //             slug
  //             description
  //           }
  //         }
  //       }
  //     `
  //   })
  // })
  // const { data } = await response.json()
  // return data.departments.nodes

  // Datos de ejemplo para la demostración
  return [
    { id: "1", name: "Ventas", slug: "ventas", description: "Departamento de ventas y marketing" },
    { id: "2", name: "Finanzas", slug: "finanzas", description: "Departamento de finanzas y contabilidad" },
    { id: "3", name: "Recursos Humanos", slug: "rrhh", description: "Departamento de recursos humanos" },
    { id: "4", name: "Operaciones", slug: "operaciones", description: "Departamento de operaciones" },
  ]
}

// Función para obtener un departamento por su slug
export async function getDepartmentBySlug(slug: string) {
  const departments = await getDepartments()
  return departments.find((dept) => dept.slug === slug)
}

// Función para obtener gráficas por departamento
export async function getChartsByDepartment(departmentId: string) {
  // En una implementación real, harías una petición a tu base de datos
  // Ejemplo con una API REST:
  // const response = await fetch(`/api/charts?departmentId=${departmentId}`)
  // return await response.json()

  // Datos de ejemplo para la demostración
  const charts = [
    {
      id: "1",
      title: "Ventas Mensuales",
      description: "Gráfica de ventas mensuales del año actual",
      type: "bar" as const,
      createdAt: "2023-01-15",
    },
    {
      id: "2",
      title: "Tendencia de Ingresos",
      description: "Tendencia de ingresos de los últimos 12 meses",
      type: "line" as const,
      createdAt: "2023-02-20",
    },
    {
      id: "3",
      title: "Distribución de Ventas por Producto",
      description: "Distribución porcentual de ventas por categoría de producto",
      type: "pie" as const,
      createdAt: "2023-03-10",
    },
  ]

  // Filtramos solo para el departamento de ventas en este ejemplo
  if (departmentId === "1") {
    return charts
  }

  // Para otros departamentos, devolvemos un subconjunto o array vacío
  return departmentId === "2" ? charts.slice(0, 1) : []
}

// Función para obtener datos de una gráfica específica
export async function getChartData(chartId: string) {
  // En una implementación real, harías una petición a tu base de datos
  // Ejemplo:
  // const response = await fetch(`/api/chart-data/${chartId}`)
  // return await response.json()

  // Datos de ejemplo para la demostración
  const dataSets = {
    "1": [
      { name: "Ene", value: 1200 },
      { name: "Feb", value: 1900 },
      { name: "Mar", value: 1500 },
      { name: "Abr", value: 2200 },
      { name: "May", value: 2500 },
      { name: "Jun", value: 2100 },
    ],
    "2": [
      { name: "Jul 2022", value: 1100 },
      { name: "Ago 2022", value: 1300 },
      { name: "Sep 2022", value: 1200 },
      { name: "Oct 2022", value: 1400 },
      { name: "Nov 2022", value: 1800 },
      { name: "Dic 2022", value: 2000 },
      { name: "Ene 2023", value: 1900 },
      { name: "Feb 2023", value: 2100 },
      { name: "Mar 2023", value: 2300 },
      { name: "Abr 2023", value: 2200 },
      { name: "May 2023", value: 2500 },
      { name: "Jun 2023", value: 2700 },
    ],
    "3": [
      { name: "Electrónicos", value: 35 },
      { name: "Ropa", value: 25 },
      { name: "Alimentos", value: 20 },
      { name: "Hogar", value: 15 },
      { name: "Otros", value: 5 },
    ],
  }

  return dataSets[chartId as keyof typeof dataSets] || []
}

// Función para obtener fuentes de datos disponibles
export async function getDataSources(departmentId: string) {
  // En una implementación real, harías una petición a tu base de datos
  // Ejemplo:
  // const response = await fetch(`/api/data-sources?departmentId=${departmentId}`)
  // return await response.json()

  // Datos de ejemplo para la demostración
  const sources = [
    { id: "ds1", name: "Ventas SQL Database", description: "Base de datos principal de ventas" },
    { id: "ds2", name: "CRM Data", description: "Datos de clientes del CRM" },
    { id: "ds3", name: "Google Analytics", description: "Datos de analítica web" },
  ]

  // Simulamos diferentes fuentes según el departamento
  if (departmentId === "1") {
    return sources
  } else if (departmentId === "2") {
    return [sources[0]]
  } else if (departmentId === "3") {
    return [sources[1]]
  }

  return []
}

// Función para crear una nueva gráfica
export async function createChart(chartData: {
  title: string
  description: string
  type: "bar" | "line" | "pie"
  departmentId: string
  dataSource: string
}) {
  // En una implementación real, harías una petición POST a tu API
  // Ejemplo:
  // const response = await fetch('/api/charts', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(chartData)
  // })
  // const data = await response.json()
  // return data.id

  // Simulamos la creación devolviendo un ID aleatorio
  return Math.random().toString(36).substring(2, 9)
}

