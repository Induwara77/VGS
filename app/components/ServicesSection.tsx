"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { outrun, meshedDisplay } from "../fonts";

interface ServiceItem {
  id: string;
  number: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  bgColor: string;
  textColor: string;
  caption: string;
  images: string[];
  href: string;
}

export default function ServicesSection() {
  const sectionPinRef = useRef<HTMLElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);

  const services: ServiceItem[] = [
    {
      id: "web-dev",
      number: "01",
      titleLine1: "WEBSITE",
      titleLine2: "DEVELOPMENT",
      description:
        "Modern, responsive and SEO-friendly websites that represent your brand and convert visitors into customers. Built for speed, search visibility, and seamless experiences across all viewports.",
      bgColor: "bg-[var(--vgs-blue)]",
      textColor: "text-white",
      caption: "",
      images: [
        "/images/web.jpeg",
      ],
      href: "#contact",
    },
    {
      id: "mobile-dev",
      number: "02",
      titleLine1: "MOBILE APP",
      titleLine2: "DEVELOPMENT",
      description:
        "High-performance mobile apps for iOS and Android that deliver a seamless user experience. Intuitive UI, ultra-responsive touch interactions, and offline-capable architectures.",
      bgColor: "bg-[var(--vgs-canvas)]",
      textColor: "text-[#1a1a1a]",
      caption: "",
      images: [
        "/images/mobile.jpeg",
      ],
      href: "#contact",
    },
    {
      id: "ai-solutions",
      number: "03",
      titleLine1: "AI",
      titleLine2: "SOLUTIONS",
      description:
        "Custom AI solutions and automation to streamline operations and boost business productivity. From intelligent agents to proprietary workflow automation that eliminates repetitive bottlenecks.",
      bgColor: "bg-[var(--vgs-blue)]",
      textColor: "text-[var(--vgs-canvas)]",
      caption: "",
      images: ["/images/Airobot.jpeg"],
      href: "#contact",
    },
    {
      id: "social-marketing",
      number: "04",
      titleLine1: "SOCIAL MEDIA",
      titleLine2: "MARKETING",
      description:
        "Grow your brand, engage your audience and get real results with our targeted social media strategies. Data-driven audience acquisition, creative campaigns, and high-converting creative hooks.",
      bgColor: "bg-[var(--vgs-canvas)]",
      textColor: "text-[#1a1a1a]",
      caption: "",
      images: ["/images/smm.jpg"],
      href: "#contact",
    },
    {
      id: "graphic-design",
      number: "05",
      titleLine1: "GRAPHIC",
      titleLine2: "DESIGN",
      description:
        "Stunning visual identities, brand guidelines, marketing collateral, and UI assets that capture attention and elevate your brand presence across all digital and print mediums.",
      bgColor: "bg-[var(--vgs-blue)]",
      textColor: "text-[var(--vgs-canvas)]",
      caption: "",
      images: ["/images/Intermediate-Graphic-Design.jpg"],
      href: "#contact",
    },
  ];

  // Flatten service images into discrete panels for smooth horizontal scrolling
  const slides = services.flatMap((service) =>
    service.images.map((imgSrc, imgIndex) => ({
      ...service,
      currentImage: imgSrc,
      currentIndex: imgIndex,
      totalImages: service.images.length,
      slideKey: `${service.id}-${imgIndex}`,
    }))
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionPin = sectionPinRef.current;
    const pinWrap = pinWrapRef.current;

    if (!sectionPin || !pinWrap) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => pinWrap.scrollWidth - window.innerWidth;

      gsap.to(pinWrap, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionPin,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1, // Buttery smooth scrub with momentum
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionPin);

    const handleRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleRefresh);
    window.addEventListener("load", handleRefresh);

    return () => {
      window.removeEventListener("resize", handleRefresh);
      window.removeEventListener("load", handleRefresh);
      ctx.revert();
    };
  }, [slides.length]);

  return (
    <section id="services" className="relative w-full bg-[var(--vgs-canvas)] text-[var(--vgs-ink)]">
      {/* Header (Section 1 in reference structure) */}
      <header className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 pt-28 pb-16">
        <div className="border-b border-[var(--vgs-ink)]/20 pb-4 mb-8 flex justify-between items-center"></div>

        <h2 className="flex flex-col text-[var(--vgs-ink)] leading-[0.85] tracking-tight">
          <span className={`${outrun.className} text-5xl sm:text-7xl md:text-8xl lg:text-[110px] uppercase`}>
            WHEN CLARITY
          </span>
          <div className="flex items-baseline flex-wrap gap-x-6 mt-0">
            <span
              className={`${meshedDisplay.className} text-5xl sm:text-7xl md:text-8xl lg:text-[100px] text-[var(--vgs-blue)] lowercase italic -rotate-2`}
            >
              meets
            </span>
            <span className={`${outrun.className} text-5xl sm:text-7xl md:text-8xl lg:text-[110px] uppercase`}>
              PERFORMANCE
            </span>
          </div>
        </h2>
      </header>

      {/* Pinned Horizontal Scroll Section (#sectionPin with .pin-wrap) */}
      <section
        id="sectionPin"
        ref={sectionPinRef}
        className="relative w-full h-screen overflow-hidden flex bg-[var(--vgs-ink)]"
      >
        <div
          ref={pinWrapRef}
          className="pin-wrap flex flex-row h-screen will-change-transform"
          style={{ width: "max-content" }}
        >
          {slides.map((slide) => (
            <div
              key={slide.slideKey}
              className={`w-screen h-screen flex-shrink-0 flex flex-col ${slide.bgColor} ${slide.textColor} overflow-hidden`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 w-full h-full items-stretch">
                {/* Information Column */}
                <div className="lg:col-span-6 px-6 sm:px-10 md:px-16 py-8 sm:py-10 md:py-12 flex flex-col justify-between h-full z-10">
                  <div className="flex justify-between items-center border-b border-current/20 pb-3">
                    <span className="font-mono text-xl sm:text-4xl font-bold tracking-wider opacity-90">
                      {slide.number}{" "}
                      {slide.totalImages > 1 && (
                        <span className="text-xs opacity-60">
                          ({slide.currentIndex + 1}/{slide.totalImages})
                        </span>
                      )}
                    </span>
                    <span className="font-sans text-xs tracking-wider uppercase opacity-75">
                      {slide.caption}
                    </span>
                  </div>

                  <div className="max-w-lg my-auto py-4 sm:py-6">
                    <p className="font-sans text-sm sm:text-base md:text-lg font-normal leading-relaxed">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-col space-y-17 pb-35">
                    <h3
                      className={`${outrun.className} text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-[0.9]`}
                    >
                      <span>{slide.titleLine1}</span>
                      <span className="block">{slide.titleLine2}</span>
                    </h3>

                    <div>
                      <a
                        href={slide.href}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-wider font-bold decoration-2 hover:underline underline-offset-8 transition-opacity"
                      >
                        <span>LEARN MORE</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Imagery Column */}
                <div className="lg:col-span-6 relative w-full h-full min-h-[300px] overflow-hidden bg-black/5">
                  <img
                    src={slide.currentImage}
                    alt={`${slide.titleLine1} view ${slide.currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outro / Next Section (Section 3 in reference structure) */}
      <div className="relative z-50 w-full bg-[var(--vgs-canvas)] text-[var(--vgs-ink)] py-28 sm:py-36 text-center px-6 border-t border-[var(--vgs-ink)]/15">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2
            className={`${outrun.className} text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[0.9] tracking-wider uppercase`}
          >
            READY TO BUILD SOMETHING THAT ACTUALLY WORKS?
          </h2>

          <p className="font-sans mt-6 text-lg sm:text-xl text-[var(--vgs-ink)]/80 max-w-xl">
            Clear design, solid engineering, and focused strategy, working together as one system.
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-xl bg-[var(--vgs-blue)] px-8 py-4 text-white shadow-lg hover:bg-[#0852b5] transition-colors"
            >
              <a
            href="#talk"
            onClick={() =>false}
            className="font-sans mt-6 flex items-center justify-center rounded-md py-3 text-sm font-semibold text-[var(--vgs-blue)] transition-transform hover:scale-105"
          >
            Let's talk ↗
          </a>
              <span className="text-lg">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}