/**
 * Scripts personalizados para la aplicación
 */

// Función para descargar datos JSON como archivo
function downloadJSON(data, filename) {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = filename || "datos.json"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Función para validar datos JSON
function validateJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString)

    if (!Array.isArray(data)) {
      return { valid: false, message: "Los datos deben ser un array" }
    }

    if (data.length === 0) {
      return { valid: false, message: "El array no puede estar vacío" }
    }

    return { valid: true, data }
  } catch (error) {
    return { valid: false, message: "JSON inválido: " + error.message }
  }
}

// Función para exportar una gráfica como imagen
function exportChartAsImage(chartId, filename) {
  const canvas = document.getElementById(chartId)
  if (!canvas) return

  const image = canvas.toDataURL("image/png")

  const link = document.createElement("a")
  link.download = filename || "chart.png"
  link.href = image
  link.click()
}

// Inicializar tooltips de Bootstrap
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

  // Cerrar alertas automáticamente después de 5 segundos
  const alerts = document.querySelectorAll(".alert")
  alerts.forEach((alert) => {
    setTimeout(() => {
      if (typeof bootstrap !== "undefined") {
        const bsAlert = bootstrap.Alert.getInstance(alert) || new bootstrap.Alert(alert)
        bsAlert.close()
      } else {
        alert.style.display = "none" // Fallback if Bootstrap is not available
      }
    }, 5000)
  })

  // Mostrar el nombre del archivo seleccionado en los inputs de tipo file
  const fileInputs = document.querySelectorAll('input[type="file"]')
  fileInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const fileName = e.target.files[0]?.name || "Ningún archivo seleccionado"
      const fileText = input.parentElement.querySelector(".file-upload-text")

      if (fileText) {
        fileText.textContent = fileName
      }
    })
  })
})

