
'use client'

import { motion } from 'framer-motion'
import { Twitter, Linkedin, Github, Globe } from 'lucide-react'


interface Contributor {
  socialLinks: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

interface SocialLinksProps {
  links: Contributor['socialLinks']
}

export function SocialLinks({ links }: SocialLinksProps) {
  const iconVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.1 }
  }

  return (
    <div className="flex gap-4">
      {links.twitter && (
        <motion.a
          href={links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-2 rounded-xl bg-white shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_0px_12px_rgba(0,0,0,0.15)] transition-shadow"
        >
          <Twitter className="w-5 h-5 text-sky-500" />
        </motion.a>
      )}
      {links.linkedin && (
        <motion.a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-2 rounded-xl bg-white shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_0px_12px_rgba(0,0,0,0.15)] transition-shadow"
        >
          <Linkedin className="w-5 h-5 text-blue-600" />
        </motion.a>
      )}
      {links.github && (
        <motion.a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-2 rounded-xl bg-white shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_0px_12px_rgba(0,0,0,0.15)] transition-shadow"
        >
          <Github className="w-5 h-5 text-gray-800" />
        </motion.a>
      )}
      {links.website && (
        <motion.a
          href={links.website}
          target="_blank"
          rel="noopener noreferrer"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
          className="p-2 rounded-xl bg-white shadow-[inset_0px_0px_8px_rgba(0,0,0,0.1)] hover:shadow-[inset_0px_0px_12px_rgba(0,0,0,0.15)] transition-shadow"
        >
          <Globe className="w-5 h-5 text-emerald-600" />
        </motion.a>
      )}
    </div>
  )
}

