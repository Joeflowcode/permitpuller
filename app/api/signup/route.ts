import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { claimSignup } from "../../../lib/claim-signup";
import {
  isUsableContact,
  normalizeContact,
  SIGNUP_COOKIE_MAX_AGE,
  signupContactKey,
  signupCookieName,
  type SignupCity,
} from "../../../lib/signup";

const SALEM_TRADES = new Set(["Flooring", "HVAC", "Fence", "Paint", "Landscape", "Windows", "Other"]);
const PORTLAND_TRADES = new Set([...SALEM_TRADES, "Dumpster"]);

function parseCity(raw: string): SignupCity {
  return raw.trim().toLowerCase() === "portland" ? "portland" : "salem";
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SIGNUP_COOKIE_MAX_AGE,
  };
}

async function markClaimed(city: SignupCity) {
  const jar = await cookies();
  jar.set(signupCookieName(city), "1", cookieOptions());
}

async function alreadyClaimedCookie(city: SignupCity) {
  const jar = await cookies();
  return jar.get(signupCookieName(city))?.value === "1";
}

async function notifyNetlifyForms(fields: {
  name: string;
  trade: string;
  contact: string;
  city: SignupCity;
  subject: string;
}) {
  const origin =
    process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://salem-permit-list.netlify.app";
  const body = new URLSearchParams({
    "form-name": "permit-list",
    subject: fields.subject,
    city: fields.city,
    name: fields.name,
    trade: fields.trade,
    contact: fields.contact,
  });
  await fetch(`${origin}/__forms.html`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
}

export async function POST(request: Request) {
  let payload: Record<string, string> = {};
  try {
    payload = (await request.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ status: "error", message: "Bad request" }, { status: 400 });
  }

  if (payload["bot-field"]) {
    return NextResponse.json({ status: "ok" });
  }

  const city = parseCity(String(payload.city || "salem"));
  const subject = city === "portland" ? "PERMIT LIST PORTLAND" : "PERMIT LIST";
  const name = String(payload.name || "").trim();
  const trade = String(payload.trade || "").trim();
  const contact = String(payload.contact || "").trim();
  const normalized = normalizeContact(contact);
  const allowedTrades = city === "portland" ? PORTLAND_TRADES : SALEM_TRADES;

  if (!name || !allowedTrades.has(trade) || !isUsableContact(normalized)) {
    return NextResponse.json(
      { status: "invalid", message: "Use a real email or a 10-digit phone." },
      { status: 400 },
    );
  }

  if (await alreadyClaimedCookie(city)) {
    return NextResponse.json({ status: "already" });
  }

  let result: "ok" | "already" = "ok";
  try {
    result = await claimSignup({
      contactKey: signupContactKey(city, normalized.key),
      name,
      trade,
      contact,
    });
  } catch {
    result = "ok";
  }

  if (result === "already") {
    await markClaimed(city);
    return NextResponse.json({ status: "already" });
  }

  try {
    await notifyNetlifyForms({ name, trade, contact, city, subject });
  } catch {
    // Signup is already recorded. Joey still has the row even if the form email misses.
  }

  await markClaimed(city);
  return NextResponse.json({ status: "ok" });
}
