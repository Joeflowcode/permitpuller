export const SIGNUP_COOKIE = "spl_signup";
export const SIGNUP_STORAGE = "spl_signup";
export const SIGNUP_COOKIE_MAX_AGE = 60 * 60 * 24 * 180;

export type ContactKind = "email" | "phone" | "unknown";

export type NormalizedContact = {
  kind: ContactKind;
  key: string;
};

const GMAIL_DOMAINS = new Set(["gmail.com", "googlemail.com"]);

export function normalizeContact(raw: string): NormalizedContact {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) {
    return { kind: "unknown", key: "" };
  }

  if (trimmed.includes("@")) {
    const at = trimmed.lastIndexOf("@");
    const local = trimmed.slice(0, at);
    const domain = trimmed.slice(at + 1);
    if (!local || !domain.includes(".")) {
      return { kind: "unknown", key: `raw:${trimmed}` };
    }
    const cleanLocal = GMAIL_DOMAINS.has(domain) ? local.replace(/\+.*$/, "").replace(/\./g, "") : local.split("+")[0];
    return { kind: "email", key: `email:${cleanLocal}@${domain}` };
  }

  const digits = trimmed.replace(/\D/g, "");
  if (digits.length >= 10) {
    return { kind: "phone", key: `phone:${digits.slice(-10)}` };
  }
  return { kind: "unknown", key: `raw:${trimmed}` };
}

export function isUsableContact(contact: NormalizedContact) {
  return Boolean(contact.key) && contact.kind !== "unknown";
}
