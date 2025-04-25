"use client";
import React, { useState, useEffect } from "react";
import { Moon, Sun, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const ThemeToggle: React.FC = React.memo(function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [currentIcon, setCurrentIcon] = useState<React.ReactNode>(<Settings />);

  // Set the icon based on the current theme
  useEffect(() => {
    if (theme === "light") {
      setCurrentIcon(<Sun className="h-[1.2rem] w-[1.2rem] text-black" />);
    } else if (theme === "dark") {
      setCurrentIcon(<Moon className="h-[1.2rem] w-[1.2rem] text-white" />);
    } else {
      setCurrentIcon(<Settings className="h-[1.2rem] w-[1.2rem] text-gray-500" />);
    }
  }, [theme]);

  const toggleExpanded = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <motion.div
      className="relative flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-xl transition-all"
        onClick={toggleExpanded}
      >
        {currentIcon}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Expanded Options Positioned Just to the Left */}
      {expanded && (
        <motion.div
          className="absolute right-[calc(100%+1rem)] flex items-center gap-2"
          initial={{ x: 20, opacity: 0 }} // Animate from the right
          animate={{ x: 0, opacity: 1 }} // Final position
          exit={{ x: 20, opacity: 0 }} // Exit animation
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Light Mode Button */}
          {theme !== "light" && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              onClick={() => {
                setTheme("light");
                setExpanded(false);
              }}
            >
              <Sun className="h-6 w-6 text-black dark:text-white" />
              <span className="sr-only">Light Mode</span>
            </Button>
          )}

          {/* Dark Mode Button */}
          {theme !== "dark" && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              onClick={() => {
                setTheme("dark");
                setExpanded(false);
              }}
            >
              <Moon className="h-6 w-6 text-black dark:text-white" />
              <span className="sr-only">Dark Mode</span>
            </Button>
          )}

          {/* System Mode Button */}
          {theme !== "system" && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              onClick={() => {
                setTheme("system");
                setExpanded(false);
              }}
            >
              <Settings className="h-6 w-6 text-black dark:text-white" />
              <span className="sr-only">System Mode</span>
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});

export default ThemeToggle;