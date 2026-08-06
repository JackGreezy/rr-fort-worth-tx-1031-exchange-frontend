import { NextResponse, type NextRequest } from "next/server";

const TOKEN_FIELDS = ["cf-turnstile-response", "turnstileToken", "turnstile_token"] as const;

function failureResponse(request: NextRequest, status: number, message: string) {
  const contentType = request.headers.get("content-type") || "";
  const acceptsJson = (request.headers.get("accept") || "").includes("application/json");
  if (contentType.includes("application/json") || acceptsJson) {
    return NextResponse.json({ ok: false, success: false, error: message }, { status });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/contact";
  url.search = "?formError=verification";
  return NextResponse.redirect(url, 303);
}

async function contactToken(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const body = (await request.clone().json()) as Record<string, unknown>;
      for (const field of TOKEN_FIELDS) {
        const value = body[field];
        if (typeof value === "string" && value) return value;
      }
      return "";
    }

    const form = await request.clone().formData();
    for (const field of TOKEN_FIELDS) {
      const value = form.get(field);
      if (typeof value === "string" && value) return value;
    }
  } catch {
    return "";
  }
  return "";
}

export async function protectContactRequest(request: NextRequest) {
  if (request.method !== "POST" || request.nextUrl.pathname !== "/api/contact") {
    return null;
  }

  const secret = (process.env.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET || "").trim();
  if (!secret) {
    console.error("Turnstile is not configured for the contact endpoint");
    return failureResponse(request, 503, "Security verification is temporarily unavailable. Please try again shortly.");
  }

  const token = await contactToken(request);
  if (!token) {
    return failureResponse(request, 400, "Please complete the security verification and try again.");
  }

  const payload = new URLSearchParams({ secret, response: token });
  const remoteIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip");
  if (remoteIp) payload.set("remoteip", remoteIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: payload,
      cache: "no-store",
    });
    const result = (await response.json()) as { success?: boolean };
    if (response.ok && result.success === true) return null;
  } catch (error) {
    console.error("Turnstile verification failed", error);
  }

  return failureResponse(request, 400, "Security verification failed. Please refresh the page and try again.");
}
