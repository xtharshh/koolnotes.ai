"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for menu
import './Navbar.css'; // Importing the CSS file
import  ThemeToggle  from './ThemeToggle'; // Import the ThemeToggle component

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
      <div className="flex items-center justify-between w-full text-black dark:text-white">
        <div className="logo font-newLuck font-bold  text-black dark:text-white">KoolNotes</div>
        <div className="hidden custom-md:flex space-x-4 nav-links text-black dark:text-white font-newLuck font-semibold ">
          <a href="#select-college-section" className="">Colleges</a>
          <a href="#aboutus" className="">About</a>
          <a href="#reviews" className="">Reviews</a>     
          <a href="#contactus" className="">Contact</a>
          <a href="#contributers" className="">Contributers</a>
        </div>
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
    </motion.nav>
  );
}
