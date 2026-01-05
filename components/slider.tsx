"use client"

import { useState } from "react"
import GitHubContributions from "./github-contributions"
import FitnessStats from "./fitness-stats"

interface Slide {
  id: string
  component: React.ReactNode
}

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: Slide[] = [
    {
        id: "github",
        component: <GitHubContributions />
    },
    {
      id: "fitness",
      component: <FitnessStats />
    }

  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="rounded-2xl relative min-h-[400px] flex items-center justify-center">
      {/* Slide Content */}
      <div className="w-full transition-opacity duration-500 ease-in-out">
        {slides[currentSlide].component}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-[-20px] lg:left-[-60px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center transition-all text-white/50 hover:text-white"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-[-20px] lg:right-[-60px] top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md flex items-center justify-center transition-all text-white/50 hover:text-white"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" suppressHydrationWarning>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/20'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
 