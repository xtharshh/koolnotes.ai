'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { SocialLinks } from './social-links'
import { Contributor } from '../../../types/conributors'


interface ContributorCardProps {
  contributor: Contributor
  isActive: boolean
  onSlideComplete: () => void
  totalTime: number
}

// Removed local Contributor interface declaration


export function ContributorCard({ 
  contributor, 
  isActive, 
  onSlideComplete,
  totalTime 
}: ContributorCardProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isActive) {
      setProgress(0)
      return
    }

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = (elapsed / totalTime) * 100

      if (newProgress >= 100) {
        setProgress(100)
        onSlideComplete()
        clearInterval(interval)
      } else {
        setProgress(newProgress)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [isActive, onSlideComplete, totalTime])

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -top-2 inset-x-8 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="relative flex flex-col md:flex-row gap-8 p-8 bg-card rounded-3xl shadow-neomorphic">
              <div className="relative w-full md:w-96 h-96 shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-muted shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1)]" />
                <Image
                  src={contributor.photo}
                  alt={contributor.name}
                  width={400}
                  height={400}
                  className="relative rounded-2xl object-cover w-full h-full"
                />
              </div>

              <div className="flex flex-col gap-6 flex-1">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-4xl font-bold text-foreground">
                    {contributor.name}
                  </h2>
                  <div className="flex gap-2 mt-2">
                  
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {contributor.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-muted">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Projects
                      </h3>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {contributor.projects}+
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-muted">
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Experience
                      </h3>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {contributor.experience}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto"
                >
                  <SocialLinks links={contributor.socialLinks} />
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

