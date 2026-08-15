import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../generated/prisma/client";
import { classifiedSeed } from "../lib/seed-data";

const url = process.env.DATABASE_URL || "file:./prisma/dev.db";
const adapter = new PrismaBetterSqlite3({ url });
const prisma = new PrismaClient({ adapter });

async function main() {
  const rows = classifiedSeed();
  const paint = rows.find((r) => r.address.startsWith("1039"));
  const halsey = rows.find((r) => r.address.startsWith("2406"));
  const demo = rows.find((r) => r.address.startsWith("2324"));
  const mall = rows.find((r) => r.address.startsWith("14036"));

  if (!paint || paint.trades.includes("paint")) {
    throw new Error("1039 SE 78th must not have a paint chip");
  }
  if (!halsey || halsey.trades.includes("hvac")) {
    throw new Error("2406 NE Halsey must not have an HVAC chip");
  }
  if (!demo || demo.status !== "mine" || demo.trades.includes("dumpster")) {
    throw new Error("2324 47th Ave NE must be mine without dumpster");
  }
  if (!mall || mall.status !== "sell" || !mall.trades.includes("dumpster")) {
    throw new Error("14036 SE Mall must sell to dumpster");
  }

  await prisma.permit.deleteMany();
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
  console.log(`Seeded ${rows.length} permits`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
