"use client"

import React from 'react';
import './Navbar.css';

import { motion } from 'framer-motion';

// Define the Props interface
interface Props {
    theme: string;
    setTheme: (theme: string) => void; // Correct type for setTheme
}
//it means setTheme->theme ko accept karega aur void result dega at the end


// Correctly use the Props interface for the Header component
export default function Navbar({ theme, setTheme }: Props) {
  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 10 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo">APEX</div>
      <ul className="nav-links">
        <li><a href="colleges">Colleges</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#reviews">Reviews</a></li>     
        <li><a href="#contact">Contact</a></li>
        <li><a href="#contributers">Contributers</a></li>
      </ul>
      <div className="theme-toggle">
        <span className="theme-icon">🌙</span>
        <label className="switch dark:bg-gray-300 rounded-2xl bg-gray-600">
          <input
            type="checkbox"
            checked={theme === 'light'}
            onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
          <span className="slider round"></span>
        </label>
        <span className="theme-icon">☀️</span>
      </div>
    </motion.nav>
  );
}
