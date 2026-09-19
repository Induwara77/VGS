import { outrun, meshedDisplay } from "./fonts";
import Scene from "./components/Scene";
import Counter from './components/Counter';

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] pb-20">
      <section className="relative h-screen overflow-hidden">
        
        {/* Main Hero Container */}
        <div className="relative z-10 mx-auto mt-24 w-[calc(100%-2rem)] max-w-[1400px] h-[75vh] min-h-[600px] sm:mt-28">

          {/* --- 3/4 BLUE BACKGROUND SHAPE --- */}
          <div className="absolute inset-0 -z-10 bg-transparent pointer-events-none">
            {/* Left Pillar (Full height, left half) */}
            <div className="absolute top-0 left-0 w-[65%] h-full bg-[var(--vgs-blue)] rounded-[30px] sm:rounded-[60px]" />
            
            {/* Top Bar (Full width, top half) */}
            <div className="absolute top-0 left-0 w-full h-[30%] bg-[var(--vgs-blue)] rounded-[30px] sm:rounded-[60px]" />

            {/* Inverted Inner Corner (Center Wedge) */}
            <svg 
              className="absolute top-[30%] left-[65%] w-[30px] h-[30px] sm:w-[80px] sm:h-[80px] text-[var(--vgs-blue)]"
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
              {/* Pushed down with positive margin and added character spacing (tracking) */}
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
              
              {/* Primary Button */}
              <a 
                href="#contact" 
                className="font-sans font-bold flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-[var(--vgs-blue)] transition-transform duration-300 hover:scale-105 shadow-lg shadow-black/10"
              >
                Start a Project
              </a>

              {/* Secondary Button */}
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
            
            {/* Stat 1 */}
            <div className="text-right">
              <Counter end={200} className="text-5xl md:text-9xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-sm md:text-base text-[var(--vgs-cloud)] font-medium -mt-2 md:-mt-3.5 tracking-wide">Completed Projects</div>
            </div>

            {/* Stat 2 */}
            <div className="text-right">
              <Counter end={100} className="text-4xl md:text-8xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-sm md:text-base text-[var(--vgs-cloud)] font-medium -mt-2 md:-mt-3 tracking-wide">Happy Clients</div>
            </div>

            {/* Stat 3 */}
            <div className="text-right">
              <Counter end={5} className="text-3xl md:text-7xl text-[var(--vgs-ink)]" />
              <div className="font-sans text-sm md:text-base text-[var(--vgs-cloud)] font-medium -mt-1.5 md:-mt-2.5 tracking-wide">Years Experience</div>
            </div>

          </div>

          {/* --- TOP RIGHT: 24/7 SUPPORT TEXT --- */}
          <div className="absolute top-12 right-16 flex flex-col items-end text-right z-20 hidden md:flex">
            <div className="font-sans text-5xl font-extrabold tracking-tight text-white leading-none">24/7</div>
            <div className="font-sans text-7m font-bold tracking-wider text-white mt-0">SUPPORT</div>
            <div className="font-sans text-xs text-white/80 font-medium mt-0">Always available</div>
          </div>

        </div>
      </section>
    </main>
  );
}