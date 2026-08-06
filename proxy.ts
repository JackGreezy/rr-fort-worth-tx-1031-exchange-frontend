import { type NextRequest } from "next/server";
import { protectContactRequest } from "./lib/contact-turnstile-server";

export async function proxy(request: NextRequest) {
  return (await protectContactRequest(request)) ?? undefined;
}

export const config = { matcher: "/api/contact" };
