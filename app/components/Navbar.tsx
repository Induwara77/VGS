'use client';

import { useEffect, useRef, useState } from 'react';
import { outrun, meshedDisplay } from '../fonts';
import Image from 'next/image';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#about', label: 'About Us' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#blog', label: 'Blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Hide on scroll-down, show on scroll-up
      if (y > lastScrollY.current && y > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent pt-4'
      } ${
        hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6">
        
        {/* Left: Logo */}
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="flex items-center"
        >
          <Image
            src="/images/Vendora_Global_Solutions_WordMark_white background.png"
            alt="VGS Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </a>

        {/* Center: Pill Navigation */}
        <nav className="hidden items-center gap-2 rounded-full border border-[var(--vgs-cloud)]/30 bg-white/50 px-8 py-1.5 backdrop-blur-sm lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-sans rounded-full px-5 py-2 text-md text-[var(--vgs-ink)] transition-colors hover:text-[var(--vgs-blue)]"
            >
              <span className="relative inline-block">
                {link.label}
                {/* Animated underline */}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--vgs-blue)] transition-all duration-300 ease-out group-hover:w-2/3" />
              </span>
            </a>
          ))}
        </nav>

        {/* Right: Lang, Button & Mobile Toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 text-xs font-medium text-[var(--vgs-cloud)] lg:flex">
            <span className="cursor-pointer hover:text-[var(--vgs-ink)]">RU</span>
            <span>|</span>
            <span className="text-[var(--vgs-ink)]">EN</span>
          </div>

          <a
            href="#contact"
            className={`font-sans hidden items-center justify-center rounded-md bg-[var(--vgs-blue)] px-6 py-2.5 text-sm text-white transition-transform hover:scale-105 lg:flex`}
          >
            CONTACT US ↗
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="relative flex h-10 w-10 items-center justify-right text-[var(--vgs-ink)] focus:outline-none lg:hidden"
          >
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-200 ${
                menuOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-current transition-opacity duration-200 ${
                menuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-px w-5 bg-current transition-transform duration-200 ${
                menuOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Background Blur Overlay */}
      <div
        className={`fixed inset-0 top-16 -z-10 bg-[var(--vgs-cloud)]/20 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu (Light Mode Update) */}
      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        aria-hidden={!menuOpen}
        className={`overflow-hidden bg-[var(--vgs-blue)] text-[var(--vgs-canvas)] backdrop-blur-md transition-[max-height] duration-300 ease-in-out lg:hidden ${
          menuOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          
          {/* divide-y strictly puts borders ONLY between the items */}
          <div className="flex flex-col divide-y divide-[var(--vgs-canvas)]/20">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans py-4 text-md text-center text-[var(--vgs-canvas)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-sans mt-6 flex items-center justify-center rounded-md bg-white py-3 text-sm font-semibold text-[var(--vgs-blue)] transition-transform hover:scale-105"
          >
            CONTACT US ↗
          </a>
        </div>
      </nav>
    </header>
  );
}