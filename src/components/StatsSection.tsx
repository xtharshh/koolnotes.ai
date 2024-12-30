"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { number: "50K+", label: "Study Notes Shared" },
    { number: "10K+", label: "Active Students" },
    { number: "95%", label: "Student Satisfaction" }
  ]

  return (
    <div 
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 py-12 "
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="text-center"
        >
          <div className="text-5xl font-bold text-cream-950 dark:text-cream-50">{stat.number}</div>
          <div className="text-cream-800 dark:text-cream-200 mt-2 font-newLuck">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

