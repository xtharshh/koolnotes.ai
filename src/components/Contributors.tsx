'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ContributorCard } from '../components/ui/contributorPage/contributor-card'
import { contributors } from '../data/contributors'
import { AnimatedBackground } from '../components/ui/contributorPage/animated-background'

const SLIDE_DURATION = 5000 // 5 seconds

export default function ContributorsPage() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleSlideComplete = useCallback(() => {
    setCurrentIndex((prev) => (prev === contributors.length - 1 ? 0 : prev + 1))
  }, [])

  return (
    <>
      <AnimatedBackground />

      <div className="min-h-screen pt-24 px-4 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2">
            Our Contributors
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Meet the amazing people who make our project possible through their
            dedication and expertise.
          </p>
        </motion.div>

        <div className="relative min-h-[800px] mb-8 mt-24 md:mt-0" id='contributors'>
          {contributors.map((contributor, index) => (
            <div
              key={contributor.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: index === currentIndex ? 1 : 0 }}
            >
              <ContributorCard
                contributor={contributor}
                isActive={index === currentIndex}
                onSlideComplete={handleSlideComplete}
                totalTime={SLIDE_DURATION}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

