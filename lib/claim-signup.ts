import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { signups } from "../db/schema";

export async function claimSignup(input: {
  contactKey: string;
  name: string;
  trade: string;
  contact: string;
}) {
  const db = getDb();
  const existing = await db.select().from(signups).where(eq(signups.contactKey, input.contactKey)).limit(1);
  if (existing[0]) {
    return "already" as const;
  }

  try {
    await db.insert(signups).values({
      contactKey: input.contactKey,
      name: input.name,
      trade: input.trade,
      contact: input.contact,
    });
    return "ok" as const;
  } catch {
    return "already" as const;
  }
}
