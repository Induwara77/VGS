import { outrun, meshedDisplay } from "./fonts";
import Scene from "./components/Scene";
import Counter from './components/Counter';
import ServicesSection from "./components/ServicesSection";
import PricingSection from "./components/PricingSection";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] overflow-x-clip">
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
          <div className="px-6 py-12 lg:py-0 lg:absolute lg:top-[18%] lg:left-14 max-w-full lg:max-w-[90%] z-20 flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-none">

            <h1 className="flex flex-col items-center lg:items-start text-white w-full">
              
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
              href="#contact" 
              className="font-sans font-bold flex items-center justify-center rounded-lg bg-white py-3 text-sm text-[var(--vgs-blue)] shadow-md"
            >
              Start a Project
            </a>
            <a 
              href="#services" 
              className="font-sans font-medium flex items-center justify-center rounded-lg border border-white/40 bg-white/5 py-3 text-sm text-white backdrop-blur-sm"
            >
              Explore Services
            </a>
          </div>

          {/* Horizontal Stats Bar for Mobile */}
          <div className="mt-8 flex items-center justify-around pt-4 border-t border-white/20 text-white">
            <div className="text-center">
              <div className="font-sans text-lg font-extrabold">200+</div>
              <div className="font-sans text-[9px] text-white/80 uppercase tracking-wider">Projects</div>
            </div>
            <div className="h-5 w-px bg-white/20" />
            <div className="text-center">
              <div className="font-sans text-lg font-extrabold">100+</div>
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
        <div className="relative w-full h-[220px] mt-4">
           <Scene />
        </div>
      </section>


      {/* ========================================================
          2. EXACT DESKTOP VERSION (≥ 768px) — UNTOUCHED
          ======================================================== */}
      <section id="home" className="scroll-mt-24 relative h-screen overflow-hidden hidden md:flex flex-col justify-center">
        
        {/* Main Hero Container */}
        <div className="relative z-10 mx-auto mt-24 w-[calc(100%-2rem)] max-w-[1400px] h-[75vh] min-h-[600px] sm:mt-28">

          {/* --- 3/4 BLUE BACKGROUND SHAPE --- */}
          <div className="absolute inset-0 -z-10 bg-transparent pointer-events-none">
            {/* Left Pillar (Full height, left half) */}
            <div className="absolute top-0 left-0 w-[65%] h-full bg-[var(--vgs-blue)] rounded-[30px] sm:rounded-[60px]" />
            
            {/* Top Bar (Full width, top half) */}
            <div className="absolute top-0 left-0 w-full h-[30%] bg-[var(--vgs-blue)] rounded-[30px] sm:rounded-[60px]" />

            {/* Inverted Inner Corner (Center Wedge with 1px overlap to kill the white line) */}
            <svg 
              className="absolute top-[30%] left-[65%] -translate-x-[1px] -translate-y-[1px] w-[32px] h-[32px] sm:w-[82px] sm:h-[82px] text-[var(--vgs-blue)]"
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <path d="M100,0 A100,100 0 0,0 0,100 L0,0 Z" />
            </svg>
          </div>

          {/* --- LEFT-ALIGNED HEADLINE --- */}
          <div className="absolute top-[12%] left-6 sm:top-[15%] sm:left-12 md:top-[10%] md:left-14 max-w-[95%] md:max-w-[90%] z-20 pointer-events-none">

            <h1 className="flex flex-col items-start text-white">
              
              {/* Line 1: "WE" (Bigger) and "BUILD" */}
              <div className={`${outrun.className} relative z-10 flex items-baseline gap-4 md:gap-6`}>
                <span className="text-7xl sm:text-8xl md:text-[130px] lg:text-[240px] leading-[0.85]">
                  WE
                </span>
                <span className="text-6xl sm:text-7xl md:text-[100px] lg:text-[160px] leading-[0.85] transform -translate-y-2 md:-translate-y-7">
                  BUILD
                </span>
              </div>
              
              {/* Line 2: "DIGITAL" + "Solutions" box */}
              <div className="relative z-20 flex flex-row flex-wrap items-center gap-4 md:gap-3 -mt-6 sm:-mt-10 md:-mt-12">
                
                <span className={`${outrun.className} text-4xl sm:text-5xl md:text-7xl lg:text-[85px] leading-none pt-2 md:pt-6`}>
                  DIGITAL
                </span>

                {/* Overlapping, Angled "Solutions" Rectangle - Shifted UP slightly */}
                <div className="pointer-events-auto inline-block transform -translate-y-1 md:-translate-y-4 lg:-translate-y-6">
                  {/* The white box (rotates reverse clockwise and scales up slightly on hover) */}
                  <div className="inline-block bg-[var(--vgs-canvas)] px-6 py-2 sm:px-8 sm:py-3 drop-shadow-xl transform -rotate-3 transition-all duration-300 ease-out hover:-rotate-[8deg] hover:scale-[1.03] cursor-default">
                    <span 
                      className={`${meshedDisplay.className} inline-block text-[var(--vgs-blue)] text-6xl sm:text-7xl md:text-[90px] leading-none`}
                    >
                      Solutions
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Line 3: "THAT GROW YOUR" and "BUSINESS." */}
              <div className={`${outrun.className} relative z-0 -mt-4 md:-mt-3 flex flex-col tracking-wider`}>
                <span className="text-4xl sm:text-5xl md:text-7xl leading-[0.85]">
                  THAT GROW YOUR
                </span>
                <span className="text-4xl sm:text-5xl md:text-7xl leading-[0.85] -mt-2 md:-mt-0">
                  BUSINESS
                </span>
              </div>

            </h1>

            {/* --- SUB-HEADLINE --- */}
            <p className="font-sans mt-6 md:mt-1 text-md sm:text-lg md:text-lg text-white max-w-sm sm:max-w-md md:max-w-xl pointer-events-auto leading-tight">
              Websites, Mobile Apps, AI Solutions, Social Media Marketing and Graphic Design. All under one roof.
            </p>
            
            {/* --- HERO BUTTONS --- */}
            <div className="mt-8 md:mt-5 flex flex-wrap items-center gap-4 pointer-events-auto">
              <a 
                href="#contact" 
                className="font-sans font-bold flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-[var(--vgs-blue)] transition-transform duration-300 hover:scale-105 shadow-lg shadow-black/10"
              >
                Start a Project
              </a>
              <a 
                href="#services" 
                className="font-sans font-medium flex items-center justify-center rounded-lg border border-white/40 bg-white/5 px-8 py-3.5 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* --- 3D CUBE (Quadrant 4 - Bottom Right) --- */}
          <div className="absolute bottom-0 right-0 w-[50%] h-[50%] z-30">
             <Scene />
          </div>

          {/* --- RIGHT BOTTOM: STATISTICS --- */}
          <div className="absolute bottom-8 right-0 md:bottom-8 md:right-15 flex flex-col items-end gap-3 text-right pointer-events-auto hidden md:flex z-20">
            <div className="text-right">
              <Counter end={200} className="text-5xl md:text-9xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-sm md:text-base text-[var(--vgs-cloud)] font-medium -mt-2 md:-mt-3.5 tracking-wide">Completed Projects</div>
            </div>
            <div className="text-right">
              <Counter end={100} className="text-4xl md:text-8xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-sm md:text-base text-[var(--vgs-cloud)] font-medium -mt-2 md:-mt-3 tracking-wide">Happy Clients</div>
            </div>
            <div className="text-right">
              <Counter end={5} className="text-3xl md:text-7xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-sm md:text-base text-[var(--vgs-cloud)] font-medium -mt-1.5 md:-mt-2.5 tracking-wide">Years Experience</div>
            </div>
          </div>

          {/* --- TOP RIGHT: 24/7 SUPPORT TEXT --- */}
          <div className="absolute top-12 right-16 flex flex-col items-end text-right z-20 hidden md:flex">
            <div className="font-sans text-5xl font-extrabold tracking-tight text-white leading-none">24/7</div>
            <div className="font-sans text-sm font-bold tracking-wider text-white mt-0">SUPPORT</div>
            <div className="font-sans text-xs text-white/80 font-medium mt-0">Always available</div>
          </div>
        </div>
      </section>
      </div>

      {/* ========================================================
          3. INTERACTIVE SERVICES SECTION (chkstepan.com style)
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

