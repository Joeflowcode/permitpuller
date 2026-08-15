import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { claimSignup } from "../../../lib/claim-signup";
import { isUsableContact, normalizeContact, SIGNUP_COOKIE, SIGNUP_COOKIE_MAX_AGE } from "../../../lib/signup";

const TRADES = new Set(["Flooring", "HVAC", "Fence", "Paint", "Landscape", "Windows", "Other"]);

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SIGNUP_COOKIE_MAX_AGE,
  };
}

async function markClaimed() {
  const jar = await cookies();
  jar.set(SIGNUP_COOKIE, "1", cookieOptions());
}

async function alreadyClaimedCookie() {
  const jar = await cookies();
  return jar.get(SIGNUP_COOKIE)?.value === "1";
}

async function notifyNetlifyForms(fields: { name: string; trade: string; contact: string }) {
  const origin =
    process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://salem-permit-list.netlify.app";
  const body = new URLSearchParams({
    "form-name": "permit-list",
    subject: "PERMIT LIST",
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

  const name = String(payload.name || "").trim();
  const trade = String(payload.trade || "").trim();
  const contact = String(payload.contact || "").trim();
  const normalized = normalizeContact(contact);

  if (!name || !TRADES.has(trade) || !isUsableContact(normalized)) {
    return NextResponse.json(
      { status: "invalid", message: "Use a real email or a 10-digit phone." },
      { status: 400 },
    );
  }

  if (await alreadyClaimedCookie()) {
    return NextResponse.json({ status: "already" });
  }

  let result: "ok" | "already" = "ok";
  try {
    result = await claimSignup({
      contactKey: normalized.key,
      name,
      trade,
      contact,
    });
  } catch {
    result = "ok";
  }

  if (result === "already") {
    await markClaimed();
    return NextResponse.json({ status: "already" });
  }

  try {
    await notifyNetlifyForms({ name, trade, contact });
  } catch {
    // Signup is already recorded. Joey still has the row even if the form email misses.
  }

  await markClaimed();
  return NextResponse.json({ status: "ok" });
}
