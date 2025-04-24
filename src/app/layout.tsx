import "./globals.css"
import { Providers } from "./providers"
import React from 'react'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "../components/ThemeProvider"
import { Toaster } from "../components/ui/toaster"
import { Metadata } from 'next'
import { AuthProvider } from "../components/AuthProvider"
import  Navbar from "../components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'KoolNotes',
  description: 'Your college notes marketplace',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AuthProvider>
              <Navbar />
              {children}
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
