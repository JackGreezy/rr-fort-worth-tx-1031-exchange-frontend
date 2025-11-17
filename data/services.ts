import type { ServiceItem } from "./types";
import { PRIMARY_CITY, PRIMARY_STATE_ABBR } from "@/lib/constants";
import { getMergedServices } from "@/lib/merge-batch-data";

const citySlug = PRIMARY_CITY.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const createService = (
  slug: string,
  name: string,
  short: string,
  category: ServiceItem["category"]
): ServiceItem => ({
  slug,
  name,
  short,
  route: `/services/${slug}`,
  category,
});

const identificationBlueprint = [
  {
    key: "nnn-retail-identification",
    label: "NNN Retail Replacement Property Identification",
    detail: "Convenience, pharmacy, and everyday retail nets vetted for 10-year terms",
  },
  {
    key: "drive-thru-qsr-identification",
    label: "Drive Thru QSR 1031 Buyer Desk",
    detail: "Curated drive-thru quick service restaurants with verified sales comps",
  },
  {
    key: "pharmacy-healthcare-identification",
    label: "Pharmacy And Healthcare Net Lease Discovery",
    detail: "Credit pharmacies and urgent care clinics with corporate guarantees",
  },
  {
    key: "grocery-anchored-identification",
    label: "Grocery Anchored Shopping Center Targeting",
    detail: "Neighborhood grocery anchors with documented rent escalations",
  },
  {
    key: "industrial-last-mile-identification",
    label: "Last Mile Industrial Replacement Search",
    detail: "Shallow bay and cross-dock logistics with strong absorption data",
  },
  {
    key: "medical-office-identification",
    label: "Medical Office And Surgery Center Matching",
    detail: "Ambulatory care and specialty clinics with hospital system credit",
  },
  {
    key: "self-storage-identification",
    label: "Self Storage Net Lease Pipeline",
    detail: "Stabilized climate-controlled storage in growth corridors",
  },
  {
    key: "auto-service-identification",
    label: "Auto Service And EV Bay Identification",
    detail: "Maintenance, tire, and EV-ready bays with triple net leases",
  },
  {
    key: "zero-cash-flow-identification",
    label: "Zero Cash Flow And Sale Leaseback Sourcing",
    detail: "Structured debt offset deals aligned with lender DSCR targets",
  },
  {
    key: "ground-lease-identification",
    label: "Ground Lease And Outparcel Acquisition",
    detail: "Fee simple dirt with CPI bumps and tenant-controlled improvements",
  },
  {
    key: "multifamily-identification",
    label: "Multifamily Midrise Replacement List",
    detail: "Stabilized midrise and mixed use multi-housing near transit nodes",
  },
  {
    key: "hospitality-identification",
    label: "Hospitality And Select Service Hotel Discovery",
    detail: "Flagged hotels with corporate-backed leases for passive owners",
  },
];

const timelineBlueprint = [
  {
    key: "fort-worth-45-day-sprint",
    label: "Fort Worth 45 Day Identification Sprint",
    detail: "Calendar control, reminder stack, and proof of contact logs",
    category: "Timelines",
  },
  {
    key: "fort-worth-180-day-close-control",
    label: "Fort Worth 180 Day Close Control",
    detail: "Gantt style milestone tracking with lender and QI check-ins",
    category: "Timelines",
  },
  {
    key: "reverse-exchange-pursuit",
    label: "Reverse Exchange Pursuit Desk",
    detail: "Bridge lender introductions and parking entity oversight",
    category: "Structures",
  },
  {
    key: "improvement-exchange-support",
    label: "Improvement Exchange Support",
    detail: "Capex budgeting and draw inspection coordination",
    category: "Structures",
  },
  {
    key: "build-to-suit-readiness",
    label: "Build To Suit Exchange Readiness",
    detail: "Entitlement tracking and GMP review tied to the 180 day clock",
    category: "Structures",
  },
  {
    key: "three-property-rule-guardrails",
    label: "Three Property Rule Guardrails",
    detail: "Exact match validation with redundant document storage",
    category: "Execution",
  },
  {
    key: "two-hundred-percent-rule-mapping",
    label: "Two Hundred Percent Rule Mapping",
    detail: "Valuation waterfalls and substitution protocols",
    category: "Execution",
  },
  {
    key: "ninety-five-percent-rule-coverage",
    label: "Ninety Five Percent Rule Coverage",
    detail: "Acquisition scheduling when capital stacks exceed 200 percent",
    category: "Execution",
  },
];

const planningBlueprint = [
  {
    key: "rent-roll-audit",
    label: "Rent Roll Verification And Tenant Vetting",
    detail: "Source-stamped AR, estoppel, and occupancy checks in Fort Worth, TX",
    category: "Education",
  },
  {
    key: "twelve-month-trailing-review",
    label: "Trailing Twelve Review And NOI Breakdowns",
    detail: "T12 variance notes plus stress tests for Fort Worth, TX lenders",
    category: "Education",
  },
  {
    key: "capex-reserve-planning",
    label: "Capex Reserve And Replacement Planning",
    detail: "Roof, paving, HVAC, and TI reserve models tied to asset plans",
    category: "Execution",
  },
  {
    key: "market-comp-pulls",
    label: "Market Comp Pulls And Lease Benchmarking",
    detail: "Submarket rent, sale, and absorption comp sets for North Texas",
    category: "Education",
  },
  {
    key: "lender-preflight-readiness",
    label: "Lender Preflight And DSCR Packaging",
    detail: "Credit memos, rent rolls, and sponsor bios formatted for term sheets",
    category: "Execution",
  },
  {
    key: "dst-placement-readiness",
    label: "DST Placement Readiness Support",
    detail: "Matchmaking with licensed DST sponsors after suitability review",
    category: "Property Paths",
  },
  {
    key: "qi-and-legal-coordination",
    label: "Qualified Intermediary And Counsel Coordination",
    detail: "Secure document transfers plus checklist sharing in Fort Worth, TX",
    category: "Execution",
  },
  {
    key: "portfolio-exit-modeling",
    label: "Portfolio Exit And Tax Deferral Modeling",
    detail: "Hold-sell dashboards with basis tracking for Texas investors",
    category: "Tax",
  },
];

const identificationServices = identificationBlueprint.map((item) =>
  createService(
    `${item.key}-${citySlug}`,
    `${item.label} In ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}`,
    `${item.detail} for buyers targeting ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR}.`,
    "Property Paths"
  )
);

const timelineServices = timelineBlueprint.map((item) =>
  createService(
    item.key,
    item.label,
    `${item.detail}. All reporting includes ${PRIMARY_CITY}, ${PRIMARY_STATE_ABBR} timestamps.`,
    item.category
  )
);

const planningServices = planningBlueprint.map((item) =>
  createService(
    item.key,
    item.label,
    item.detail,
    item.category
  )
);

const baseServicesData: ServiceItem[] = [
  ...identificationServices,
  ...timelineServices,
  ...planningServices,
];

// Merge with batch data
export const servicesData: ServiceItem[] = getMergedServices(baseServicesData);

