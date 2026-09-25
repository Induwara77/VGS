"use client";

import React, { useState } from "react";
import { outrun } from "../fonts";
import Image from "next/image";
import Link from "next/link"; // Make sure Link is imported for Next.js internal routes

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <footer className="w-full bg-[var(--vgs-canvas)] px-3 sm:px-8 overflow-hidden">
      <div className="w-full bg-[var(--vgs-blue)] text-white py-10 px-6 sm:px-10 md:px-16 rounded-t-[35px] sm:rounded-t-[55px] relative">
        
        {/* TOP: Newsletter Mailbox Banner */}
        <div className="bg-[var(--vgs-canvas)] rounded-[30px] p-6 sm:p-10 mb-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          <div className="flex items-center gap-6">
            <div>
              <h3 className={`${outrun.className} text-2xl sm:text-4xl uppercase tracking-wide text-[var(--vgs-blue)]`}>
                Subscribe to our newsletter
              </h3>
              <p className="font-sans text-md text-[var(--vgs-ink)] mt-0">
                Get the latest updates, engineering insights, and tech trends.
              </p>
            </div>
          </div>

          {isSubmitted ? (
            <div className="font-sans text-sm font-semibold bg-white text-[var(--vgs-blue)] px-6 py-3.5 rounded-xl shadow-md">
              Thanks for subscribing! 🎉
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                required
                className="bg-white/90 border border-black/10 rounded-xl px-5 py-3.5 text-sm text-[var(--vgs-ink)] placeholder-black/40 focus:outline-none focus:bg-white transition-all min-w-[340px]"
              />
              <button 
                type="submit"
                className="bg-[var(--vgs-blue)] text-[var(--vgs-canvas)] font-bold px-7 py-3.5 rounded-xl text-sm transition-transform hover:scale-105 uppercase tracking-wider cursor-pointer shadow-md"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

        {/* MIDDLE: Multi-column Links & Brand info */}
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/20">
          
          {/* Brand Info (takes 2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <Image 
                src="/images/Vendora.png" 
                alt="VGS Solutions Logo" 
                width={300} 
                height={120} 
                className="h-20 sm:h-60 w-auto mt-[-80px] mb-[-50px]"
              />
            </div>
            <p className="font-sans text-sm text-white/80 max-w-sm leading-relaxed">
              VGS is a digital platform where innovators, professionals, and enthusiasts come together to share knowledge, collaborate, and grow.
            </p>
            {/* Social Links with Real Icons */}
            <div className="flex gap-3 pt-2">
              
              {/* Facebook */}
              {/* TODO: Paste your Facebook link below inside href */}
              <a 
                href="https://www.facebook.com/share/1D24dJXBt7/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[var(--vgs-blue)] hover:border-transparent transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
                </svg>
              </a>

              {/* Instagram */}
              {/* TODO: Paste your Instagram link below inside href */}
              <a 
                href="https://www.instagram.com/vendoraglobalsolutions?stkn=ZDZyYjUyang0ejB6&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[var(--vgs-blue)] hover:border-transparent transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              {/* TODO: Paste your LinkedIn link below inside href */}
              <a 
                href="https://www.linkedin.com/company/vendora-global-solutions/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[var(--vgs-blue)] hover:border-transparent transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* Column 1: Company */}
          <div className="space-y-3 font-sans">
            <h4 className="font-sans text-md uppercase tracking-widest text-white/60 font-bold">Company</h4>
            <ul className="space-y-2.5 text-md text-white/90">
              <li><Link href="/about" className="hover:text-white transition-colors">About us</Link></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="/about#testimonials" className="hover:text-white transition-colors">Testimonial</a></li>
            </ul>
          </div>

          {/* Column 2: Developers */}
          <div className="space-y-3 font-sans">
            <h4 className="font-sans text-md uppercase tracking-widest text-white/60 font-bold">Developers</h4>
            <ul className="space-y-2.5 text-md text-white/90">
              <li><a href="#" className="hover:text-white transition-colors">Web Technologies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Learn Web Dev</a></li>
              <li><a href="#" className="hover:text-white transition-colors">VGS Plus</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hacks Blog</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3 font-sans">
            <h4 className="font-sans text-md uppercase tracking-widest text-white/60 font-bold">Contact</h4>
            <ul className="space-y-2.5 text-md text-white/90">
              <li className="flex items-center gap-2">
                <span>📞</span> +77 72 727 727
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> vendoraglobalsolutions@gmail.com
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM: Copyright & Legal */}
        <div className="max-w-[1300px] mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-sans text-xs text-white/70">
          <div>
            © {new Date().getFullYear()} VGS Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Site Map</a>
          </div>
        </div>

      </div>
    </footer>
  );
}