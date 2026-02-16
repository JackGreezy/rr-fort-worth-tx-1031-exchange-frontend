'use client';

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import site from "@/content/site.json";

// Core 1031 Exchange Services for header dropdown
const exchangeServices = [
  { slug: "forward-exchange", name: "Forward Exchange" },
  { slug: "reverse-exchange", name: "Reverse Exchange" },
  { slug: "delayed-exchange", name: "Delayed Exchange" },
  { slug: "improvement-exchange", name: "Improvement Exchange" },
  { slug: "build-to-suit-exchange", name: "Build-to-Suit Exchange" },
  { slug: "dst-placement-readiness", name: "DST Placement" },
  { slug: "qualified-intermediary-services", name: "Qualified Intermediary Services" },
  { slug: "property-identification", name: "Property Identification" },
];

export default function Header() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const mobileOverlayRef = useRef<HTMLDivElement | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const cancelCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as Node;
      if (!headerRef.current) return;
      // Don't close anything if clicking inside the header or the mobile overlay
      if (headerRef.current.contains(target)) return;
      if (mobileOverlayRef.current && mobileOverlayRef.current.contains(target)) return;
      setMobileMenuOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        cancelCloseTimeout();
        setServicesOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
      cancelCloseTimeout();
    };
  }, []);

  const handleMouseEnter = () => {
    cancelCloseTimeout();
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setServicesOpen(false), 150);
    closeTimeoutRef.current = timeout;
  };

  return (
    <>
    <header ref={headerRef} className="fixed left-0 right-0 top-0 z-50 bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-between px-4 py-3 md:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1.5">
          <span className="font-serif text-3xl tracking-[0.08em] text-primary md:text-4xl" style={{ fontWeight: 300 }}>
            FW
          </span>
          <span className="font-serif text-lg tracking-[0.12em] text-primary/70 md:text-xl" style={{ fontWeight: 300 }}>
            1031
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={clsx(
                "flex items-center gap-1.5 text-[11px] font-medium tracking-[0.18em] text-primary transition hover:text-accent",
                servicesOpen && "text-accent"
              )}
              aria-expanded={servicesOpen}
            >
              SERVICES
              <svg 
                className={clsx("h-2.5 w-2.5 transition-transform", servicesOpen && "rotate-180")} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <Link href="/locations" className="text-[11px] font-medium tracking-[0.18em] text-primary transition hover:text-accent">
            NEIGHBORHOODS
          </Link>
          
          <Link href="/property-types" className="text-[11px] font-medium tracking-[0.18em] text-primary transition hover:text-accent">
            PROPERTY TYPES
          </Link>
          
          <Link href="/tools" className="text-[11px] font-medium tracking-[0.18em] text-primary transition hover:text-accent">
            TOOLS
          </Link>
          
          <Link href="/contact" className="text-[11px] font-medium tracking-[0.18em] text-primary transition hover:text-accent">
            CONTACT
          </Link>
        </nav>

        {/* Yellow/Gold Hamburger Menu Button */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary transition hover:bg-accent/90"
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen((prev) => !prev);
          }}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col gap-1">
            <span className={clsx(
              "block h-[2px] w-4 bg-current transition-all duration-300",
              mobileMenuOpen && "translate-y-[6px] rotate-45"
            )} />
            <span className={clsx(
              "block h-[2px] w-4 bg-current transition-all duration-300",
              mobileMenuOpen && "opacity-0"
            )} />
            <span className={clsx(
              "block h-[2px] w-4 bg-current transition-all duration-300",
              mobileMenuOpen && "-translate-y-[6px] -rotate-45"
            )} />
          </div>
        </button>
      </div>

      {/* Services Dropdown Panel */}
      <div
        ref={dropdownRef}
        className={clsx(
          "absolute left-0 right-0 top-full bg-paper shadow-lg transition-all duration-300",
          servicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto max-w-5xl px-6 py-6 md:px-10">
          <div className="grid gap-3 md:grid-cols-4">
            {exchangeServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="border-b border-outline/20 py-2.5 text-sm text-primary transition hover:border-primary hover:text-accent"
                onClick={() => setServicesOpen(false)}
              >
                {service.name}
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <Link
              href="/services"
              className="text-[10px] font-medium tracking-[0.15em] text-accent transition hover:text-primary"
              onClick={() => setServicesOpen(false)}
            >
              VIEW ALL SERVICES &rarr;
            </Link>
          </div>
        </div>
      </div>

    </header>

      {/* Full Screen Mobile Menu - outside header for proper z-stacking */}
      <div
        ref={mobileOverlayRef}
        className={clsx(
          "fixed inset-0 z-[60] bg-paper transition-all duration-500",
          mobileMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute right-4 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary md:right-8"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <nav className="flex h-full flex-col items-center justify-center gap-6">
          <Link
            href="/services"
            className="font-serif text-2xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            SERVICES
          </Link>
          <Link
            href="/locations"
            className="font-serif text-2xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            NEIGHBORHOODS
          </Link>
          <Link
            href="/property-types"
            className="font-serif text-2xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            PROPERTY TYPES
          </Link>
          <Link
            href="/inventory"
            className="font-serif text-2xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            INVENTORY
          </Link>
          <Link
            href="/tools"
            className="font-serif text-2xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            TOOLS
          </Link>
          <Link
            href="/about"
            className="font-serif text-2xl font-light tracking-[0.1em] text-primary transition hover:text-accent md:text-3xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="mt-6 border border-primary px-8 py-3 text-xs font-medium tracking-[0.2em] text-primary transition hover:bg-primary hover:text-primaryfg"
            onClick={() => setMobileMenuOpen(false)}
          >
            CONTACT US
          </Link>
        </nav>
      </div>
    </>
  );
}
