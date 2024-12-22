// app/layout.tsx

"use client"; // Marking this file as a client component

// globals.css includes @tailwind directives
// adjust the path if necessary
import Navbar from "../components/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "../components/Footer";
import React, { useState } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light'); // State to manage theme

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <html lang="en" className={theme}>
        <body style={{ backgroundColor: theme === 'light' ? 'white' : 'black', color: theme === 'light' ? 'black' : 'white' }}>
          <Providers>
            <Navbar theme={theme} setTheme={toggleTheme} /> {/* Pass the toggleTheme function */}
            {children}
            <Footer />
          </Providers>
        </body>
      </html>
    </>
  );
}
