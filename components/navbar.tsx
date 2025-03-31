"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Menu, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const pathname = usePathname()
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Detectar scroll para cambiar el estilo de la barra
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const mainRoutes = [
    {
      href: "/",
      label: "Inicio",
      active: pathname === "/",
    },
    {
      href: "/publicaciones",
      label: "Publicaciones",
      active: pathname === "/publicaciones",
    },
    {
      href: "/informacion-publica",
      label: "Información Pública",
      active: pathname === "/informacion-publica",
    },
    {
      href: "/contactenos",
      label: "Contáctenos",
      active: pathname === "/contactenos",
    },
  ]

  const serviceRoutes = [
    {
      href: "/indices",
      label: "Índices",
      active: pathname === "/indices",
    },
    {
      href: "/censos-encuestas",
      label: "Censos y Encuestas",
      active: pathname === "/censos-encuestas",
    },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "sticky top-0 z-50 w-full backdrop-blur transition-all duration-300",
        scrolled ? "bg-white/90 shadow-md dark:bg-gray-900/90" : "bg-white/50 dark:bg-gray-900/50",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 mr-6 group">
          <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
            <BarChart3 className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-bold hidden md:inline-block text-blue-800 dark:text-blue-300"
          >
            Instituto Nacional de Estadística
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {/* Primero renderizamos el enlace de Inicio */}
          <motion.div
            key="/"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -2 }}
          >
            <Link
              href="/"
              className={cn(
                "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                pathname === "/"
                  ? "text-blue-700 dark:text-blue-300"
                  : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300",
              )}
            >
              Inicio
              {pathname === "/" && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          </motion.div>

          {/* Luego el dropdown de Servicios Estadísticos */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -2 }}
          >
            <DropdownMenu onOpenChange={(open) => setIsServicesOpen(open)}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    serviceRoutes.some((r) => r.active)
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300",
                  )}
                >
                  Servicios Estadísticos
                  <motion.div animate={{ rotate: isServicesOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="h-4 w-4" />
                  </motion.div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg rounded-lg p-1 w-56 dark:bg-gray-800/95 dark:border-gray-700"
              >
                <AnimatePresence>
                  {serviceRoutes.map((route, index) => (
                    <motion.div
                      key={route.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <DropdownMenuItem asChild className="focus:bg-blue-50 dark:focus:bg-blue-900/30 rounded-md p-2">
                        <Link
                          href={route.href}
                          className={cn(
                            "w-full flex items-center",
                            route.active
                              ? "font-medium text-blue-700 dark:text-blue-300"
                              : "text-gray-700 dark:text-gray-300",
                          )}
                        >
                          {route.label}
                          {route.active && (
                            <motion.div
                              layoutId="activeDropdownIndicator"
                              className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"
                            />
                          )}
                        </Link>
                      </DropdownMenuItem>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          {/* Finalmente el resto de los enlaces, excluyendo Inicio que ya se renderizó */}
          {mainRoutes
            .filter((route) => route.href !== "/")
            .map((route, index) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + 0.1 * index }}
                whileHover={{ y: -2 }}
              >
                <Link
                  href={route.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    route.active
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300",
                  )}
                >
                  {route.label}
                  {route.active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
        </div>

        <div className="flex items-center ml-auto space-x-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeToggle />
          </motion.div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="icon" className="md:hidden relative overflow-hidden">
                  <AnimatePresence initial={false} mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 45, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 45, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -45, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </motion.div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white/95 backdrop-blur-md border-l border-gray-200 shadow-xl dark:bg-gray-900/95 dark:border-gray-800"
            >
              <nav className="flex flex-col gap-6 mt-10">
                {/* Primero el enlace de Inicio */}
                <motion.div
                  key="/"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <Link
                    href="/"
                    className={cn(
                      "text-base font-medium transition-colors flex items-center",
                      pathname === "/"
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {pathname === "/" && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                      />
                    )}
                    Inicio
                  </Link>
                </motion.div>

                {/* Luego el dropdown de Servicios Estadísticos */}
                <div className="pt-2 pb-1">
                  <motion.button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className={cn(
                      "flex items-center gap-2 text-base font-medium transition-colors",
                      serviceRoutes.some((r) => r.active)
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300",
                    )}
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Servicios Estadísticos{" "}
                    <motion.div animate={{ rotate: isServicesOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      className="pl-6 flex flex-col gap-4 pt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {serviceRoutes.map((route, index) => (
                        <motion.div
                          key={route.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ x: 5 }}
                        >
                          <Link
                            href={route.href}
                            className={cn(
                              "text-base font-medium transition-colors flex items-center",
                              route.active
                                ? "text-blue-700 dark:text-blue-300"
                                : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {route.active && (
                              <motion.div
                                layoutId="mobileServiceActiveIndicator"
                                className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                              />
                            )}
                            {route.label}
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Finalmente el resto de los enlaces, excluyendo Inicio que ya se renderizó */}
                {mainRoutes
                  .filter((route) => route.href !== "/")
                  .map((route, index) => (
                    <motion.div
                      key={route.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + 0.1 * index }}
                      whileHover={{ x: 5 }}
                    >
                      <Link
                        href={route.href}
                        className={cn(
                          "text-base font-medium transition-colors flex items-center",
                          route.active
                            ? "text-blue-700 dark:text-blue-300"
                            : "text-gray-600 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-300",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {route.active && (
                          <motion.div
                            layoutId="mobileActiveIndicator"
                            className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400"
                          />
                        )}
                        {route.label}
                      </Link>
                    </motion.div>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}

