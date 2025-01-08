'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Instagram, Linkedin, Github } from 'lucide-react'
import { contributors, Contributor } from '@/data/contributors'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AutoScrollContributorPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const currentContributor: Contributor = contributors[currentIndex]

  const goToPrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? contributors.length - 1 : prevIndex - 1
    )
  }, [])

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => 
      prevIndex === contributors.length - 1 ? 0 : prevIndex + 1
    )
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      goToNext()
    }, 5000) // Auto-advance every 5 seconds
    return () => clearInterval(timer)
  }, [goToNext])

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      }
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-4xl overflow-hidden shadow-2xl relative">
        <CardContent className="p-0">
          <div className="flex flex-col">
            <div className="dark:bg-black bg-customBeige dark:text-white text-black p-6">
              <motion.h2 
                key={`name-${currentIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold mb-2 text-center"
              >
                {currentContributor.name}
              </motion.h2>
              <motion.p 
                key={`department-${currentIndex}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-300 text-center"
              >
                {currentContributor.department}
              </motion.p>
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative overflow-hidden" style={{ height: '400px' }}>
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentContributor.photo}
                      alt={currentContributor.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out transform hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="w-full md:w-1/2 p-6 space-y-4">
                <motion.p 
                  key={`specialisation-${currentIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-600 dark:text-cream-100"
                >
                  Specialisation: {currentContributor.specialisation}
                </motion.p>
                <motion.p 
                  key={`review-${currentIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="italic text-gray-600 dark:text-cream-50"
                >
                  &quot;{currentContributor.review}&quot;
                </motion.p>
                <motion.div 
                  key={`social-${currentIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex space-x-4 mt-4"
                >
                  {currentContributor.socialLinks.instagram && (
                    <Button 
                      variant="outline" 
                      className="w-full md:w-auto hover:bg-cream-200 dark:hover:bg-cream-800 transition-all duration-300
                                transform hover:-translate-y-1 hover:shadow-lg"
                      style={{ backgroundColor: '#E1306C', color: '#FFFFFF' }}
                    >
                      <a href={currentContributor.socialLinks.instagram} className="w-full h-full flex items-center justify-center p-0 gap-1">
                        <Instagram className="h-6 w-6 text-white" />
                        Instagram
                      </a>
                    </Button>
                  )}
                  {currentContributor.socialLinks.linkedin && (
                    <Button 
                      variant="outline" 
                      className="w-full md:w-auto hover:bg-cream-200 dark:hover:bg-cream-800 transition-all duration-300
                                transform hover:-translate-y-1 hover:shadow-lg"
                      style={{ backgroundColor: 'blue', color: '#FFFFFF' }}
                    >
                      <a href={currentContributor.socialLinks.linkedin} className="w-full h-full flex items-center justify-center p-0 gap-1">
                        <Linkedin className="h-6 w-6 text-white" />
                        Linkedin
                      </a>
                    </Button>
                  )}
                  {currentContributor.socialLinks.github && (
                    <Button 
                      variant="outline" 
                      className="w-full md:w-auto border-2 border-cream-950 text-cream-950 dark:border-cream-50 dark:text-cream-50 
                                hover:bg-cream-200 dark:hover:bg-cream-800 transition-all duration-300
                                transform hover:-translate-y-1 hover:shadow-lg"
                      style={{ backgroundColor: 'black', color: '#FFFFFF' }}
                    >
                      <a href={currentContributor.socialLinks.github} className="w-full h-full flex items-center justify-center p-0 gap-1">
                        <Github className="h-6 w-6 text-white" />
                        Github
                      </a>
                    </Button>
                  )}
                </motion.div>
                <div className="flex justify-between items-center mt-4">
                  <Button onClick={goToPrevious} variant="outline" className="flex items-center transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:text-gray-800">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button onClick={goToNext} variant="outline" className="flex items-center transition-all duration-200 ease-in-out hover:bg-gray-100 dark:hover:text-gray-800">
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
