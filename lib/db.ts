import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { classifiedSeed } from "./seed-data";

const url = process.env.DATABASE_URL || "file:./prisma/dev.db";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function ensureSeeded() {
  const count = await prisma.permit.count();
  if (count > 0) return;
  const rows = classifiedSeed();
  await prisma.permit.createMany({
    data: rows.map((row) => ({
      city: row.city,
      address: row.address,
      permitType: row.permitType,
      work: row.work,
      applicant: row.applicant,
      issuedOn: row.issuedOn,
      sourceUrl: row.sourceUrl ?? "",
      status: row.status,
      trades: JSON.stringify(row.trades),
      override: false,
      notes: row.notes ?? "",
    })),
  });
}
