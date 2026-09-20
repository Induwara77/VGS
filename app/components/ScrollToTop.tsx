'use client'; 

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showScrollTop) return null;

  return (
    <a 
      href="#home"
      aria-label="Go to top"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 bg-[var(--vgs-blue)] text-white rounded-none shadow-xl transition-all duration-300 hover:scale-110 focus:outline-none"
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </a>
  );
}