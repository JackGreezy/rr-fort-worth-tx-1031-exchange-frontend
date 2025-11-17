import site from "@/content/site.json";

export const PRIMARY_CITY = site.mainCity || "Fort Worth";
export const PRIMARY_STATE_ABBR = site.state || "TX";
export const SITE_URL = `https://${site.website?.replace(/^https?:\/\//, "") || "1031exchangefortworth.com"}`;
export const COMPANY_NAME = site.company;
export const CONTACT_PHONE = site.phone;
export const CONTACT_PHONE_DIGITS = site.phoneDigits;
export const CONTACT_EMAIL = site.email;
export const CONTACT_ADDRESS = site.address;

export const DATE_LOCALE = "en-US";

export const FORM_INPUT_IDS = {
  name: "contact-name-input",
  email: "contact-email-input",
  phone: "contact-phone-input",
  propertySold: "contact-property-sold-input",
  estimatedClose: "contact-estimated-close-input",
  city: "contact-city-input",
  message: "contact-message-input",
};

