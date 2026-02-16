import type { Metadata } from "next";
import {
  COMPANY_NAME,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_DIGITS,
  PRIMARY_CITY,
  PRIMARY_STATE_ABBR,
  SITE_URL,
} from "./constants";

type MetadataArgs = {
  title: string;
  description: string;
  path: string;
};

export const createPageMetadata = ({ title, description, path }: MetadataArgs): Metadata => ({
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}${path}`,
  },
  openGraph: {
    title,
    description,
    url: `${SITE_URL}${path}`,
    siteName: COMPANY_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
});

export const getBreadcrumbJsonLd = (items: Array<{ label: string; href: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.label,
    item: `${SITE_URL}${item.href}`,
  })),
});

export const getProfessionalServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: COMPANY_NAME,
  url: SITE_URL,
  areaServed: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  availableService: "1031 exchange replacement property identification",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: CONTACT_PHONE,
    contactType: "customer support",
    email: CONTACT_EMAIL,
    availableLanguage: ["English"],
  },
});

export const getServiceSchema = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  serviceType: serviceName,
  provider: {
    "@type": "ProfessionalService",
    name: COMPANY_NAME,
    telephone: CONTACT_PHONE,
    areaServed: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  },
  description,
});

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: COMPANY_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/services?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});

export const getContactPointSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ContactPoint",
  telephone: CONTACT_PHONE,
  email: CONTACT_EMAIL,
  contactType: "customer support",
  areaServed: `${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
  availableLanguage: "English",
  contactOption: "TollFree",
});

