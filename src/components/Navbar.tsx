"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for menu
import './Navbar.css'; // Importing the CSS file
import { ThemeToggle } from './ThemeToggle'; // Import the ThemeToggle component

// Correctly use the Props interface for the Navbar component
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="logo font-newLuck font-bold  text-black dark:text-white">CollegED</div>
        <div className="hidden custom-md:flex space-x-4 nav-links text-white">
          <a href="#select-college-section" className="hover:text-yellow-500 font-newLuck">Colleges</a>
          <a href="#about" className=" font-newLuck">About</a>
          <a href="#reviews" className=" font-newLuck">Reviews</a>     
          <a href="#contact" className="font-newLuck">Contact</a>
          <a href="#contributers" className=" font-newLuck">Contributers</a>
        </div>
        <ThemeToggle /> {/* Add the ThemeToggle component here */}
        <div className="custom-md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes color='white' size={24} /> : <FaBars color='white' size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-14 left-0 w-full bg-customBeige font-new flex flex-col items-center custom-md:hidden 
        border border-gray-400 rounded-xl backdrop-blur-5xl bg-white dark:bg-black text-black dark:text-white">
          <a href="#select-college-section" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Colleges</a>
          <a href="#about" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">About</a>
          <a href="#reviews" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Reviews</a>
          <a href="#contact" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Contact</a>
          <a href="#contributers" className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white">Contributers</a>
        </div>
      )}
    </motion.nav>
  );
}
