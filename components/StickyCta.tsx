'use client';

import { useState } from "react";
import Link from "next/link";
import { CONTACT_PHONE, CONTACT_PHONE_DIGITS } from "@/lib/constants";

export default function StickyCta() {
  const [mobileOpen, setMobileOpen] = useState(true);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      <div className="hidden items-center gap-3 rounded-full border border-outline/60 bg-panel/95 px-5 py-2.5 shadow-glow backdrop-blur lg:flex">
        <span className="text-xs uppercase tracking-[0.3em] text-ink/70">Need help now?</span>
        <a
          href={`tel:${CONTACT_PHONE_DIGITS}`}
          className="rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
        >
          Call {CONTACT_PHONE}
        </a>
        <Link
          href="/contact#contact-form"
          className="rounded-full border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary transition hover:-translate-y-0.5 hover:bg-primary/10"
        >
          Get In Touch
        </Link>
      </div>

      <div className="w-72 rounded-2xl border border-outline/60 bg-panel/95 p-3 text-ink shadow-glow backdrop-blur lg:hidden">
        <button
          type="button"
          className="mb-2 w-full text-left text-xs font-semibold uppercase tracking-[0.28em] text-ink/70"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "Hide quick actions" : "Show quick actions"}
        </button>
        {mobileOpen && (
          <div className="space-y-3">
            <a
              href={`tel:${CONTACT_PHONE_DIGITS}`}
              className="block rounded-xl border border-outline/50 bg-secondary px-4 py-3 text-center text-sm font-semibold text-secondaryfg transition hover:border-accent"
            >
              Call {CONTACT_PHONE}
            </a>
            <Link
              href="/contact#contact-form"
              className="block rounded-xl bg-gold px-4 py-3 text-center text-sm font-bold uppercase tracking-[0.3em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold"
            >
              Get In Touch
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

