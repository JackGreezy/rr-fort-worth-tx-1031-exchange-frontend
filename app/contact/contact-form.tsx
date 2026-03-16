"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { FormEvent } from "react";

declare global {
  interface Window {
    _turnstileLoaded?: boolean;
    _lastTurnstileToken?: string;
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      execute: (widgetId: string, options?: Record<string, unknown>) => Promise<string>;
      reset: (widgetId: string) => void;
    };
  }
}

function loadTurnstile(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window._turnstileLoaded) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src^="https://challenges.cloudflare.com/turnstile/v0/api.js"]'
    );
    if (existing) {
      window._turnstileLoaded = true;
      return resolve();
    }
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.defer = true;
    s.onload = () => { window._turnstileLoaded = true; resolve(); };
    s.onerror = () => reject(new Error("Turnstile script failed to load"));
    document.head.appendChild(s);
  });
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  city: string;
  property: string;
  estimatedCloseDate: string;
  company: string;
  timeline: string;
  message: string;
};

function ContactForm() {
  const captchaRef = useRef<HTMLDivElement | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", phone: "", projectType: "", city: "",
    property: "", estimatedCloseDate: "", company: "", timeline: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileId, setTurnstileId] = useState<string | null>(null);
  const [turnstileReady, setTurnstileReady] = useState(false);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    let cancelled = false;
    const initTimeout = setTimeout(async () => {
      if (cancelled || !siteKey) return;
      try {
        await loadTurnstile();
        if (cancelled || !window.turnstile || !captchaRef.current) return;
        const id: string = window.turnstile.render(captchaRef.current, {
          sitekey: siteKey,
          size: "normal",
          callback: () => setTurnstileReady(true),
          "error-callback": () => setTurnstileReady(false),
          "timeout-callback": () => setTurnstileReady(false),
        });
        setTurnstileId(id);
        setTurnstileReady(true);
      } catch (error) {
        console.error("Failed to initialize Turnstile:", error);
        setTurnstileReady(false);
      }
    }, 500);
    return () => { cancelled = true; clearTimeout(initTimeout); };
  }, [siteKey]);

  useEffect(() => {
    if (window.location.hash === "#contact-form") {
      const el = document.getElementById("contact-form");
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, []);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.projectType.trim()) newErrors.projectType = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) { setFeedback("Please complete all required fields."); return; }
    setStatus("submitting");
    setErrors({});
    setFeedback("");

    try {
      if (siteKey && (!turnstileReady || !window.turnstile || !turnstileId)) {
        setFeedback("Please complete the security verification.");
        setStatus("error");
        return;
      }

      let turnstileToken = '';
      if (siteKey && window.turnstile && turnstileId) {
        try {
          window.turnstile.reset(turnstileId);
          turnstileToken = await new Promise<string>((resolve, reject) => {
            if (!window.turnstile) { reject(new Error("Turnstile not available")); return; }
            window.turnstile.execute(turnstileId, {
              async: true, action: "form_submit",
              callback: (t: string) => resolve(t),
              "error-callback": () => reject(new Error("turnstile-error")),
              "timeout-callback": () => reject(new Error("turnstile-timeout")),
            });
          });
        } catch {
          setFeedback("Security verification failed. Please try again.");
          setStatus("error");
          if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
          return;
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, email: formData.email,
          phone: formData.phone.replace(/\D/g, ''),
          projectType: formData.projectType, city: formData.city,
          property: formData.property, estimatedCloseDate: formData.estimatedCloseDate,
          company: formData.company, timeline: formData.timeline,
          details: formData.message, turnstileToken,
        }),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", phone: "", projectType: "", city: "", property: "", estimatedCloseDate: "", company: "", timeline: "", message: "" });
        if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
        setStatus("success");
        setFeedback("Thank you. An exchange specialist will follow up within one business day.");
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to submit form' }));
        setFeedback(errorData.error || 'Failed to submit form. Please try again.');
        setStatus("error");
        if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
      }
    } catch {
      setFeedback("An error occurred. Please try again or contact us directly.");
      setStatus("error");
      if (window.turnstile && turnstileId) window.turnstile.reset(turnstileId);
    }
  };

  return (
    <div id="contact-form" className="border border-white/10 bg-brand-charcoal/50 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <fieldset disabled={status === "submitting"} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Name <span className="text-brand-copper">*</span></label>
              <input id="name" type="text" required value={formData.name} onChange={handleChange("name")} aria-describedby={errors.name ? "name-error" : undefined} aria-invalid={!!errors.name} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-copper focus:outline-none transition-colors" placeholder="Your name" />
              {errors.name && <p id="name-error" className="mt-1 text-xs text-red-400">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Email <span className="text-brand-copper">*</span></label>
              <input id="email" type="email" required value={formData.email} onChange={handleChange("email")} aria-describedby={errors.email ? "email-error" : undefined} aria-invalid={!!errors.email} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-copper focus:outline-none transition-colors" placeholder="your@email.com" />
              {errors.email && <p id="email-error" className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Phone <span className="text-brand-copper">*</span></label>
              <input id="phone" type="tel" required value={formData.phone} onChange={handleChange("phone")} aria-describedby={errors.phone ? "phone-error" : undefined} aria-invalid={!!errors.phone} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-copper focus:outline-none transition-colors" placeholder="(555) 555-5555" />
              {errors.phone && <p id="phone-error" className="mt-1 text-xs text-red-400">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="company" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Company</label>
              <input id="company" type="text" value={formData.company} onChange={handleChange("company")} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-copper focus:outline-none transition-colors" placeholder="Company name (optional)" />
            </div>
          </div>
          <div>
            <label htmlFor="projectType" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Service <span className="text-brand-copper">*</span></label>
            <select id="projectType" required value={formData.projectType} onChange={handleChange("projectType")} aria-describedby={errors.projectType ? "projectType-error" : undefined} aria-invalid={!!errors.projectType} className="w-full bg-brand-dark border border-white/20 px-4 py-3 text-sm text-white focus:border-brand-copper focus:outline-none transition-colors">
              <option value="">Select a service</option>
              <option value="Forward Exchange">Forward Exchange</option>
              <option value="Reverse Exchange">Reverse Exchange</option>
              <option value="Qualified Intermediary Services">Qualified Intermediary Services</option>
              <option value="Property Identification">Property Identification</option>
              <option value="NNN Property Identification">NNN Property Identification</option>
              <option value="Exchange Consultation">Exchange Consultation</option>
              <option value="Form 8824 Preparation">Form 8824 Preparation</option>
              <option value="Boot Analysis">Boot Analysis</option>
            </select>
            {errors.projectType && <p id="projectType-error" className="mt-1 text-xs text-red-400">{errors.projectType}</p>}
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="city" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">City</label>
              <input id="city" type="text" value={formData.city} onChange={handleChange("city")} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-copper focus:outline-none transition-colors" placeholder="Primary metro (optional)" />
            </div>
            <div>
              <label htmlFor="timeline" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Timeline</label>
              <select id="timeline" value={formData.timeline} onChange={handleChange("timeline")} className="w-full bg-brand-dark border border-white/20 px-4 py-3 text-sm text-white focus:border-brand-copper focus:outline-none transition-colors">
                <option value="">Select timeline (optional)</option>
                <option value="Immediate">Immediate</option>
                <option value="45 days">45 days</option>
                <option value="180 days">180 days</option>
                <option value="Planning phase">Planning phase</option>
              </select>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="property" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Property Being Sold</label>
              <input id="property" type="text" value={formData.property} onChange={handleChange("property")} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-copper focus:outline-none transition-colors" placeholder="Type, location, value (optional)" />
            </div>
            <div>
              <label htmlFor="estimatedCloseDate" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Estimated Close Date</label>
              <input id="estimatedCloseDate" type="date" value={formData.estimatedCloseDate} onChange={handleChange("estimatedCloseDate")} className="w-full bg-brand-dark border border-white/20 px-4 py-3 text-sm text-white focus:border-brand-copper focus:outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-widest text-white/60">Message</label>
            <textarea id="message" rows={4} value={formData.message} onChange={handleChange("message")} className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder-white/40 focus:border-brand-copper focus:outline-none transition-colors resize-none" placeholder="Goals, preferences, or coordination needs (optional)" />
          </div>
          {siteKey && (
            <div className="flex justify-center">
              <div ref={captchaRef} className="min-h-[78px]" />
            </div>
          )}
          <button type="submit" disabled={status === "submitting" || !!(siteKey && !turnstileReady)} className="w-full border border-brand-copper bg-brand-copper px-8 py-4 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 hover:bg-brand-copper-light disabled:opacity-50 disabled:cursor-not-allowed">
            {status === "submitting" ? "Submitting..." : "Submit →"}
          </button>
          <p className="text-xs text-white/40 text-center">Educational content only. Not tax or legal advice.</p>
          {feedback && (
            <p role="status" aria-live="polite" className={"text-sm text-center " + (status === "success" ? "text-green-400" : "text-red-400")}>{feedback}</p>
          )}
        </fieldset>
      </form>
    </div>
  );
}

export function ContactFormWrapper() {
  return (
    <Suspense fallback={<div className="border border-white/10 bg-brand-charcoal/50 p-8 text-white/60">Loading form...</div>}>
      <ContactForm />
    </Suspense>
  );
}
