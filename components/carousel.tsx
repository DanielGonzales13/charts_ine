"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

interface CarouselProps {
  items: {
    title: string
    description: string
    image: string
    link?: string
  }[]
  autoPlay?: boolean
  interval?: number
}

export function Carousel({ items, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  useEffect(() => {
    if (!autoPlay || isHovering) return

    const timer = setInterval(() => {
      nextSlide()
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, isHovering])

  return (
    <div
      className="relative overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out h-[300px] md:h-[400px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="min-w-full h-full relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }}>
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 text-white">
              <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">{item.title}</h2>
              <p className="text-sm md:text-base mb-2 md:mb-4 line-clamp-2 md:line-clamp-3">{item.description}</p>
              {item.link && (
                <a
                  href={item.link}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 md:py-2 md:px-4 rounded-md transition-colors w-fit text-sm md:text-base"
                >
                  Más información
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Controles de navegación - ocultos en móvil */}
      {!isMobile && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 hidden md:flex"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 hidden md:flex"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/80",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

