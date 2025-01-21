'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface SlideshowControlsProps {
  onPrevious: () => void
  onNext: () => void
  currentIndex: number
  totalSlides: number
}

export function SlideshowControls({
  onPrevious,
  onNext,
  currentIndex,
  totalSlides
}: SlideshowControlsProps) {
  return (
    <div className="flex items-center justify-center gap-8 mt-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevious}
        className="p-3 rounded-2xl bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.12),-3px_-3px_8px_rgba(255,255,255,0.9)] transition-shadow"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </motion.button>
      <div className="flex gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="p-3 rounded-2xl bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.1),-2px_-2px_6px_rgba(255,255,255,0.8)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.12),-3px_-3px_8px_rgba(255,255,255,0.9)] transition-shadow"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </motion.button>
    </div>
  )
}

