"use client";

import { useState } from "react";
import { outrun, meshedDisplay } from "../fonts";
import BackgroundLines from "../components/BackgroundLines";

export default function AboutPage() {
  const testimonials = [
    {
      quote: "Vendora's engineering team delivered a scalable, high-performance Node.js architecture that reduced our latency by 60%.",
      name: "Michael",
      company: "MDS Manufacturing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      quote: "The real-time data synchronization powered by Socket.IO transformed our platform. Their technical rigor is unmatched.",
      name: "Diane",
      company: "ABC Rentals",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      quote: "From database modeling to the final UI implementation, the team was exceptional. They brought our AR vision to life.",
      name: "Allison",
      company: "Grand Party Rental",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] overflow-x-hidden relative">
      
      {/* Global Background Lines */}
      <BackgroundLines />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-0">
        
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

      {/* --- MISSION & VISION: STUDIO STYLE SECTION --- */}
      <section className="relative w-full py-28 md:py-20 overflow-hidden text-[var(--vgs-ink)] mt-0">

        {/* Content Matrix Container */}
        <div className="relative z-10 max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Mission Column */}
            <div className="flex flex-col pb-12 lg:pb-0 lg:pr-15">
            <span className={`${meshedDisplay.className} text-8xl text-[var(--vgs-blue)] mb-4 inline-block w-max`}>
                Our Mission
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl leading-[1.1] text-[var(--vgs-ink)]">
                Driving Precision Through Full-Stack Engineering
            </h2>
            <p className="font-sans mt-6 text-base text-[var(--vgs-ink)]/80 leading-relaxed max-w-xl text-justify">
                To empower brands and digital platforms through robust backend architectures, real-time data synchronization, and high-performance applications that scale seamlessly.
            </p>
            </div>

            {/* Vision Column */}
            <div className="flex flex-col lg:pl-9">
            <span className={`${meshedDisplay.className} text-8xl text-[var(--vgs-blue)] mb-4 inline-block w-max`}>
                Our Vision
            </span>
            <h2 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl leading-[1.1] text-[var(--vgs-ink)]">
                Redefining the Standard of Immersive Web Architecture
            </h2>
            <p className="font-sans font-base mt-6 text-base text-[var(--vgs-ink)]/80 leading-relaxed max-w-xl text-justify">
                To become the global benchmark for combining complex enterprise database modeling with striking, modern, and immersive visual design aesthetics.
            </p>
            </div>

        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <section className="relative w-full py-10 text-[var(--vgs-ink)]">
          
          {/* Main Blue Container */}
          <div className="relative bg-[var(--vgs-ink)] p-8 md:p-16 overflow-visible">
            
            {/* Overlapping Top-Left Giant Quotation Badge */}
            <div className="absolute -top-23 left-14 md:left-20 w-40 h-40 md:w-45 md:h-45 bg-[var(--vgs-blue)] rounded-full flex items-center justify-center shadow-xl z-20">
              <svg className="w-20 h-20 text-white fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-25 items-center pt-8 md:pt-4">
              
              {/* Left Side: Call to Action & Description */}
              <div className="lg:col-span-4 text-[var(--vgs-canvas)] flex flex-col justify-between">
                <div>
                  <h3 className={`${outrun.className} text-5xl md:text-7xl uppercase mb-5`}>
                    Built on Trust & Engineering Excellence
                  </h3>
                  <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed mb-6">
                    We take pride in building long-term technological partnerships. Here is what our clients have to say about collaborating with our team on their core platforms.
                  </p>
                </div>
                <button 
                  onClick={() => window.location.href = '#pricing'}
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-white bg-transparent cursor-pointer w-max"
                >
                  <span>Start a Project</span>
                  <span className="flex items-center justify-center text-white text-sm">&rarr;</span>
                </button>
              </div>

              {/* Right Side: Testimonial Cards Slider Area */}
              <div className="lg:col-span-8 flex flex-col">
                
                {/* Cards Grid / Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {testimonials.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-[var(--vgs-canvas)] overflow-hidden flex flex-col justify-between text-[var(--vgs-ink)] transition-all duration-300"
                    >
                      {/* Card Image Header */}
                      <div className="h-50 w-full overflow-hidden relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Card Content */}
                      <div className="p-6 flex flex-col justify-between flex-grow relative">
                        {/* Small Quote Badge overlapping the image line */}
                        <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-[var(--vgs-blue)] flex items-center justify-center">
                          <svg className="w-6 h-6 text-white fill-current" viewBox="0 2 37 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
                          </svg>
                        </div>

                        <p className="font-sans text-sm text-neutral-700 leading-relaxed mt-2 mb-3">
                          &ldquo;{item.quote}&rdquo;
                        </p>

                        <div className="border-t border-neutral-100 pt-1">
                          <h4 className="font-sans font-bold text-md text-neutral-900">{item.name}</h4>
                          <p className="font-sans text-[11px] text-neutral-500 uppercase tracking-wide">{item.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider Controls / Navigation Row */}
                <div className="flex items-center justify-between mt-5">
                  {/* Arrow Buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={prevSlide}
                      className="w-8 h-8 bg-[var(--vgs-blue)] hover:bg-[var(--vgs-canvas)] hover:text-[var(--vgs-ink)] text-[var(--vgs-canvas)] flex items-center justify-center transition-colors"
                    >
                      &larr;
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="w-8 h-8 bg-[var(--vgs-blue)] hover:bg-[var(--vgs-canvas)] hover:text-[var(--vgs-ink)] text-[var(--vgs-canvas)] flex items-center justify-center transition-colors"
                    >
                      &rarr;
                    </button>
                  </div>

                  {/* Dot Pagination */}
                  <div className="flex items-center gap-2">
                    {testimonials.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentIndex(dotIdx)}
                        className={`h-2 rounded-full transition-all ${
                          currentIndex === dotIdx ? "w-6 bg-[var(--vgs-blue)]" : "w-2 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>
      </section>

    </main>
  );
}