"use client";

import { outrun } from "../fonts";
import BackgroundLines from "../components/BackgroundLines";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] overflow-x-hidden relative">
      
      {/* Global Background Lines */}
      <BackgroundLines />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-5">
        
        {/* Constrained Header Title */}
        <div className="mx-auto max-w-[1400px] px-6 mb-5">
          <div className="text-xs tracking-[0.2em] text-[var(--vgs-cloud)] uppercase mb-3">ABOUT VENDORA GLOBAL SOLUTIONS</div>
          <h1 className={`${outrun.className} text-4xl sm:text-6xl text-[var(--vgs-ink)] uppercase max-w-3xl`}>
            Architecting <span className="text-[var(--vgs-blue)]">Digital Excellence</span> Through Rigorous Engineering & Design
          </h1>
        </div>

        {/* Full-Width Seamless Hero Banner (Image + Blue Description Block) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3">
          
          {/* Left Side: Bounded Image Container (2 columns) */}
          <div className="lg:col-span-2 h-[350px] md:h-[480px] overflow-hidden border-r border-[var(--vgs-ink)]/15">
            <img 
              src="/images/header.jpg" // Make sure your image path is correct in the public folder
              alt="Vendora Global Engineering Workspace"
              className="w-full h-full object-cover contrast-125 opacity-90 hover:scale-105 transition-transform duration-700 block"
            />
          </div>

          {/* Right Side: Seamless Blue Description Block (1 column) */}
          <div className="bg-[var(--vgs-blue)] text-white p-8 md:p-15 flex flex-col justify-between">
            <div>
              <div className={`${outrun.className} text-6xl text-[var(--vgs-canvas)] mb-3`}>
                OUR PHILOSOPHY
              </div>
              <p className="font-sans text-md md:text-md text-white/90 leading-relaxed mb-6">
                We bridge the gap between high-performance backend architecture and striking visual aesthetics. From real-time Socket.IO systems to immersive full-stack platforms, our culture is rooted in precision.
              </p>
            </div>
            <a 
              href="#next-section" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white"
            >
              Explore Our Journey &rarr;
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}