"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, CheckCircle, Upload, Briefcase, GraduationCap, MessageSquare, Phone, Mail, User } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"

// Áreas disponibles para aplicar
const areas = [
  { id: "estadistica", nombre: "Estadística" },
  { id: "informatica", nombre: "Informática y Tecnología" },
  { id: "administracion", nombre: "Administración" },
  { id: "rrhh", nombre: "Recursos Humanos" },
  { id: "comunicacion", nombre: "Comunicación" },
  { id: "legal", nombre: "Asesoría Legal" },
  { id: "campo", nombre: "Trabajo de Campo" },
  { id: "otro", nombre: "Otro" },
]

// Definir el esquema de validación con Zod
const formSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  apellido: z.string().min(1, { message: "El apellido es requerido" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  telefono: z
    .string()
    .min(1, { message: "El teléfono es requerido" })
    .regex(/^\d{8}$/, { message: "El teléfono debe tener 8 dígitos" }),
  area: z.string().min(1, { message: "Seleccione un área de interés" }),
  experiencia: z.string().min(1, { message: "La experiencia es requerida" }),
  educacion: z.string().min(1, { message: "La educación es requerida" }),
  mensaje: z.string().optional(),
})

// Tipo inferido del esquema
type FormValues = z.infer<typeof formSchema>

export function EmpleoForm() {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Inicializar React Hook Form con Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      area: "",
      experiencia: "",
      educacion: "",
      mensaje: "",
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validar tamaño del archivo (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        setCvError("El archivo no debe superar los 5MB")
        setCvFile(null)
        return
      }

      // Validar tipo de archivo
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      if (!validTypes.includes(file.type)) {
        setCvError("Formato no válido. Use PDF, DOC o DOCX")
        setCvFile(null)
        return
      }

      setCvFile(file)
      setCvError(null)
    }
  }

  const onSubmit = async (data: FormValues) => {
    // Validar que se haya subido un CV
    if (!cvFile) {
      setCvError("El CV es requerido")
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Simulación de envío de formulario
      // En una implementación real, aquí se enviarían los datos y el archivo al servidor
      console.log("Datos del formulario:", data)
      console.log("Archivo CV:", cvFile)

      // Simular tiempo de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Marcar como enviado exitosamente
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      setSubmitError("Ocurrió un error al enviar el formulario. Intente nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    form.reset()
    setCvFile(null)
    setCvError(null)
    setIsSubmitted(false)
    setSubmitError(null)
  }

  if (isSubmitted) {
    return (
      <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50">
        <CardContent className="p-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 px-6 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-blue-800">¡Solicitud Enviada con Éxito!</h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Gracias por su interés en formar parte del Instituto Nacional de Estadística. Hemos recibido su solicitud
              y la revisaremos a la brevedad.
            </p>
            <p className="text-gray-600 mb-8">
              Si su perfil coincide con nuestras necesidades actuales, nos pondremos en contacto con usted.
            </p>
            <Button
              onClick={resetForm}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-200 hover:shadow-md"
            >
              Enviar otra solicitud
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-white to-blue-50">
      <CardHeader className="bg-blue-600 text-white pb-6">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          Formulario de Solicitud de Empleo
        </CardTitle>
        <CardDescription className="text-blue-100 mt-2">
          Complete el formulario para aplicar a nuestras oportunidades laborales
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nombre <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Ingrese su nombre"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="apellido"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Apellido <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="Ingrese su apellido"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Correo Electrónico <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="ejemplo@correo.com"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="telefono"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Teléfono <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="12345678"
                        className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-xs">
                      Ingrese 8 dígitos sin espacios ni guiones
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Área de Interés <span className="text-red-500">*</span>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 h-10">
                        <SelectValue placeholder="Seleccione un área" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areas.map((area) => (
                        <SelectItem key={area.id} value={area.id}>
                          {area.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experiencia"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    Experiencia Laboral <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describa brevemente su experiencia laboral relevante"
                      className="min-h-[120px] rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="educacion"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    Educación <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describa su formación académica"
                      className="min-h-[120px] rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <Label htmlFor="cv" className="text-blue-700 font-medium flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Curriculum Vitae (CV) <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="cv"
                  className={`flex items-center gap-2 px-4 py-3 border rounded-md cursor-pointer hover:bg-blue-50 transition-all duration-200 ${
                    cvError ? "border-red-500 bg-red-50" : "border-gray-300"
                  }`}
                >
                  <Upload className={`h-5 w-5 ${cvError ? "text-red-500" : "text-blue-500"}`} />
                  <span className={cvError ? "text-red-500" : ""}>{cvFile ? cvFile.name : "Seleccionar archivo"}</span>
                </Label>
                <Input id="cv" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
              </div>
              {cvError && <p className="text-red-500 text-sm">{cvError}</p>}
              <p className="text-gray-500 text-xs">Formatos aceptados: PDF, DOC, DOCX. Tamaño máximo: 5MB</p>
            </div>

            <FormField
              control={form.control}
              name="mensaje"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-blue-700 font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Mensaje o Carta de Presentación (opcional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Incluya información adicional que considere relevante"
                      className="min-h-[120px] rounded-md border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 p-4 rounded-md border border-red-200"
              >
                <p className="text-red-600">{submitError}</p>
              </motion.div>
            )}

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full transition-all duration-200 hover:shadow-md min-w-[180px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...
                  </>
                ) : (
                  "Enviar Solicitud"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

