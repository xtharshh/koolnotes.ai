"use client"

import Link from "next/link"
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for menu
import { motion } from "framer-motion"

import  ThemeToggle  from "../components/ThemeToggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 px-4 py-3 backdrop-blur-md bg-cream-100/75 font-newLuck
      dark:bg-cream-950/75 border-b border-cream-200 dark:border-cream-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg
            className="h-8 w-8 text-cream-950 dark:text-cream-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <span className="text-xl font-bold text-cream-950 dark:text-cream-50">KoolNotes</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-cream-950 dark:text-cream-50">
          <Link className="hover:text-cream-800 dark:hover:text-cream-200" href="#select-college-section">
            Colleges
          </Link>
          <Link className="hover:text-cream-800 dark:hover:text-cream-200" href="#aboutus">
            About Us
          </Link>
          <Link className="hover:text-cream-800 dark:hover:text-cream-200" href="#reviews">
            Reviews
          </Link>
          <Link className="hover:text-cream-800 dark:hover:text-cream-200" href="#contactus">
            Contacts
          </Link>
          <Link className="hover:text-cream-800 dark:hover:text-cream-200" href="#contributers">
            Contributors
          </Link>
        </div>
        <div className="flex items-center gap-4">
        <ThemeToggle /> {/* Add the ThemeToggle component here */}
        <div className="custom-md:hidden  ">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes color='text-black dark:text-white' size={24} /> : <FaBars color='text-black dark:text-white' size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-customBeige font-newLuck
         flex flex-col items-center custom-md:hidden hover:text-gray-400 dark:hover:bg-gray-700 border border-gray-400 rounded-xl backdrop-blur-5xl bg-white dark:bg-black text-black dark:text-white">
          <a href="#select-college-section" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Colleges</a>
          <a href="#aboutus" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">About</a>
          <a href="#reviews" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Reviews</a>
          <a href="#contactus" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Contact</a>
          <a href="#contributers" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Contributers</a>
        </div>
      )}
        </div>
      
    </motion.nav>
  )
}



// import './Navbar.css'; // Importing the CSS file

