"use client"; // Marking this file as a client component


import "./globals.css";
import { Providers } from "./providers";

import React from 'react';
import { Inter } from 'next/font/google'
import { ThemeProvider } from "../components/ThemeProvider"
import { Toaster } from "../components/ui/toaster"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>KoolNotes</title>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className={inter.className}>

        <Providers>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem 
            disableTransitionOnChange
          >
          
            {children}
            
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
