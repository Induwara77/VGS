'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/about', label: 'About Us' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
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

  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setMenuOpen(false); // Close mobile menu if open
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      {/* Global Background Blur Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--vgs-canvas)]/20 backdrop-blur-md transition-opacity duration-300 min-[1121px]:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

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
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center"
          >
            <Image
              src="/images/wordmark.png"
              alt="VGS Logo"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
              priority
            />
          </a>

          {/* Center: Pill Navigation */}
          <nav className="hidden items-center gap-2 rounded-full border border-[var(--vgs-cloud)]/30 bg-white/50 px-8 py-1.5 backdrop-blur-sm min-[1121px]:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group font-sans rounded-full px-5 py-2 text-md text-[var(--vgs-ink)] transition-colors hover:text-[var(--vgs-blue)]"
              >
                <span className="relative inline-block">
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--vgs-blue)] transition-all duration-300 ease-out group-hover:w-2/3" />
                </span>
              </a>
            ))}
          </nav>

          {/* Right: Search Bar, Button & Mobile Toggle */}
          <div className="flex items-center gap-6">
            
            {/* Desktop Search Bar */}
            {/* <form onSubmit={handleSearchSubmit} className="hidden items-center relative min-[1121px]:flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-sans w-36 focus:w-48 transition-all duration-300 rounded-full border border-[var(--vgs-cloud)]/30 bg-white/60 px-4 py-1.5 text-xs text-[var(--vgs-ink)] placeholder-[var(--vgs-cloud)] focus:outline-none focus:border-[var(--vgs-blue)] backdrop-blur-sm"
              />
              <button 
                type="submit" 
                aria-label="Search"
                className="absolute right-3 text-[var(--vgs-cloud)] hover:text-[var(--vgs-ink)] flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </form> */}

            <a
              href="/about#contact-form"
              className="font-sans hidden items-center justify-center rounded-md bg-[var(--vgs-blue)] px-6 py-2.5 text-sm text-white transition-transform hover:scale-105 min-[1121px]:flex"
            >
              CONTACT US ↗
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="relative flex h-10 w-10 items-center justify-right text-[var(--vgs-ink)] focus:outline-none min-[1121px]:hidden"
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

        {/* Mobile Menu */}
        <nav
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`overflow-hidden bg-[var(--vgs-blue)] text-[var(--vgs-canvas)] backdrop-blur-md transition-[max-height] duration-300 ease-in-out min-[1121px]:hidden ${
            menuOpen ? 'max-h-[500px]' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col px-6 py-4">
            
            {/* Mobile Search Bar added back */}
            {/* <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center relative">
              <input
                type="text"
                placeholder="Search site..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-sans w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder-white/60 focus:outline-none focus:border-white"
              />
              <button type="submit" aria-label="Search" className="absolute right-3 text-white/70 hover:text-white flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </form> */}

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
              href="/about#contact-form"
              onClick={() => setMenuOpen(false)}
              className="font-sans mt-6 flex items-center justify-center rounded-md bg-white py-3 text-sm font-semibold text-[var(--vgs-blue)] transition-transform hover:scale-105"
            >
              CONTACT US ↗
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}