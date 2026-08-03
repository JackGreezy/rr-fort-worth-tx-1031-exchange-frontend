import { ContactFormWrapper } from "./contact-form";
import { CONTACT_PHONE, CONTACT_PHONE_DIGITS } from "@/lib/constants";

export const metadata = {
  title: "Free 1031 Exchange Guidance | Fort Worth",
  description: "Call or submit the short form for free Fort Worth 1031 exchange guidance, replacement property options, and help planning a property sale.",
};

export default function ContactPage() {
  return (
    <main className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-16 text-center">
          <span className="subheading mb-4 block">Free Exchange Guidance</span>
          <h1 className="heading-display text-white">
            Start With the Property Sale
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            Tell us what you are selling, where the transaction stands, and what you want the replacement investment to accomplish. The form is intentionally short.
          </p>
          <a href={`tel:${CONTACT_PHONE_DIGITS}`} className="mt-7 inline-flex border border-brand-copper bg-brand-copper px-7 py-3.5 text-sm font-semibold tracking-[0.08em] text-black transition hover:bg-brand-copper-light">
            CALL {CONTACT_PHONE}
          </a>
        </div>
        <ContactFormWrapper />
      </div>
    </main>
  );
}
