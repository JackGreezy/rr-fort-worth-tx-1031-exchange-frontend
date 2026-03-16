import { NextRequest, NextResponse } from "next/server";
import { getBrand } from '@/lib/brand';
import { sendCustomerConfirmation, sendInternalNotifications } from '@/lib/email/sendgrid';
import { apiRateLimiter } from '@/lib/rate-limit';
import { verifyTurnstile } from '@/lib/turnstile';

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  timeline?: string;
  details: string;
  turnstileToken?: string;
  property?: string;
  estimatedCloseDate?: string;
  city?: string;
  message?: string;
}

async function sendToZapier(data: ContactFormData): Promise<boolean> {
  const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL || process.env.ZAPIER_WEBHOOK;
  if (!zapierWebhookUrl) {
    console.warn("ZAPIER_WEBHOOK not set, skipping Zapier");
    return true;
  }

  try {
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.ok;
  } catch (error) {
    console.error("Zapier error:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const rateLimitResult = apiRateLimiter.isAllowed(request);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
    }

    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.phone || !body.projectType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (body.turnstileToken) {
      const isValid = await verifyTurnstile(body.turnstileToken);
      if (!isValid) {
        return NextResponse.json({ error: "Invalid verification token" }, { status: 400 });
      }
    }

    await sendToZapier(body);

    const brand = getBrand();
    const lead = {
      name: String(body.name || ''),
      email: String(body.email || ''),
      phone: body.phone ? String(body.phone).replace(/\D/g, '') : undefined,
      phone_plain: body.phone ? String(body.phone).replace(/\D/g, '') : undefined,
      projectType: String(body.projectType || '1031 Exchange Project'),
      property: body.property ? String(body.property) : undefined,
      estimatedCloseDate: body.estimatedCloseDate ? String(body.estimatedCloseDate) : undefined,
      city: body.city ? String(body.city) : undefined,
      company: body.company ? String(body.company) : undefined,
      timeline: body.timeline ? String(body.timeline) : undefined,
      message: body.message ? String(body.message) : (body.details ? String(body.details) : undefined),
    };

    const brandWithDate = {
      ...brand,
      submitted_date: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    };

    try {
      await Promise.all([
        sendCustomerConfirmation(brandWithDate, lead),
        sendInternalNotifications(brandWithDate, lead),
      ]);
    } catch (error) {
      console.error("SendGrid email failed", error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
