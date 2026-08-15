import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You are on the list | Salem Permit List",
  description: "Joey will send next Monday's Salem remodel and demo permits.",
};

export default function ThanksPage() {
  return (
    <main style={{ minHeight: "70vh", display: "grid", placeItems: "center", padding: "48px 20px" }}>
      <div style={{ maxWidth: 520, textAlign: "center" }}>
        <p style={{ color: "#c97d1a", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Salem Permit List
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "clamp(2rem, 6vw, 3.2rem)",
            lineHeight: 1.1,
            margin: "8px 0 16px",
          }}
        >
          You are on the list.
        </h1>
        <p style={{ color: "#5b645c", lineHeight: 1.55 }}>
          Joey will send next Monday&apos;s remodel and demo permits. Want it as a text instead? Call or text{" "}
          <a href="tel:5414252008">541-425-2008</a>.
        </p>
        <p style={{ marginTop: 28 }}>
          <a href="/" className="btn btn-dark">
            Back to the site
          </a>
        </p>
      </div>
    </main>
  );
}
