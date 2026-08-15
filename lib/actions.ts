"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminCookie, isAdmin, passwordOk, setAdminCookie } from "./auth";
import { classify, parseTrades, type Status, type Trade } from "./classify";
import { mapPortlandRow, parseCsv } from "./csv";
import { prisma } from "./db";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") || "");
  if (!passwordOk(password)) {
    redirect("/admin/login?error=1");
  }
  await setAdminCookie();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminCookie();
  redirect("/admin/login");
}

export async function addPermitAction(formData: FormData) {
  await requireAdmin();
  const city = String(formData.get("city") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const permitType = String(formData.get("permitType") || "").trim();
  const work = String(formData.get("work") || "").trim();
  const applicant = String(formData.get("applicant") || "").trim();
  const issuedOn = String(formData.get("issuedOn") || "").trim();
  const sourceUrl = String(formData.get("sourceUrl") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const manual = String(formData.get("status") || "auto") as Status | "auto";

  if (!city || !address) redirect("/admin?tab=add&error=missing");

  const classified = classify({ city, address, permitType, work, applicant });
  const override = manual !== "auto";
  const status = override ? (manual as Status) : classified.status;
  const trades = classified.trades;

  await prisma.permit.create({
    data: {
      city,
      address,
      permitType,
      work,
      applicant,
      issuedOn,
      sourceUrl,
      notes,
      status,
      trades: JSON.stringify(trades),
      override,
    },
  });
  revalidatePath("/admin");
  redirect("/admin?tab=add&saved=1");
}

export async function importCsvAction(formData: FormData) {
  await requireAdmin();
  const city = String(formData.get("csvCity") || "Portland").trim() || "Portland";
  const raw = String(formData.get("csv") || "");
  const rows = parseCsv(raw)
    .map((row) => mapPortlandRow(row, city))
    .filter((row): row is NonNullable<typeof row> => Boolean(row));

  if (!rows.length) redirect("/admin?tab=add&error=csv");

  await prisma.permit.createMany({
    data: rows.map((row) => ({
      city: row.city,
      address: row.address,
      permitType: row.permitType,
      work: row.work,
      applicant: row.applicant,
      issuedOn: row.issuedOn,
      sourceUrl: row.sourceUrl,
      status: row.status,
      trades: JSON.stringify(row.trades),
      override: false,
      notes: row.notes,
    })),
  });
  revalidatePath("/admin");
  redirect("/admin?tab=add&saved=1");
}

export async function setStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "") as Status;
  if (!id || !["mine", "sell", "skip"].includes(status)) return;
  await prisma.permit.update({
    where: { id },
    data: { status, override: true },
  });
  revalidatePath("/admin");
}

export async function toggleTradeAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const trade = String(formData.get("trade") || "") as Trade;
  if (!id || !trade) return;
  const row = await prisma.permit.findUnique({ where: { id } });
  if (!row) return;
  const trades = parseTrades(row.trades);
  const next = trades.includes(trade)
    ? trades.filter((t) => t !== trade)
    : [...trades, trade];
  await prisma.permit.update({
    where: { id },
    data: { trades: JSON.stringify(next), override: true },
  });
  revalidatePath("/admin");
}
