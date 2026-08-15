import { loginAction } from "@/lib/actions";
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main style={{ minHeight: "100vh", background: "#f3efe6", padding: "48px 20px" }}>
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <p style={{ color: "#2f6b4f", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Joey only
        </p>
        <h1 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: "2.4rem", margin: "0 0 12px" }}>
          Salem Permit List
        </h1>
        <p style={{ color: "#5b645c" }}>Password for the Mine / Sell board. Trades never see this.</p>
        <form
          action={loginAction}
          style={{ background: "#faf8f3", border: "1px solid #d8d2c6", borderRadius: 8, padding: 22, marginTop: 20 }}
        >
          <label style={{ display: "block", fontWeight: 700 }}>
            Password
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              style={{ display: "block", width: "100%", marginTop: 8, padding: 12, border: "1px solid #ccc4b6", borderRadius: 6, font: "inherit" }}
            />
          </label>
          {error ? (
            <p style={{ color: "#8a2b2b", fontWeight: 700 }}>Wrong password.</p>
          ) : null}
          <button
            type="submit"
            style={{ marginTop: 16, width: "100%", background: "#1f3d32", color: "#fff", border: 0, padding: 14, borderRadius: 6, fontWeight: 800, cursor: "pointer" }}
          >
            Open admin
          </button>
        </form>
        <p style={{ marginTop: 24 }}>
          <a href="/" style={{ color: "#2f6b4f", fontWeight: 700 }}>
            ← Public site
          </a>
        </p>
      </div>
    </main>
  );
}
