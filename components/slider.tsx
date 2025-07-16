"use client"

import { useState } from "react"
import GitHubContributions from "./github-contributions"

interface Slide {
  id: string
  component: React.ReactNode
}

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides: Slide[] = [
    {
        id: "github",
        component: (
          <div className="w-full text-center">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">I like coding</h3>
            <div className="mb-6">
              <p className="text-gray-700 text-sm leading-relaxed">
                I love python, and I'm getting better at Go.
              </p>
            </div>
            <GitHubContributions />
          </div>
        )
    },
    {
      id: "fitness",
      component: <GitHubContributions isSliderMode={true} />
    }

  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="bg-gray-50 rounded-2xl p-8 relative min-h-[400px] flex items-center justify-center">
      {/* Slide Content */}
      <div className="w-full">
        {slides[currentSlide].component}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:shadow-lg transition-shadow"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-gray-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
} 