"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, BarChart3, Briefcase } from "lucide-react"
import CountUp from "react-countup"

interface StatCardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  description: string
  date: string
  icon: React.ReactNode
  delay?: number
}

const StatCard = ({ title, value, suffix, prefix, description, date, icon, delay = 0 }: StatCardProps) => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay }}>
      <Card className="overflow-hidden h-full">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <div className="p-2 rounded-full bg-blue-50 text-blue-600">{icon}</div>
          </div>

          <div className="text-3xl font-bold text-blue-800 mb-1">
            {prefix}
            <CountUp
              end={value}
              duration={2.5}
              decimals={
                title.includes("Inflación") || title.includes("Desocupación") || title.includes("Producto") ? 2 : 0
              }
              decimal="."
              separator=","
              delay={0.5 + delay}
            />
            {suffix}
          </div>

          <p className="text-sm text-gray-500 mb-4">{description}</p>

          <div className="pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400 text-center">{date}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function StatCards() {
  const stats = [
    {
      title: "Población",
      value: 17109746,
      suffix: "",
      description: "personas",
      date: "2023",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Producto Interno Bruto",
      value: 3.2,
      suffix: "%",
      description: "crecimiento anual",
      date: "4º trimestre 2023",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      title: "Inflación",
      value: 3.77,
      suffix: "%",
      description: "anual",
      date: "Marzo 2024",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Tasa de Desocupación",
      value: 2.6,
      suffix: "%",
      description: "de la Población Económicamente Activa",
      date: "Enero 2024",
      icon: <Briefcase className="h-5 w-5" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} delay={index * 0.1} />
      ))}
    </div>
  )
}

