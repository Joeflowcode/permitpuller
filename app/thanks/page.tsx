import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You are on the list | Salem Permit List",
  description: "Joey will send next Monday's Salem remodel and demo permits.",
};

export default function ThanksPage() {
  return (
    <main className="section" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <div className="form-wrap" style={{ textAlign: "center" }}>
        <p className="eyebrow">Salem Permit List</p>
        <h1 className="display" style={{ fontSize: "clamp(2.2rem, 6vw, 3.6rem)", margin: "8px 0 16px" }}>
          You are on the list.
        </h1>
        <p className="muted">
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
