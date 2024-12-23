"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for menu
import './Navbar.css'; // Importing the CSS file

// Define the Props interface
interface Props {
  theme: string;
  setTheme: (theme: string) => void;
}

// Correctly use the Props interface for the Header component
export default function Navbar({ theme, setTheme }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav 
      className="navbar "
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="logo">APEX</div>
        <div className="hidden custom-md:flex space-x-4 nav-links">
          <a href="#select-college-section" className="hover:text-yellow-500">Colleges</a>
          <a href="#about" className="hover:text-yellow-500">About</a>
          <a href="#reviews" className="hover:text-yellow-500">Reviews</a>     
          <a href="#contact" className="hover:text-yellow-500">Contact</a>
          <a href="#contributers" className="hover:text-yellow-500">Contributers</a>
        </div>
        <div className="theme-toggle ">
          <span className="theme-icon">🌙</span>
          <label className="switch rounded-2xl bg-white">
            <input
              type="checkbox"
              checked={theme === 'light'}
              onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              
            />
            <span className="slider round"></span>
          </label>
          <span className="theme-icon">☀️</span>
        </div>
        <div className="custom-md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-14 left-0 w-full dark:bg-black bg-customBeige flex flex-col items-center custom-md:hidden border border-gray-400 rounded-xl backdrop-blur-5xl">
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
