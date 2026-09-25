"use client";

import { useState } from "react";
import { outrun, meshedDisplay } from "../fonts";
import BackgroundLines from "../components/BackgroundLines";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop"; 

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

  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false); // <-- Added missing submission state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_SHEETDB_URL!, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: [
            {
              Name: formData.name,
              Email: formData.email,
              Service: formData.service,
              Message: formData.message,
              Date: new Date().toLocaleString()
            }
          ]
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "", service: "" });
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
              href="/about#vision-mission" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white"
            >
              Explore Our Journey &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* --- MISSION & VISION: STUDIO STYLE SECTION --- */}
      <section id="vision-mission" className="relative w-full py-28 md:py-20 overflow-hidden text-[var(--vgs-ink)] mt-0">

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
      <section id="testimonials" className="relative w-full py-10 text-[var(--vgs-ink)]">
          
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
                  onClick={() => window.location.href = '/about#contact-form'}
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
      {/* --- CONTACT FORM SECTION (Split-Screen Editorial Style) --- */}
      <section id="contact-form" className="relative w-full py-15 text-[var(--vgs-ink)] scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Main Split-Screen Container matching your reference image */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden shadow-xl">
            
            {/* Left Side: Form Panel */}
            <div className="bg-white p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-sans uppercase tracking-[0.2em] text-[var(--vgs-cloud)]">Vendora Global Solutions</span>
                </div>

                <h2 className={`${outrun.className} text-4xl sm:text-6xl uppercase text-[var(--vgs-ink)] mb-1`}>
                  Start a Project
                </h2>
                <p className="font-sans text-sm text-neutral-500 mb-8">
                  Let's engineer your next high-performance platform together.
                </p>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
                    <h3 className={`${outrun.className} text-3xl text-[var(--vgs-ink)] mb-2 uppercase`}>Inquiry Received</h3>
                    <p className="font-sans text-sm text-neutral-600">Our engineering leads will review your brief and get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-4 py-4 text-sm text-neutral-900 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-4 py-4 text-sm text-neutral-900 focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <div>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-4 py-4 text-sm text-neutral-900 focus:outline-none focus:border-black transition-colors"
                      >
                        <option value="">Select Service Area...</option>
                        <option value="app-dev">Application Development</option>
                        <option value="android-dev">Android Development</option>
                        <option value="ios-dev">iOS Development</option>
                        <option value="mobile-dev">Mobile Application Development</option>
                        <option value="web-dev">Web Development</option>
                        <option value="web-design">Web Design</option>
                        <option value="saas-dev">SaaS Development</option>
                        <option value="custom-software">Custom Software Development</option>
                        <option value="software-testing">Software Testing</option>
                        <option value="digital-marketing">Digital Marketing</option>
                      </select>
                    </div>

                    <div>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Project Details & Requirements..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-none px-4 py-4 text-sm text-neutral-900 focus:outline-none focus:border-black transition-colors resize-none"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-4 bg-[var(--vgs-blue)] text-white font-sans font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors"
                    >
                      Submit Inquiry
                    </button>
                  </form>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 font-sans">
                <span>Doesn't have an idea yet? <a href="/#services" className="text-black underline font-bold">Explore Services</a></span>
              </div>
            </div>

            {/* Right Side: Editorial Image & Contrast Text Panel */}
            <div className="relative bg-[#0b2751] min-h-[450px] lg:min-h-full flex flex-col justify-between p-8 md:p-12 overflow-hidden">
              {/* Background Atmospheric Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="/images/kb.jpg" 
                  alt="Engineering Editorial" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-50 contrast-125"
                />
              </div>

              <div className="relative z-10 flex justify-between items-start text-white">
                <span className="text-xs uppercase tracking-widest text-white/70">Engineering Focus</span>
              </div>

              <div className="relative z-10 my-auto py-12">
                <h3 className={`${outrun.className} text-4xl md:text-6xl text-[var(--vgs-canvas)] uppercase mb-4 max-w-md`}>
                  We use technical contrast to bring your brand's truest vision to life.
                </h3>
              </div>

              <div className="relative z-10 flex justify-between items-end text-white text-xs font-mono">
                <span>&copy; Copyright Vendora Global Solutions</span>
                <span>2026</span>
              </div>
            </div>

          </div>

        </div>
      </section>
      {/* --- NEXT SECTION: SLIM HORIZONTAL SANS TICKER --- */}
      <section className="relative w-full py-4 bg-[#2563eb] text-white overflow-hidden border-t border-b border-blue-400">
        
        <div className="flex w-max animate-marquee items-center space-x-12 whitespace-nowrap">
          {/* First set of items */}
          <div className="flex items-center space-x-12">
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Application Development
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Android & iOS Development
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Custom Software Solutions
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              SaaS Scale & Web Design
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Software Testing & QA
            </span>
            <span className="text-white/60 text-xs">●</span>
          </div>

          {/* Duplicate set for a seamless infinite loop */}
          <div className="flex items-center space-x-12" aria-hidden="true">
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Application Development
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Android & iOS Development
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Custom Software Solutions
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              SaaS Scale & Web Design
            </span>
            <span className="text-white/60 text-xs">●</span>
            <span className="font-sans text-xs md:text-sm font-normal uppercase tracking-[0.2em] text-white">
              Software Testing & QA
            </span>
            <span className="text-white/60 text-xs">●</span>
          </div>
        </div>

        {/* Tailwind Custom Marquee Animation Config */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 30s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* --- HEADING & DESCRIPTION SECTION --- */}
      <section className="relative z-10 mx-auto max-w-[1200px] px-6 py-20 text-center">
        <h2 className={`${outrun.className} text-2xl sm:text-5xl md:text-6xl text-[var(--vgs-ink)] uppercase mb-6`}>
          Engineered for scale, designed for impact.
        </h2>
        <p className="font-sans text-sm md:text-base text-[var(--vgs-ink)] max-w-2xl mx-auto leading-relaxed">
          We combine technical architecture with meticulous execution, delivering custom digital systems, robust cross-platform applications, and seamless user experiences tailored to your growth.
        </p>
      </section>

      {/* Footer */}
      <Footer />
      <ScrollToTop />

    </main>
  );
}