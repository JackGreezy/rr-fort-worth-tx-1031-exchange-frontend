'use client';

import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { locationsData } from "@/data";
import type { LocationItem } from "@/data";
import { getProfessionalServiceSchema } from "@/lib/seo";

// Property types we handle
const propertyTypes = [
  "Residential",
  "Commercial", 
  "Industrial",
  "Student Housing",
  "Multi-Family",
  "Retail",
  "Medical",
  "Hospitality",
];

// Core 1031 Exchange Services (not location-based)
const exchangeServices = [
  {
    slug: "forward-exchange",
    name: "Forward Exchange",
    description: "Sell your property first, then acquire replacement property within 180 days.",
  },
  {
    slug: "reverse-exchange",
    name: "Reverse Exchange",
    description: "Acquire replacement property before selling your relinquished property.",
  },
  {
    slug: "delayed-exchange",
    name: "Delayed Exchange",
    description: "The most common type - identify replacement property within 45 days of sale.",
  },
  {
    slug: "improvement-exchange",
    name: "Improvement Exchange",
    description: "Use exchange funds to make improvements on the replacement property.",
  },
  {
    slug: "build-to-suit-exchange",
    name: "Build-to-Suit Exchange",
    description: "Construct new improvements on land using your exchange proceeds.",
  },
  {
    slug: "dst-placement-readiness",
    name: "DST Placement",
    description: "Invest in institutional-quality Delaware Statutory Trust properties.",
  },
];

// Benefits of 1031 Exchange
const benefits = [
  {
    title: "Defer Capital Gains Tax",
    description: "Postpone paying federal and state capital gains taxes by reinvesting proceeds into like-kind property.",
  },
  {
    title: "Grow Your Portfolio Faster",
    description: "Use 100% of your sale proceeds to acquire larger or multiple replacement properties.",
  },
  {
    title: "Diversify Your Investments",
    description: "Exchange into different property types, geographic locations, or asset classes.",
  },
  {
    title: "Increase Your Cash Flow",
    description: "Trade up to properties with better income potential and higher returns.",
  },
  {
    title: "Estate Planning Benefits",
    description: "Pass properties to heirs with a stepped-up cost basis, potentially eliminating deferred taxes.",
  },
  {
    title: "Consolidate or Divide",
    description: "Exchange multiple properties into one, or one property into several for flexibility.",
  },
];

export default function Home() {
  const featuredMarkets = locationsData.filter((l: LocationItem) => l.type === "city").slice(0, 6);
  const [showContactPopup, setShowContactPopup] = useState(false);

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem('hasSeenContactPopup');
      if (!hasSeenPopup) {
        setShowContactPopup(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowContactPopup(false);
    sessionStorage.setItem('hasSeenContactPopup', 'true');
  };

  // Benefits carousel state
  const [benefitIndex, setBenefitIndex] = useState(0);
  
  // Auto-rotate benefits every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBenefitIndex((prev) => (prev + 1) % benefits.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextBenefit = () => setBenefitIndex((prev) => (prev + 1) % benefits.length);
  const prevBenefit = () => setBenefitIndex((prev) => (prev - 1 + benefits.length) % benefits.length);

  return (
    <div className="bg-paper text-ink">
      {/* Contact Popup */}
      {showContactPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative mx-4 max-w-md bg-paper p-8 shadow-2xl">
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 text-ink/50 hover:text-ink"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <h3 className="font-serif text-2xl tracking-[0.1em] text-primary">FORT WORTH</h3>
              <p className="font-serif text-lg tracking-[0.1em] text-accent">1031 EXCHANGE</p>
              <p className="mt-4 text-sm text-ink/70">
                Ready to start your 1031 exchange? Our team of experts is here to guide you through every step.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={closePopup}
                  className="bg-primary px-6 py-3 text-xs font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primary/90"
                >
                  GET STARTED TODAY
                </Link>
                <button
                  onClick={closePopup}
                  className="text-xs tracking-[0.1em] text-ink/50 hover:text-ink"
                >
                  Maybe later
                </button>
              </div>
            </div>
              </div>
            </div>
      )}

      <main>
        {/* HERO - Full Screen Video */}
        <section className="relative h-screen overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/fortworth!.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30" />
          
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <h1 className="font-serif text-5xl tracking-[0.15em] text-white md:text-7xl lg:text-8xl" style={{ fontWeight: 300 }}>
              FORT WORTH
            </h1>
            <h2 className="font-serif text-4xl tracking-[0.15em] text-accent md:text-6xl lg:text-7xl" style={{ fontWeight: 300 }}>
              1031 EXCHANGE
            </h2>
          </div>
        </section>

        {/* SERVICES - 1031 Exchange Types */}
        <section className="bg-paper py-14 lg:py-18">
          <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
            <h2 className="font-serif text-3xl italic text-primary md:text-4xl">
              EXPLORE OUR SERVICES
              </h2>
            
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {exchangeServices.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group"
                >
                  <div className="border border-outline/30 bg-panel p-5 transition hover:border-primary/30">
                    <span className="inline-block bg-accent px-2 py-1 text-[9px] font-medium tracking-[0.15em] text-primary mb-3">
                      1031 SERVICE
                    </span>
                    <p className="font-serif text-lg text-primary group-hover:text-accent">{service.name}</p>
                    <p className="mt-1 text-xs text-ink/60 line-clamp-2">
                      {service.description}
                    </p>
                    <p className="mt-3 text-[10px] font-medium tracking-[0.15em] text-accent">
                      LEARN MORE &rarr;
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="/services" className="malibu-btn-outline text-[10px]">
                VIEW ALL SERVICES
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURED NEIGHBORHOODS */}
        <section className="bg-paper">
          <h2 className="py-6 text-center font-serif text-3xl italic text-primary md:text-4xl">
            FEATURED NEIGHBORHOODS
              </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3">
            {featuredMarkets.map((market: LocationItem) => (
              <Link
                key={market.slug}
                href={market.route}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                {market.heroImage && (
                  <Image
                    src={market.heroImage}
                    alt={market.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h3 className="font-serif text-2xl tracking-[0.15em] text-white md:text-3xl" style={{ fontWeight: 300 }}>
                    {market.name.toUpperCase()}
                  </h3>
                  <div className="mt-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="border border-white px-4 py-2 text-[10px] tracking-[0.2em] text-white">
                      LEARN MORE
                    </span>
                  </div>
            </div>
              </Link>
            ))}
          </div>
        </section>

        {/* PROPERTY TYPES - Luxurious Marquee */}
        <section className="overflow-hidden border-y border-primary/10 bg-paper py-8">
          <div className="flex animate-scroll items-center gap-16 whitespace-nowrap">
            {[...propertyTypes, ...propertyTypes, ...propertyTypes].map((type, i) => (
              <span key={i} className="flex items-center gap-16">
                <span className="font-serif text-2xl italic tracking-[0.1em] text-primary/40 md:text-3xl" style={{ fontWeight: 300 }}>
                  {type}
                </span>
                <span className="text-sm text-accent">&#9830;</span>
                        </span>
            ))}
                      </div>
        </section>

        {/* WHY FORT WORTH 1031 EXCHANGE */}
        <section className="bg-paper py-14 lg:py-18">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-2 lg:gap-14 lg:px-14">
            <div className="flex gap-4">
              <div className="relative mt-10 aspect-[3/4] w-1/2 overflow-hidden">
                <Image
                  src="/locations/fort-worth/fort-worth-tx.webp"
                  alt="Fort Worth skyline"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
                    </div>
              <div className="relative aspect-[3/4] w-1/2 overflow-hidden">
                <Image
                  src="/locations/dallas/dallas-tx.webp"
                  alt="Fort Worth real estate"
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-3xl uppercase tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
                FORT WORTH 1031 EXCHANGE
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-ink/70">
                Founded in Fort Worth, our team represents the most experienced 1031 exchange advisors in Texas. We specialize in helping investors defer capital gains through strategic property exchanges, with deep expertise in NNN retail, medical, industrial, and residential assets.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink/70">
                Our team continues to bring in record transactions year after year, ranking among the top 1031 exchange specialists nationally. We operate under a client-first mentality, which means exceptional service is our top priority.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link href="/about" className="malibu-btn-outline text-[10px]">
                  MEET THE TEAM
                </Link>
                <Link
                  href="/contact"
                  className="bg-primary px-5 py-3 text-[10px] font-medium tracking-[0.15em] text-primaryfg transition hover:bg-primary/90"
                >
                  INQUIRE NOW
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS OF 1031 EXCHANGE - Rotating Carousel */}
        <section className="relative py-20 lg:py-28">
          <div className="absolute inset-0">
            <Image
              src="/locations/arlington/arlington-tx.jpg"
              alt="Fort Worth"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/60" />
            </div>

          <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-10 lg:px-14">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Left: Branding */}
              <div className="text-center lg:text-left">
                <div className="mb-4 flex items-baseline gap-2 justify-center lg:justify-start">
                  <span className="font-serif text-5xl tracking-[0.08em] text-white opacity-60 md:text-6xl" style={{ fontWeight: 300 }}>FW</span>
                  <span className="font-serif text-2xl tracking-[0.12em] text-white/50 md:text-3xl" style={{ fontWeight: 300 }}>1031</span>
                </div>
                <p className="font-serif text-2xl tracking-[0.15em] text-white md:text-3xl" style={{ fontWeight: 300 }}>FORT WORTH</p>
                <p className="font-serif text-xl tracking-[0.15em] text-accent md:text-2xl" style={{ fontWeight: 300 }}>1031 EXCHANGE</p>
              </div>
              
              {/* Right: Rotating Benefit */}
              <div className="text-center lg:text-left">
                <h3 className="font-serif text-xl uppercase tracking-[0.15em] text-white md:text-2xl" style={{ fontWeight: 300 }}>
                  THE BENEFITS OF 1031 EXCHANGE
                </h3>
                
                {/* Rotating benefit display */}
                <div className="mt-8 min-h-[140px]">
                  <div className="transition-opacity duration-500">
                    <p className="font-serif text-2xl text-accent md:text-3xl" style={{ fontWeight: 300 }}>
                      {benefits[benefitIndex].title}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/80 md:text-base">
                      {benefits[benefitIndex].description}
                    </p>
            </div>
          </div>
                
                {/* Navigation dots and arrows */}
                <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start">
                  <button 
                    onClick={prevBenefit}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-primary"
                    aria-label="Previous benefit"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <div className="flex gap-2">
                    {benefits.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setBenefitIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === benefitIndex ? 'bg-accent w-4' : 'bg-white/40 hover:bg-white/60'
                        }`}
                        aria-label={`Go to benefit ${index + 1}`}
                      />
              ))}
            </div>

                  <button 
                    onClick={nextBenefit}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-primary"
                    aria-label="Next benefit"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                <div className="mt-8">
                  <Link href="/services" className="border border-white/50 px-5 py-2.5 text-[10px] font-medium tracking-[0.15em] text-white transition hover:bg-white hover:text-primary">
                    LEARN MORE
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24 lg:py-36">
          <div className="absolute inset-0">
            <Image
              src="/locations/plano/plano-tx.webp"
              alt="Fort Worth"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          
          <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="font-serif text-5xl tracking-[0.15em] text-white md:text-7xl lg:text-8xl" style={{ fontWeight: 200 }}>
              FORT WORTH
              </h2>
            <p className="font-serif text-4xl tracking-[0.15em] text-accent md:text-6xl lg:text-7xl" style={{ fontWeight: 200 }}>
              1031 EXCHANGE
            </p>
                <Link
              href="/contact"
              className="mt-10 border border-white/70 px-7 py-3 text-[10px] font-medium tracking-[0.2em] text-white transition hover:bg-white hover:text-primary"
                >
              WORK WITH US
                </Link>
          </div>
        </section>
      </main>
      
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getProfessionalServiceSchema()) }}
      />
    </div>
  );
}
