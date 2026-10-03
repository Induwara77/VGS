import type { Metadata } from "next";
import { outrun, meshedDisplay } from "./fonts";
import Scene from "./components/Scene";
import Counter from './components/Counter';
import ServicesSection from "./components/ServicesSection";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; 
import Image from "next/image";
import BackgroundLines from "./components/BackgroundLines";

export const metadata: Metadata = {
  title: "Vendora Global Solutions | Custom Software, Web & Mobile Development",
  description:
    "Vendora Global Solutions architects digital excellence through full-stack web and mobile engineering, custom software systems, and AI automation.",
  alternates: {
    canonical: "https://www.vendoraglobalsolutions.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.vendoraglobalsolutions.com/#website",
      "url": "https://www.vendoraglobalsolutions.com",
      "name": "Vendora Global Solutions",
      "description":
        "Architecting digital excellence through rigorous engineering, web development, mobile apps, and custom software systems.",
      "publisher": {
        "@id": "https://www.vendoraglobalsolutions.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.vendoraglobalsolutions.com/#organization",
      "name": "Vendora Global Solutions",
      "url": "https://www.vendoraglobalsolutions.com",
      "logo": "https://www.vendoraglobalsolutions.com/images/Vendora.jpg",
      "sameAs": [
        "https://www.facebook.com/share/1D24dJXBt7/?mibextid=wwXIfr",
        "https://www.instagram.com/vendoraglobalsolutions?stkn=ZDZyYjUyang0ejB6&utm_source=qr",
        "https://www.linkedin.com/company/vendora-global-solutions/",
      ],
    },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundLines />
      <div id="home" className="scroll-mt-24">
      {/* ========================================================
          1. MOBILE & TABLET VERSION (< 768px)
          ======================================================== */}
      <section id="home" className="scroll-mt-24 relative min-h-screen overflow-hidden flex flex-col justify-center md:hidden px-4 pt-24 pb-8">
        <div className="relative z-10 w-full bg-[var(--vgs-blue)] rounded-[30px] p-6 text-white shadow-xl">
          
          {/* Top Support Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 backdrop-blur-sm">
              <span className="font-sans text-sm font-extrabold">24/7</span>
              <span className="h-3 w-px bg-white/30" />
              <span className="font-sans text-[10px] font-bold tracking-wider">SUPPORT</span>
            </div>
          </div>

          {/* --- HERO CONTENT --- */}
          <div className="px-6 py-5 lg:py-0 lg:absolute lg:top-[18%] lg:left-14 max-w-full lg:max-w-[90%] z-20 flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-none">

            <h1 className="flex flex-col items-center lg:items-start text-white w-full">
              <span className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-white/90 mb-2">
                Vendora Global Solutions
              </span>
              
              {/* Line 1: "WE BUILD" */}
              <div className={`${outrun.className} relative z-10 flex flex-row items-baseline justify-center lg:justify-start gap-4 lg:gap-6`}>
                <span className="text-5xl sm:text-7xl lg:text-[240px] leading-[0.85] whitespace-nowrap">
                  WE
                </span>
                <span className="text-5xl sm:text-7xl lg:text-[160px] leading-[0.85] lg:transform lg:-translate-y-7 whitespace-nowrap">
                  BUILD
                </span>
              </div>
              
              {/* Line 2: "DIGITAL" */}
              <div className="relative z-20 mt-2 lg:mt-0">
                <span className={`${outrun.className} text-5xl sm:text-7xl lg:text-[85px] leading-none tracking-wider whitespace-nowrap`}>
                  DIGITAL
                </span>
              </div>

              {/* Line 3: "Solutions" Box */}
              <div className="relative z-25 my-2 lg:-mt-12 lg:ml-[280px]">
                <div className="pointer-events-auto inline-block transform lg:-translate-y-6">
                  <div className="inline-block bg-[var(--vgs-canvas)] px-5 py-2 sm:px-8 lg:px-8 lg:py-3 drop-shadow-xl transform -rotate-3 transition-all duration-300 ease-out hover:-rotate-[8deg] hover:scale-[1.03] cursor-default">
                    <span 
                      className={`${meshedDisplay.className} inline-block text-[var(--vgs-blue)] text-5xl sm:text-7xl lg:text-[90px] leading-none whitespace-nowrap lowercase italic`}
                    >
                      Solutions
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Line 4: "THAT GROW YOUR BUSINESS" */}
              <div className={`${outrun.className} relative z-0 mt-2 lg:-mt-3 flex flex-col items-center lg:items-start tracking-wider`}>
                <span className="text-3xl sm:text-5xl lg:text-7xl leading-[0.85]">
                  THAT GROW YOUR
                </span>
                <span className="text-3xl sm:text-5xl lg:text-7xl leading-[0.85] mt-1 lg:-mt-0">
                  BUSINESS
                </span>
              </div>

            </h1>
          </div>

          {/* Sub-headline */}
          <p className="font-sans text-xs sm:text-sm text-white/90 text-center mt-4 leading-relaxed">
            Websites, Mobile Apps, AI Solutions, Social Media Marketing and Graphic Design. All under one roof.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col gap-3">
            <a 
              href="/about#contact-form" 
              className="font-sans font-bold flex items-center justify-center rounded-lg bg-white py-3 text-sm text-[var(--vgs-blue)] shadow-md"
            >
              Start a Project
            </a>
            <a 
              href="/#services" 
              className="font-sans font-medium flex items-center justify-center rounded-lg border border-white/40 bg-white/5 py-3 text-sm text-white backdrop-blur-sm"
            >
              Explore Services
            </a>
          </div>

          {/* Horizontal Stats Bar for Mobile */}
          <div className="mt-8 flex items-center justify-around pt-4 border-t border-white/20 text-white">
            <div className="text-center">
              <div className="font-sans text-lg font-extrabold">20+</div>
              <div className="font-sans text-[9px] text-white/80 uppercase tracking-wider">Projects</div>
            </div>
            <div className="h-5 w-px bg-white/20" />
            <div className="text-center">
              <div className="font-sans text-lg font-extrabold">10+</div>
              <div className="font-sans text-[9px] text-white/80 uppercase tracking-wider">Clients</div>
            </div>
            <div className="h-5 w-px bg-white/20" />
            <div className="text-center">
              <div className="font-sans text-lg font-extrabold">5 Yrs</div>
              <div className="font-sans text-[9px] text-white/80 uppercase tracking-wider">Experience</div>
            </div>
          </div>

        </div>

        {/* Mobile 3D Cube Preview */}
        <div className="w-full h-[280px] sm:h-[300px] mt-2 mb-[-48] flex items-center justify-center overflow-visible relative -mb-20 sm:-mb-28">
          <Image 
            src="/images/robot.png" 
            alt="Robot Character"
            width={600}
            height={600}
            priority
            className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
          />
        </div>
        
      </section>


      {/* ========================================================
    2a. TABLET VERSION (768px – 1279px)
    ======================================================== */}
    <section className="scroll-mt-24 relative hidden md:flex xl:hidden flex-col pt-24 pb-10 px-4 min-h-screen">

      {/* ── Blue hero card ── */}
      <div className="relative z-10 w-full bg-[var(--vgs-blue)] rounded-[32px] px-8 py-10 pb-13 text-white shadow-2xl overflow-hidden">

        {/* Headline — centered */}
        <h1 className="flex flex-col items-center text-white text-center w-full">
          <span className="text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-white/90 mb-2">
            Vendora Global Solutions
          </span>

          {/* WE BUILD */}
          <div className={`${outrun.className} flex items-baseline justify-center gap-3 sm:gap-4 leading-none`}>
            <span className="text-[64px] sm:text-[82px] leading-[0.85]">WE</span>
            <span className="text-[52px] sm:text-[66px] leading-[0.85] -translate-y-1">BUILD</span>
          </div>

          {/* DIGITAL — own row */}
          <span className={`${outrun.className} text-[50px] sm:text-[64px] leading-[0.85] -mt-2 sm:-mt-3`}>
            DIGITAL
          </span>

          {/* Solutions box — centered, slides under DIGITAL */}
          <div className="-mt-3 sm:-mt-4 z-10 relative">
            <div className="pointer-events-auto inline-block">
              <div className="inline-block bg-[var(--vgs-canvas)] px-5 sm:px-7 py-2 sm:py-2.5 drop-shadow-xl -rotate-3 transition-all duration-300 hover:-rotate-[8deg] hover:scale-[1.03] cursor-default">
                <span className={`${meshedDisplay.className} text-[var(--vgs-blue)] text-[44px] sm:text-[58px] leading-none lowercase italic`}>
                  Solutions
                </span>
              </div>
            </div>
          </div>

          {/* THAT GROW YOUR BUSINESS */}
          <div className={`${outrun.className} mt-2 flex flex-col items-center tracking-wide`}>
            <span className="text-[34px] sm:text-[44px] leading-[0.9]">THAT GROW YOUR</span>
            <span className="text-[34px] sm:text-[44px] leading-[0.9]">BUSINESS</span>
          </div>
        </h1>

        {/* Sub-headline — centered */}
        <p className="font-sans mt-6 text-sm sm:text-base text-white/85 text-center max-w-xl mx-auto leading-relaxed">
          Websites, Mobile Apps, AI Solutions, Social Media Marketing and
          Graphic Design. All under one roof.
        </p>

        {/* Buttons & 24/7 Badge Row — Centered with a controlled gap */}
        <div className="mt-6 flex flex-row items-center justify-center gap-12 sm:gap-16 w-full px-2">
          
          {/* Buttons Group */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/about#contact-form"
              className="font-sans font-bold rounded-xl bg-white px-6 sm:px-8 py-3 text-sm sm:text-base text-[var(--vgs-blue)] hover:scale-105 transition-transform duration-300 shadow-lg shadow-black/10"
            >
              Start a Project
            </a>
            <a
              href="/#services"
              className="font-sans font-medium rounded-xl border border-white/40 bg-white/5 px-6 sm:px-8 py-3 text-sm sm:text-base text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              Explore Services
            </a>
          </div>

          {/* 24/7 badge */}
          <div className="flex flex-col text-right shrink-0">
            <div className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">24/7</div>
            <div className="font-sans text-[10px] sm:text-xs font-bold tracking-[0.2em] text-white uppercase mt-0.5">SUPPORT</div>
            <div className="font-sans text-[9px] sm:text-[10px] text-white/60 font-medium mt-0.5">Always available</div>
          </div>

        </div>
      </div>

     {/* ── Bottom row: Robot (left) + Stats (right) ── */}
      <div className="flex flex-row items-center justify-center mx-auto max-w-4xl mt-4 gap-12 sm:gap-20">
        
        {/* Robot image */}
        <div className="flex items-center justify-center shrink-0">
          <Image
            src="/images/robot.png"
            alt="Robot Character"
            width={600}
            height={600}
            priority
            className="w-full max-w-[280px] sm:max-w-[340px] h-auto object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
          />
        </div>

        {/* Stats — right-aligned */}
        <div className="flex flex-col items-end text-right gap-2 sm:gap-4 shrink-0">
          <div>
            <Counter end={20} className="text-[54px] sm:text-[70px] text-[var(--vgs-ink)] leading-none" />
            <div className="font-sans text-xs sm:text-sm text-[var(--vgs-cloud)] font-medium tracking-wide -mt-1">Completed Projects</div>
          </div>
          <div>
            <Counter end={10} className="text-[46px] sm:text-[58px] text-[var(--vgs-ink)] leading-none" />
            <div className="font-sans text-xs sm:text-sm text-[var(--vgs-cloud)] font-medium tracking-wide -mt-1">Happy Clients</div>
          </div>
          <div>
            <Counter end={5} className="text-[38px] sm:text-[48px] text-[var(--vgs-ink)] leading-none" />
            <div className="font-sans text-xs sm:text-sm text-[var(--vgs-cloud)] font-medium tracking-wide -mt-1">Years Experience</div>
          </div>
        </div>

      </div>
    </section>

      {/* ========================================================
          2b. DESKTOP VERSION (≥ 1280px) — ORIGINAL UNTOUCHED
          ======================================================== */}
      <section className="scroll-mt-24 relative h-screen overflow-hidden hidden xl:flex flex-col justify-center">
        
        {/* Main Hero Container */}
        <div className="relative z-10 mx-auto mt-24 w-[calc(100%-2rem)] max-w-[1400px] h-[75vh] min-h-[620px] sm:mt-20">

          {/* --- 3/4 BLUE BACKGROUND SHAPE --- */}
          <div className="absolute inset-0 -z-10 bg-transparent pointer-events-none">
            {/* Left Pillar (Full height, left half) */}
            <div className="absolute top-0 left-0 w-[65%] h-full bg-[var(--vgs-blue)] rounded-[30px] sm:rounded-[60px]" />
            
            {/* Top Bar (Full width, top half) */}
            <div className="absolute top-0 left-0 w-full h-[30%] bg-[var(--vgs-blue)] rounded-[30px] sm:rounded-[60px]" />

            {/* Inverted Inner Corner */}
            <svg 
              className="absolute top-[30%] left-[65%] -translate-x-[1px] -translate-y-[1px] w-[82px] h-[82px] text-[var(--vgs-blue)]"
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <path d="M100,0 A100,100 0 0,0 0,100 L0,0 Z" />
            </svg>
          </div>

          {/* --- LEFT-ALIGNED HEADLINE --- */}
          <div className="absolute top-[8%] left-14 max-w-[90%] z-20 pointer-events-none">

            <h1 className="flex flex-col items-start text-white">
              <span className="pointer-events-auto text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.25em] text-white/90 mb-3">
                Vendora Global Solutions
              </span>
              
              {/* Line 1: "WE" + "BUILD" */}
              <div className={`${outrun.className} relative z-10 flex items-baseline gap-6`}>
                <span className="text-[240px] leading-[0.85]">WE</span>
                <span className="text-[160px] leading-[0.85] transform -translate-y-7">BUILD</span>
              </div>
              
              {/* Line 2: "DIGITAL" + "Solutions" box */}
              <div className="relative z-20 flex flex-row flex-wrap items-center gap-3 -mt-12">
                <span className={`${outrun.className} text-[85px] leading-none pt-6`}>DIGITAL</span>
                <div className="pointer-events-auto inline-block transform -translate-y-6">
                  <div className="inline-block bg-[var(--vgs-canvas)] px-8 py-3 drop-shadow-xl transform -rotate-3 transition-all duration-300 ease-out hover:-rotate-[8deg] hover:scale-[1.03] cursor-default">
                    <span className={`${meshedDisplay.className} inline-block text-[var(--vgs-blue)] text-[90px] leading-none`}>
                      Solutions
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Line 3: "THAT GROW YOUR" + "BUSINESS" */}
              <div className={`${outrun.className} relative z-0 -mt-3 flex flex-col tracking-wider`}>
                <span className="text-7xl leading-[0.85]">THAT GROW YOUR</span>
                <span className="text-7xl leading-[0.85]">BUSINESS</span>
              </div>

            </h1>

            {/* SUB-HEADLINE */}
            <p className="font-sans mt-1 text-lg text-white max-w-xl pointer-events-auto leading-tight">
              Websites, Mobile Apps, AI Solutions, Social Media Marketing and Graphic Design. All under one roof.
            </p>
            
            {/* HERO BUTTONS */}
            <div className="mt-5 flex flex-wrap items-center gap-4 pointer-events-auto">
              <a 
                href="/about#contact-form" 
                className="font-sans font-bold flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-[var(--vgs-blue)] transition-transform duration-300 hover:scale-105 shadow-lg shadow-black/10"
              >
                Start a Project
              </a>
              <a 
                href="/#services" 
                className="font-sans font-medium flex items-center justify-center rounded-lg border border-white/40 bg-white/5 px-8 py-3.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Robot image */}
          <div className="absolute top-[0%] left-[12%] w-[100%] h-[100%] z-0 pointer-events-auto flex justify-center items-center overflow-visible">
            <Image 
              src="/images/robot.png" 
              alt="Robot Character"
              width={1000}
              height={1000}
              priority
              className="w-full h-full object-contain drop-shadow-2xl transition-transform hover:scale-105 duration-300"
            />
          </div>

          {/* STATISTICS — bottom right */}
          <div className="absolute bottom-8 right-5 flex flex-col gap-3 text-right pointer-events-auto z-20">
            <div className="text-right">
              <Counter end={20} className="text-9xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-base text-[var(--vgs-cloud)] font-medium -mt-3.5 tracking-wide">Completed Projects</div>
            </div>
            <div className="text-right">
              <Counter end={10} className="text-8xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-base text-[var(--vgs-cloud)] font-medium -mt-3 tracking-wide">Happy Clients</div>
            </div>
            <div className="text-right">
              <Counter end={5} className="text-7xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-base text-[var(--vgs-cloud)] font-medium -mt-2.5 tracking-wide">Years Experience</div>
            </div>
          </div>

          {/* 24/7 SUPPORT — top right */}
          <div className="absolute top-12 right-16 flex flex-col items-end text-right z-20">
            <div className="font-sans text-5xl font-extrabold tracking-tight text-white leading-none">24/7</div>
            <div className="font-sans text-sm font-bold tracking-wider text-white mt-0">SUPPORT</div>
            <div className="font-sans text-xs text-white/80 font-medium mt-0">Always available</div>
          </div>
        </div>
      </section>
      </div>

      {/* ========================================================
          3. INTERACTIVE SERVICES SECTION 
          ======================================================== */}
      <ServicesSection />
      {/* Pricing Horizontal Scroll Section */}
      <PricingSection />
      {/* Footer */}
      <Footer />
      <ScrollToTop />
    </main>
  );
}

