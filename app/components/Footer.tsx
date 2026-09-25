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
                src="/images/Vendora Global Solutions with lines.png" 
                alt="VGS Solutions Logo" 
                width={300} 
                height={120} 
                className="h-20 sm:h-60 w-auto mt-[-80px] mb-[-50px]"
              />
            </div>
            <p className="font-sans text-sm text-white/80 max-w-sm leading-relaxed">
              VGS is a digital platform where innovators, professionals, and enthusiasts come together to share knowledge, collaborate, and grow.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {['FB', 'IG', 'TW', 'LI'].map((social, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-mono text-xs font-bold text-white hover:bg-white hover:text-[var(--vgs-blue)] hover:border-transparent transition-colors"
                >
                  {social}
                </a>
              ))}
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
              <li><Link href="/blog" className="hover:text-white transition-colors">Hacks Blog</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-3 font-sans">
            <h4 className="font-sans text-md uppercase tracking-widest text-white/60 font-bold">Contact</h4>
            <ul className="space-y-2.5 text-md text-white/90">
              <li className="flex items-center gap-2">
                <span>📞</span> +123 456 7890
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span> support@vgs.com
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