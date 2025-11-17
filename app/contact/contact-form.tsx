'use client';

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";
import clsx from "clsx";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DIGITS,
  FORM_INPUT_IDS,
} from "@/lib/constants";

declare global {
  interface Window {
    turnstile?: TurnstileWindow;
  }
}

type TurnstileWindow = {
  render: (element: HTMLElement, options: TurnstileOptions) => number;
  reset: (widgetId: number) => void;
};

type TurnstileOptions = {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark";
  tabindex?: number;
};

const TURNSTILE_SCRIPT_ID = "cf-turnstile-script";
const TURNSTILE_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";
const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type ContactFormProps = {
  heading?: string;
  description?: string;
  variant?: "default" | "compact";
  formId?: string;
  prefillProjectType?: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  propertySold: string;
  estimatedClose: string;
  city: string;
  message: string;
};

const defaultState: FormState = {
  name: "",
  email: "",
  phone: "",
  propertySold: "",
  estimatedClose: "",
  city: "",
  message: "",
};

function ContactFormInner({
  heading = "Start your Fort Worth 1031 exchange",
  description = "Share your transaction timeline and we will coordinate a call with our exchange desk.",
  variant = "default",
  formId = "contact-form",
  prefillProjectType,
  projectTypeFromParams,
}: ContactFormProps & { projectTypeFromParams?: string }) {
  const [formState, setFormState] = useState<FormState>(defaultState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const captchaContainerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const contextualNote = projectTypeFromParams || prefillProjectType;

  useEffect(() => {
    if (contextualNote) {
      setFormState((prev) => ({
        ...prev,
        message: prev.message
          ? `${prev.message}\n\nRequested focus: ${contextualNote}`
          : `Requested focus: ${contextualNote}`,
      }));
    }
  }, [contextualNote]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.turnstile) {
      setCaptchaReady(true);
    }
  }, []);

  useEffect(() => {
    if (!captchaReady || !TURNSTILE_SITE_KEY || !captchaContainerRef.current) return;
    if (!window.turnstile) return;
    if (widgetIdRef.current !== null) {
      window.turnstile.reset(widgetIdRef.current);
    }
    widgetIdRef.current = window.turnstile.render(captchaContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      callback: (token) => {
        setCaptchaToken(token);
        setCaptchaError(null);
      },
      "error-callback": () => {
        setCaptchaError("Captcha failed. Please refresh and try again.");
      },
      "expired-callback": () => {
        setCaptchaToken("");
      },
      theme: "light",
      tabindex: 0,
    });
  }, [captchaReady]);

  const resetCaptcha = () => {
    if (widgetIdRef.current !== null && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setCaptchaToken("");
  };

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validate = () => {
    if (!formState.name.trim()) return "Please add your name.";
    if (!formState.email.trim()) return "Please add a valid email.";
    if (!formState.phone.trim()) return "Please add a phone number.";
    if (!formState.propertySold.trim()) return "Tell us what property you sold.";
    if (!formState.estimatedClose.trim()) return "Add your target closing date.";
    if (!formState.city.trim()) return "Share the city you are investing from.";
    if (!formState.message.trim()) return "Add a brief message.";
    if (!captchaToken) return "Please complete the CAPTCHA challenge.";
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setCaptchaError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setStatus("submitting");
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
      setFormState(defaultState);
      resetCaptcha();
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError("We could not send that message. Please try again or call us.");
      resetCaptcha();
    }
  };

  const siteKeyMissing = !TURNSTILE_SITE_KEY;

  return (
    <>
      <Script
        src={TURNSTILE_SRC}
        id={TURNSTILE_SCRIPT_ID}
        strategy="lazyOnload"
        onLoad={() => setCaptchaReady(true)}
      />
      <section
        id={formId}
        className={clsx(
          "rounded-3xl border border-outline/60 bg-panel p-6 shadow-[0_20px_48px_rgba(21,34,59,0.1)]",
          variant === "compact" && "p-5"
        )}
      >
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.32em] text-heading/60">Secure Intake</p>
          <h3 className="font-serif text-2xl font-semibold text-heading">{heading}</h3>
          <p className="text-sm text-ink/80">
            {description} All submissions include a timestamp for {timezone}.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id={FORM_INPUT_IDS.name}
              label="Name"
              placeholder="Full name"
              required
              value={formState.name}
              onChange={handleChange("name")}
            />
            <InputField
              id={FORM_INPUT_IDS.email}
              label="Email"
              placeholder="you@example.com"
              type="email"
              required
              value={formState.email}
              onChange={handleChange("email")}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id={FORM_INPUT_IDS.phone}
              label="Phone"
              placeholder="817-555-0123"
              type="tel"
              required
              value={formState.phone}
              onChange={handleChange("phone")}
            />
            <InputField
              id={FORM_INPUT_IDS.city}
              label="City"
              placeholder="City you are investing from"
              required
              value={formState.city}
              onChange={handleChange("city")}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <InputField
              id={FORM_INPUT_IDS.propertySold}
              label="Property sold"
              placeholder="Asset sold or equity to defer"
              required
              value={formState.propertySold}
              onChange={handleChange("propertySold")}
            />
            <InputField
              id={FORM_INPUT_IDS.estimatedClose}
              label="Estimated close"
              placeholder="Target closing date"
              required
              value={formState.estimatedClose}
              onChange={handleChange("estimatedClose")}
            />
          </div>

          <div>
            <label htmlFor={FORM_INPUT_IDS.message} className="mb-2 block text-sm font-semibold text-heading">
              Message
            </label>
            <textarea
              id={FORM_INPUT_IDS.message}
              name="message"
              placeholder="Share your 45/180 timeline, property type focus, or questions."
              className="min-h-[140px] w-full rounded-2xl border border-outline/60 bg-secondary/30 p-3 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none"
              value={formState.message}
              onChange={handleChange("message")}
            />
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div ref={captchaContainerRef} />
            {!captchaReady && !siteKeyMissing && <p className="text-ink/60">Loading security challenge...</p>}
            {siteKeyMissing && (
              <p className="text-xs text-red-500">Turnstile site key missing. Please set NEXT_PUBLIC_TURNSTILE_SITE_KEY.</p>
            )}
            {captchaError && <p className="text-xs text-red-500">{captchaError}</p>}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-ink transition hover:-translate-y-0.5 hover:shadow-gold disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "submitting" || !captchaToken || siteKeyMissing || !captchaReady}
          >
            {status === "submitting" ? "Sending..." : "Start My Exchange"}
          </button>

          {status === "success" && (
            <p className="text-sm text-primary">Thank you. Our team will confirm receipt shortly.</p>
          )}

          <div className="text-xs text-ink/60">
            <p>
              Prefer to talk now? Call {" "}
              <a className="text-accent underline" href={`tel:${CONTACT_PHONE_DIGITS}`}>
                {CONTACT_PHONE}
              </a>{" "}
              or email {" "}
              <a className="text-accent underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </form>
      </section>
    </>
  );
}

function ContactFormWithSearchParams(props: ContactFormProps) {
  const params = useSearchParams();
  const projectTypeFromParams = params?.get("projectType") || undefined;

  return <ContactFormInner {...props} projectTypeFromParams={projectTypeFromParams} />;
}

export default function ContactForm(props: ContactFormProps) {
  return (
    <Suspense fallback={<div className="rounded-3xl border border-outline/60 bg-panel p-6">Loading form...</div>}>
      <ContactFormWithSearchParams {...props} />
    </Suspense>
  );
}

type InputFieldProps = {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
};

function InputField({ id, label, placeholder, value, onChange, type = "text", required }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-heading">
        {label} {required && <span className="text-heading/50">(required)</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="rounded-full border border-outline/60 bg-panel px-4 py-2.5 text-sm text-ink placeholder:text-ink/50 focus:border-accent focus:outline-none"
      />
    </div>
  );
}

