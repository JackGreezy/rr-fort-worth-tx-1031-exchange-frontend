export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { siteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "" },
    { headers: { "cache-control": "no-store, max-age=0" } },
  );
}
