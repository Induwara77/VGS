"use client";

import React from "react";
import { outrun, meshedDisplay } from "../fonts";

interface PricingPlan {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  href: string;
}

export default function PricingSection() {
  const plans: PricingPlan[] = [
    {
      id: "web-dev",
      title: "Website Development",
      price: "$499",
      description: "Custom design & responsive layout",
      features: [
        "Custom Design & Layout",
        "Responsive Mobile Viewports",
        "SEO Optimization Setup",
        "CMS Integration"
      ],
      href: "#contact",
    },
    {
      id: "mobile-dev",
      title: "Mobile App Development",
      price: "$999",
      description: "High-performance iOS & Android apps",
      features: [
        "iOS & Android Support",
        "Push Notifications System",
        "Offline-Capable Architecture",
        "App Store Deployment"
      ],
      href: "#contact",
    },
    {
      id: "ai-solutions",
      title: "AI Solutions",
      price: "$1,499",
      description: "Proprietary workflow automations",
      features: [
        "Custom AI Models Integration",
        "Workflow Automation",
        "Advanced Data Analytics",
        "Secure API Connectivity"
      ],
      href: "#contact",
    },
    {
      id: "social-marketing",
      title: "Social Media Marketing",
      price: "$299/mo",
      description: "Data-driven audience acquisition",
      features: [
        "Targeted Content Strategy",
        "Paid Ads Management",
        "Monthly Analytics Reports",
        "Community Management"
      ],
      href: "#contact",
    },
    {
      id: "graphic-design",
      title: "Graphic Design",
      price: "$199",
      description: "Striking visual identities & assets",
      features: [
        "Brand Identity & Guidelines",
        "Marketing Collateral",
        "UI/UX Asset Creation",
        "Print-Ready Files Package"
      ],
      href: "#contact",
    },
  ];

  return (
    <section id="pricing" className="relative w-full text-[var(--vgs-ink)] py-28 px-6 sm:px-10 md:px-16 scroll-mt-24">
      {/* Header */}
      <header className="max-w-[1440px] mx-auto mb-16 text-center">
        <h2 className={`${outrun.className} text-4xl sm:text-6xl md:text-7xl lg:text-[90px] uppercase`}>
          TRANSPARENT PRICING
        </h2>
        <p className="font-sans mt-4 text-sm sm:text-lg text-[var(--vgs-ink)] max-w-xl mx-auto">
          Clear, upfront pricing with no hidden fees. Choose the right package for your growth.
        </p>
      </header>

      {/* Pricing Cards Grid */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-[30px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 bg-[var(--vgs-blue)] text-white"
          >
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest block text-center mb-2 text-white/80">
                STARTING FROM
              </span>
              <div className={`${outrun.className} text-4xl sm:text-6xl text-center mb-2`}>
                {plan.price}
              </div>

              <h3 className={`${outrun.className} text-3xl text-center uppercase mb-6 border-b pb-4 tracking-wide border-white/20`}>
                {plan.title}
              </h3>

              <ul className="space-y-3 font-sans text-sm sm:text-base mb-8">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs bg-white/20 text-white">
                      ✓
                    </span>
                    <span className="text-white/90">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <a
                href={plan.href}
                className="w-full py-3.5 rounded-xl font-bold flex items-center justify-center transition-transform hover:scale-105 bg-white text-[var(--vgs-blue)]"
              >
                <span className="font-sans tracking-wider uppercase text-sm">
                  ORDER NOW
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}