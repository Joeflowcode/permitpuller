import { ensureSeeded, prisma } from "@/lib/db";
import { parseTrades } from "@/lib/classify";
import { AdminConsole } from "./admin-console";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await ensureSeeded();
  const rows = await prisma.permit.findMany({ orderBy: { issuedOn: "desc" } });
  const permits = rows.map((row) => ({
    ...row,
    trades: parseTrades(row.trades),
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }));
  return <AdminConsole permits={permits} />;
}
