// app/layout.tsx

"use client"; // Marking this file as a client component

// globals.css includes @tailwind directives
// adjust the path if necessary
import Navbar from "../components/Navbar";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "../components/Footer";
import React from 'react';
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body className={inter.className}>
    <Providers>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system" 
        enableSystem 
        disableTransitionOnChange
      >
        <Navbar/>
        {children}
        <Footer/>
        <Toaster />
      </ThemeProvider>
    </Providers>
  </body>
</html>
  )
}
