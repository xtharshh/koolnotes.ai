"use client"

import React from "react"
import { motion } from "framer-motion"
import { School } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface CollegeProps {
  colleges: { _id: string; name: string }[];
  selectedCollegeIndex: number | null;
  handleCollegeClick: (value: string) => void;  // Updated type
}

const College: React.FC<CollegeProps> = React.memo(function College({
  colleges = [],
  selectedCollegeIndex = null,
  handleCollegeClick,
}) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className="text-center max-w-4xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-12" variants={itemVariants}>
        {/* <motion.p 
          className="text-primary font-bold font-newMono text-4xl py-10"
          variants={itemVariants}
        >
          <span className="p-2">Discover the amazing features we offer to enhance your study.</span>
        </motion.p> */}

        <div className="flex items-center justify-center gap-3 mb-6 pt-24">
          <School className="h-8 w-8 text-purple-600 dark:text-red-200" />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white font-newLuck">SELECT YOUR COLLEGE</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 items-center">
          <div className="bg-white dark:bg-black rounded-xl shadow-lg p-6 relative backdrop-blur-md hover:shadow-xl transition-shadow duration-300"> 
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Find Your Institution</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Select your college from the list below to get started with your academic resources.
            </p>

            <div className="relative">
              <Select
                value={selectedCollegeIndex?.toString() || ""}
                onValueChange={handleCollegeClick}
              >
                <SelectTrigger className="w-full h-12 text-left border-2 border-purple-200 dark:border-purple-900 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-md bg-white/80 dark:bg-gray-800/80">
                  <SelectValue placeholder="Select your college" />
                </SelectTrigger>
                <SelectContent className="max-h-80 backdrop-blur-md bg-white/90 dark:bg-gray-800/90">
                  {Array.isArray(colleges) && colleges.map((college, index) => (
                    <SelectItem key={college._id} value={index.toString()}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {Array.isArray(colleges) ? colleges.length : 0} colleges available
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
})

export default College