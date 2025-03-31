import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-blue-700 text-white">
      <div className="container mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Columna 1: Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Instituto Nacional de Estadística</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <p>8a Calle 9-55 Zona 1, Ciudad de Guatemala</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <p>(502) 2315-4700</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <p>contacto@ine.gob.gt</p>
              </div>
            </div>
          </div>

          {/* Columna 2: Enlaces rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/indices" className="hover:underline">
                  Índices
                </Link>
              </li>
              <li>
                <Link href="/censos-encuestas" className="hover:underline">
                  Censos y Encuestas
                </Link>
              </li>
              <li>
                <Link href="/publicaciones" className="hover:underline">
                  Publicaciones
                </Link>
              </li>
              <li>
                <Link href="/informacion-publica" className="hover:underline">
                  Información Pública
                </Link>
              </li>
              <li>
                <Link href="/contactenos" className="hover:underline">
                  Contáctenos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Redes sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.facebook.com/INEGuatemala"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
              <Link
                href="https://twitter.com/INEGuatemala"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.instagram.com/ineguatemala/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.youtube.com/channel/UCqQzAodnBIlCkYg3HCLmVQA"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/ineguatemala/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Boletín Informativo</h4>
              <p className="text-sm mb-2">Suscríbete para recibir noticias y actualizaciones</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="px-3 py-2 text-black rounded-l-md w-full focus:outline-none"
                />
                <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-r-md transition-colors">
                  Suscribir
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Instituto Nacional de Estadística de Guatemala. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/politica-privacidad" className="hover:underline">
              Política de Privacidad
            </Link>
            <Link href="/terminos-condiciones" className="hover:underline">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

