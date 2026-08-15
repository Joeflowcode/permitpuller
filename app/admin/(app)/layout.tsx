import type { ReactNode } from "react";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminGuardLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  return children;
}
