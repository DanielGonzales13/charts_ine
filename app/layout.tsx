import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import { Footer } from "@/components/footer"
// Importar el componente de fondo institucional
import { InstitutionalBackground } from "@/components/institutional-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Instituto Nacional de Estadística",
  description: "Visualiza y crea gráficas para diferentes servicios estadísticos",
    generator: 'v0.dev'
}

// Modificar el componente RootLayout para incluir el fondo
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <InstitutionalBackground />
          <div className="min-h-screen flex flex-col relative z-0">
            <Navbar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'