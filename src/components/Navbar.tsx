"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing icons for menu
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  setShowContributors?: React.Dispatch<React.SetStateAction<boolean>>;
  handleNavigation?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ setShowContributors, handleNavigation: parentHandleNavigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = async (sectionId: string) => {
    setIsOpen(false);
    if (parentHandleNavigation) {
      parentHandleNavigation();
    }
    
    // If not on home page, redirect first
    if (pathname !== '/') {
      await router.push('/');
      // Wait for navigation to complete
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // If already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 px-4 py-3 backdrop-blur-md bg-background/95 border-b border-border"
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
        <div className="hidden md:flex items-center gap-6">
          <button 
            className="hover:text-cream-800 dark:hover:text-cream-200" 
            onClick={() => handleNavigation('select-college-section')}
          >
            Colleges
          </button>
          <button 
            className="hover:text-cream-800 dark:hover:text-cream-200"
            onClick={() => handleNavigation('aboutus')}
          >
            About Us
          </button>
          <button 
            className="hover:text-cream-800 dark:hover:text-cream-200"
            onClick={() => handleNavigation('reviews')}
          >
            Reviews
          </button>
          <button 
            className="hover:text-cream-800 dark:hover:text-cream-200"
            onClick={() => handleNavigation('contactus')}
          >
            Contact
          </button>
          {session && (
            <button
              className="hover:text-cream-800 dark:hover:text-cream-200"
              onClick={() => router.push('/dashboard')}
            >
              Dashboard
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle /> {/* Add the ThemeToggle component here */}
          <div className="custom-md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none pt-2">
              {isOpen ? <FaTimes color='text-black dark:text-white' size={26} /> : <FaBars color='text-black dark:text-white' size={26} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="absolute top-14 left-0 w-full 
            flex flex-col items-center custom-md:hidden 
            bg-background/95 backdrop-blur-md border border-border 
            rounded-b-lg shadow-lg">
            <button className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white" onClick={() => handleNavigation('select-college-section')}>Colleges</button>
            <button className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white" onClick={() => handleNavigation('aboutus')}>About</button>
            <button className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white" onClick={() => handleNavigation('reviews')}>Reviews</button>
            <button className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white" onClick={() => handleNavigation('contactus')}>Contact</button>
            {session && (
              <button 
                className="py-2 w-full text-center dark:hover:bg-gray-700 hover:bg-white" 
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </button>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
