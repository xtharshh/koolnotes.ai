"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes"
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

export function ThemeProvider({ children, ...props }: { children: React.ReactNode } & ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const muiTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#1a1a1a' : '#ffffff',
        paper: darkMode ? '#1a1a1a' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#ffffff' : '#000000',
      },
    },
  });

  return (
    <NextThemesProvider {...props}>
      <MuiThemeProvider theme={muiTheme}>
        {children}
      </MuiThemeProvider>
    </NextThemesProvider>
  );
}

