"use client"

import { Button } from "../components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { TypeAnimation } from 'react-type-animation'

export function Introduction() {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between px-4 py-12 md:py-32 gap-8">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl space-y-6 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-cream-950 dark:text-cream-50">
          <TypeAnimation
            sequence={[
              'Study Notes You Can Count On,',
              1000,
              'Study Notes You Can Count On, Start to Finish.',
            ]}
            wrapper="span"
            speed={50}
            repeat={0}
          />
        </h1>
        <p className="text-lg text-cream-800 dark:text-cream-200">
          We provide a platform for students to share and access quality study notes. With a commitment to
          academic excellence, we ensure your study materials are reliable, organized, and easily accessible.
        </p>
        <div className="flex gap-4 flex-col-reverse md:flex-row md:gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              className="bg-cream-950 text-cream-50 dark:bg-cream-50 dark:text-cream-950 
                         hover:bg-cream-800 dark:hover:bg-cream-200 transition-all duration-300
                         button-glow transform hover:-translate-y-1 "
            >
              Upload Notes
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              className="border-2 border-cream-950 text-cream-950 dark:border-cream-50 dark:text-cream-50 
                         hover:bg-cream-200 dark:hover:bg-cream-800 transition-all duration-300
                         transform hover:-translate-y-1 hover:shadow-lg"
            >
              Browse Notes
            </Button>
          </motion.div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 md:mt-0"
      >
        <Image
          src="/placeholder.svj.png"
          alt="3D cartoon of a smiling boy holding books"
          width={500}
          height={500}
          className="max-w-[300px] md:max-w-md mx-auto object-contain"
          priority
        />
      </motion.div>
    </div>
  )
}
