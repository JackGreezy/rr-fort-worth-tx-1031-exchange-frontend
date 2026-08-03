'use client';

import { useState } from "react";
import Link from "next/link";
import { CONTACT_PHONE, CONTACT_PHONE_DIGITS } from "@/lib/constants";

export default function StickyCta() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Malibu Life style green stripe */}
      <div className="malibu-stripe hidden lg:block" aria-hidden="true" />

      <a
        href={`tel:${CONTACT_PHONE_DIGITS}`}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition hover:scale-105 lg:hidden"
        aria-label={`Call ${CONTACT_PHONE}`}
      >
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.08 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>
      
      {/* LET'S CONNECT floating button - Malibu Life style */}
      <div className="fixed bottom-6 right-6 z-50 hidden lg:block lg:right-10">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group flex items-center gap-2 rounded-full bg-panel px-5 py-3 shadow-lg transition hover:shadow-xl"
          aria-expanded={isOpen}
        >
          <span className="text-xs font-medium tracking-[0.12em] text-primary">
            TALK TO AN EXPERT
          </span>
          <svg 
            className={`h-3 w-3 text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Expanded contact options */}
        {isOpen && (
          <div className="absolute bottom-14 right-0 w-64 rounded-2xl bg-panel p-4 shadow-xl animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-3">
              <a
                href={`tel:${CONTACT_PHONE_DIGITS}`}
                className="block rounded-lg border border-outline/50 bg-secondary/30 px-4 py-3 text-center text-sm font-medium text-primary transition hover:border-primary hover:bg-secondary/50"
              >
                Call {CONTACT_PHONE}
              </a>
              <Link
                href="/contact#contact-form"
                className="block rounded-lg bg-primary px-4 py-3 text-center text-xs font-medium tracking-[0.1em] text-primaryfg transition hover:bg-primary/90"
              >
                START MY EXCHANGE
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
