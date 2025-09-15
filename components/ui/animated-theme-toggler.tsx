"use client";

import { Moon, SunDim } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";

type props = {
  className?: string;
  useDefaultStyling?: boolean;
};

export const AnimatedThemeToggler = ({ className, useDefaultStyling = true }: props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  // Initialize theme state on mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);
  
  const changeTheme = async () => {
    if (!buttonRef.current) return;

    // Check if View Transitions API is supported
    if ('startViewTransition' in document && typeof document.startViewTransition === 'function') {
      try {
        await document.startViewTransition(() => {
          flushSync(() => {
            const dark = document.documentElement.classList.toggle("dark");
            setIsDarkMode(dark);
          });
        }).ready;

        const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
        const y = top + height / 2;
        const x = left + width / 2;

        const right = window.innerWidth - left;
        const bottom = window.innerHeight - top;
        const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRad}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      } catch (error) {
        // Fallback for View Transitions API errors
        console.warn('View Transitions API failed, using fallback:', error);
        const dark = document.documentElement.classList.toggle("dark");
        setIsDarkMode(dark);
      }
    } else {
      // Fallback for browsers without View Transitions API support
      const dark = document.documentElement.classList.toggle("dark");
      setIsDarkMode(dark);
    }
  };

  return (
    <button 
      ref={buttonRef} 
      onClick={changeTheme} 
      className={cn(
        useDefaultStyling && "p-3 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 shadow-lg hover:shadow-xl",
        !useDefaultStyling && "flex items-center justify-center",
        className
      )}
    >
      {isDarkMode ? <SunDim size={useDefaultStyling ? 24 : 16} /> : <Moon size={useDefaultStyling ? 24 : 16} />}
    </button>
  );
};