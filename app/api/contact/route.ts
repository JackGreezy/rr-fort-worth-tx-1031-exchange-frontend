import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ExchangeLead = {
  name: string;
  email: string;
  phone: string;
  hasCompleted1031: string;
  notes: string;
};

const aliases = {
  name: ["name", "fullName", "full_name", "contactName"],
  email: ["email", "emailAddress", "email_address"],
  phone: ["phone", "phoneNumber", "phone_number"],
  hasCompleted1031: [
    "hasCompleted1031", "completed1031", "prior1031", "exchangeExperience",
    "projectType", "serviceType", "propertyLocation", "property", "timeline",
    "Have You Completed a 1031 Exchange Before?", "Prior 1031 Exchange Experience?",
    "Have You Done a 1031 Exchange Before?", "Previously Completed a 1031 Exchange?",
    "Have You Used a 1031 Exchange Before?",
  ],
  notes: [
    "notes", "message", "details", "projectDetails", "project_details", "additionalNotes",
    "Notes", "Exchange Notes", "Additional Notes", "Exchange Details",
    "What Should We Know?", "Additional Context",
  ],
} as const;

function normalizedKey(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeLead(body: Record<string, unknown>): ExchangeLead {
  const values = new Map(
    Object.entries(body).map(([key, value]) => [normalizedKey(key), typeof value === "string" ? value.trim() : ""]),
  );
  const pick = (keys: readonly string[]) => {
    for (const key of keys) {
      const value = values.get(normalizedKey(key));
      if (value) return value;
    }
    return "";
  };
  return {
    name: pick(aliases.name),
    email: pick(aliases.email),
    phone: pick(aliases.phone),
    hasCompleted1031: pick(aliases.hasCompleted1031),
    notes: pick(aliases.notes),
  };
}

const BLOCKED_INQUIRY_TERMS = /(?:\b(?:domain|index)\w*|\bseo\b)/i;

function containsBlockedInquiryMessage(message: string) {
  return BLOCKED_INQUIRY_TERMS.test(message);
}

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  limit: number;
  remaining: number;
  retryAfter: number;
};

const IP_RATE_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 } as const;
const EMAIL_RATE_LIMIT = { limit: 3, windowMs: 60 * 60 * 1000 } as const;
const rateLimitGlobal = globalThis as typeof globalThis & {
  __rrContactRateLimits?: Map<string, RateLimitBucket>;
};
const rateLimitStore = rateLimitGlobal.__rrContactRateLimits ??= new Map<string, RateLimitBucket>();

function requestIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    ""
  );
}

function consumeRateLimit(key: string, limit: number, windowMs: number, now: number): RateLimitResult | null {
  const current = rateLimitStore.get(key);
  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  if (current.count >= limit) {
    return {
      limit,
      remaining: 0,
      retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }
  current.count += 1;
  return null;
}

function checkRateLimit(request: Request, lead: ExchangeLead) {
  const now = Date.now();
  if (rateLimitStore.size > 10_000) {
    for (const [key, bucket] of rateLimitStore) {
      if (bucket.resetAt <= now) rateLimitStore.delete(key);
    }
  }
  const ip = requestIp(request);
  if (ip) {
    const result = consumeRateLimit(`ip:${ip}`, IP_RATE_LIMIT.limit, IP_RATE_LIMIT.windowMs, now);
    if (result) return result;
  }
  const email = lead.email.trim().toLowerCase();
  if (email) {
    const result = consumeRateLimit(`email:${email}`, EMAIL_RATE_LIMIT.limit, EMAIL_RATE_LIMIT.windowMs, now);
    if (result) return result;
  }
  return null;
}

function rateLimitedResponse(request: Request, wantsJson: boolean, result: RateLimitResult) {
  const headers = {
    "Retry-After": String(result.retryAfter),
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
  };
  if (!wantsJson) {
    const response = NextResponse.redirect(new URL("/contact?formError=rate-limited", request.url), 303);
    for (const [name, value] of Object.entries(headers)) response.headers.set(name, value);
    return response;
  }
  return NextResponse.json(
    { ok: false, error: "Too many contact requests. Please wait before trying again." },
    { status: 429, headers },
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
  })[character] ?? character);
}

function splitEmails(value: string | undefined) {
  return (value ?? "").split(",").map((email) => email.trim()).filter(Boolean);
}

async function sendMail(apiKey: string, message: Record<string, unknown>) {
  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(message),
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`SendGrid rejected the request (${response.status}): ${detail}`);
  }
}

function emailShell(siteName: string, preheader: string, content: string) {
  return `<!doctype html>
  <html><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#172033">
    <div style="display:none;max-height:0;overflow:hidden">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f3f4f6;padding:28px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(23,32,51,.10)">
          <tr><td style="background:#172033;padding:24px 30px;color:#ffffff;font-size:20px;font-weight:700">${escapeHtml(siteName)}</td></tr>
          <tr><td style="padding:30px">${content}</td></tr>
          <tr><td style="padding:18px 30px;background:#f8fafc;color:#687386;font-size:12px;line-height:1.5">This message was sent from the contact form at ${escapeHtml(siteName)}.</td></tr>
        </table>
      </td></tr>
    </table>
  </body></html>`;
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  const wantsJson = contentType.includes("application/json");
  try {
    const raw = wantsJson
      ? ((await request.json()) as Record<string, unknown>)
      : Object.fromEntries((await request.formData()).entries());
    const lead = normalizeLead(raw);
    if (containsBlockedInquiryMessage(lead.notes)) {
      if (!wantsJson) return NextResponse.redirect(new URL("/contact?submitted=1", request.url), 303);
      return NextResponse.json({ ok: true, success: true });
    }
    const rateLimit = checkRateLimit(request, lead);
    if (rateLimit) return rateLimitedResponse(request, wantsJson, rateLimit);
    const missing = (["name", "email", "phone", "hasCompleted1031"] as const).filter((field) => !lead[field]);
    if (missing.length) {
      if (!wantsJson) return NextResponse.redirect(new URL("/contact?formError=missing-fields", request.url), 303);
      return NextResponse.json({ ok: false, error: "Please complete every required contact field.", missing }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.SENDGRID_API_KEY?.trim();
    if (!apiKey) return NextResponse.json({ ok: false, error: "Email configuration error." }, { status: 500 });

    const siteUrl = process.env.EMAIL_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const hostname = new URL(siteUrl).hostname.replace(/^www\./, "");
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME?.trim() || hostname;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL?.trim() || process.env.BUSINESS_EMAIL?.trim() || process.env.CONTACT_EMAIL?.trim() || `info@${hostname}`;
    const recipients = Array.from(new Set([
      ...splitEmails(process.env.BUSINESS_EMAIL),
      ...splitEmails(process.env.CONTACT_EMAIL),
      ...splitEmails(process.env.CONTRACTOR_EMAIL),
      "rankhoundseo@gmail.com",
    ])).filter((email) => email !== lead.email);
    const safe = Object.fromEntries(Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)])) as ExchangeLead;
    const notes = safe.notes ? safe.notes.replace(/\n/g, "<br>") : "No additional notes provided.";

    const internalHtml = emailShell(siteName, `New 1031 exchange inquiry from ${lead.name}`, `
      <p style="margin:0 0 8px;color:#64748b;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">New website inquiry</p>
      <h1 style="margin:0 0 22px;font-size:26px;line-height:1.25;color:#172033">1031 exchange contact request</h1>
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;line-height:1.55">
        <tr><td style="padding:9px 0;color:#64748b;width:190px">Name</td><td style="padding:9px 0;font-weight:700">${safe.name}</td></tr>
        <tr><td style="padding:9px 0;color:#64748b">Email</td><td style="padding:9px 0"><a href="mailto:${safe.email}" style="color:#1565c0">${safe.email}</a></td></tr>
        <tr><td style="padding:9px 0;color:#64748b">Phone</td><td style="padding:9px 0">${safe.phone}</td></tr>
        <tr><td style="padding:9px 0;color:#64748b">Completed a 1031 before?</td><td style="padding:9px 0;font-weight:700">${safe.hasCompleted1031}</td></tr>
      </table>
      <div style="margin-top:22px;padding:18px;background:#f8fafc;border-radius:10px"><strong>Notes</strong><p style="margin:8px 0 0;line-height:1.6">${notes}</p></div>
      <p style="margin:22px 0 0;color:#64748b;font-size:13px">Source: ${escapeHtml(siteUrl)}</p>
    `);
    const confirmationHtml = emailShell(siteName, "We received your 1031 exchange inquiry", `
      <h1 style="margin:0 0 16px;font-size:26px;line-height:1.25;color:#172033">Thanks, ${safe.name}.</h1>
      <p style="margin:0 0 16px;font-size:16px;line-height:1.65">We received your 1031 exchange inquiry. A member of the team will review your information and follow up using the phone number or email address you provided.</p>
      <div style="padding:18px;background:#f8fafc;border-radius:10px;font-size:15px;line-height:1.6"><strong>Prior 1031 exchange experience:</strong> ${safe.hasCompleted1031}<br><strong>Your notes:</strong> ${notes}</div>
    `);

    await Promise.all([
      sendMail(apiKey, {
        personalizations: [{ to: recipients.map((email) => ({ email })) }],
        from: { email: fromEmail, name: siteName },
        reply_to: { email: lead.email, name: lead.name },
        subject: `New 1031 exchange lead: ${lead.name}`,
        content: [{ type: "text/html", value: internalHtml }],
      }),
      sendMail(apiKey, {
        personalizations: [{ to: [{ email: lead.email, name: lead.name }] }],
        from: { email: fromEmail, name: siteName },
        reply_to: { email: fromEmail, name: siteName },
        subject: `We received your inquiry — ${siteName}`,
        content: [{ type: "text/html", value: confirmationHtml }],
      }),
    ]);

    if (!wantsJson) return NextResponse.redirect(new URL("/contact?submitted=1", request.url), 303);
    return NextResponse.json({ ok: true, success: true });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ ok: false, error: "Unable to send your request right now." }, { status: 502 });
  }
}
