import type { CSSProperties } from "react";

export default function Home() {
  return (
    <>
      <header
        style={{
          background: "#1f3d32",
          color: "#fff",
          position: "sticky",
          top: 0,
          zIndex: 20,
          borderBottom: "2px solid #c97d1a",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "14px 0",
            flexWrap: "wrap",
          }}
        >
          <a href="/" style={{ textDecoration: "none", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Salem Permit List
          </a>
          <nav style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: 15, fontWeight: 650 }}>
            <a href="#how" style={{ textDecoration: "none" }}>
              How it works
            </a>
            <a href="#who" style={{ textDecoration: "none" }}>
              Who it&apos;s for
            </a>
            <a href="#price" style={{ textDecoration: "none" }}>
              Price
            </a>
            <a href="#get-list" style={{ textDecoration: "none" }}>
              Get the first week
            </a>
          </nav>
          <a href="tel:5414252008" className="btn btn-primary" style={{ minHeight: 42, padding: "0.55rem 0.9rem" }}>
            Call 541-425-2008
          </a>
        </div>
      </header>

      <section style={{ background: "#1f3d32", color: "#fff", padding: "72px 0 80px" }}>
        <div className="wrap">
          <p style={{ color: "#e8a532", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
            Salem · Keizer · nearby
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(2.4rem, 8vw, 4.6rem)",
              lineHeight: 1.05,
              fontWeight: 650,
              maxWidth: 820,
              margin: "12px 0 18px",
            }}
          >
            New Salem remodel and demo permits, every Monday.
          </h1>
          <p style={{ fontSize: "1.15rem", maxWidth: 640, color: "rgba(255,255,255,.86)" }}>
            Address. What they pulled. Who applied. Sent to your inbox. First week free.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 28 }}>
            <a className="btn btn-primary" href="#get-list">
              Get the first week free
            </a>
            <a className="btn btn-secondary" href="tel:5414252008">
              Call Joey
            </a>
          </div>
          <p style={{ marginTop: 22, color: "rgba(255,255,255,.75)" }}>Salem · Keizer · Stayton · Lyons · Albany</p>
        </div>
      </section>

      <section style={{ padding: "72px 0" }}>
        <div className="wrap">
          <h2 style={h2}>What you get</h2>
          <div style={grid3}>
            <article style={card}>
              <h3 style={h3}>The address</h3>
              <p style={muted}>Street, city, and the permit type (demo, interior alteration, addition, pool).</p>
            </article>
            <article style={card}>
              <h3 style={h3}>What they pulled</h3>
              <p style={muted}>So you know if it is a kitchen gut, a new build, or a pool barrier job.</p>
            </article>
            <article style={card}>
              <h3 style={h3}>Who applied</h3>
              <p style={muted}>Name on the permit when the city published it.</p>
            </article>
          </div>
          <p style={{ ...muted, marginTop: 28, maxWidth: 720 }}>
            You get the list Monday morning. You call who you want. No portal. No app.
          </p>
        </div>
      </section>

      <section id="who" style={{ padding: "72px 0", background: "#ebe6db" }}>
        <div className="wrap">
          <h2 style={h2}>Who it&apos;s for</h2>
          <div style={grid3}>
            <article style={card}>
              <h3 style={h3}>Flooring</h3>
              <p style={muted}>Interior alterations and kitchen/bath guts.</p>
            </article>
            <article style={card}>
              <h3 style={h3}>HVAC</h3>
              <p style={muted}>New construction and additions. Not other HVAC permits.</p>
            </article>
            <article style={card}>
              <h3 style={h3}>Fence</h3>
              <p style={muted}>Pool permits and additions (barrier jobs).</p>
            </article>
            <article style={card}>
              <h3 style={h3}>Paint</h3>
              <p style={muted}>Interior remodels after the tear-out.</p>
            </article>
            <article style={card}>
              <h3 style={h3}>Landscape</h3>
              <p style={muted}>Additions, pools, new builds.</p>
            </article>
            <article style={card}>
              <h3 style={h3}>Windows</h3>
              <p style={muted}>Additions and full-house remodels.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="how" style={{ padding: "72px 0" }}>
        <div className="wrap">
          <h2 style={h2}>How it works</h2>
          <div style={grid3}>
            <article style={card}>
              <p style={num}>1</p>
              <h3 style={h3}>You text or email Joey.</h3>
            </article>
            <article style={card}>
              <p style={num}>2</p>
              <h3 style={h3}>You get the first week free.</h3>
            </article>
            <article style={card}>
              <p style={num}>3</p>
              <h3 style={h3}>If it is useful, it is $99 a month. Cancel by text.</h3>
            </article>
          </div>
        </div>
      </section>

      <section id="price" style={{ padding: "72px 0", background: "#ebe6db" }}>
        <div className="wrap">
          <h2 style={h2}>Price</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            <article style={{ ...card, padding: 28 }}>
              <h3 style={h3}>Weekly list</h3>
              <p style={{ fontSize: "2.2rem", fontWeight: 800, margin: "8px 0" }}>$99 / month</p>
              <p style={muted}>Every new remodel, demo, addition, and pool permit we pull for Salem.</p>
              <p style={{ ...muted, marginTop: 12 }}>First week free.</p>
            </article>
            <article style={{ ...card, padding: 28 }}>
              <h3 style={h3}>One address</h3>
              <p style={{ fontSize: "2.2rem", fontWeight: 800, margin: "8px 0" }}>$35</p>
              <p style={muted}>If you only want one job this month.</p>
            </article>
          </div>
          <p style={{ ...muted, marginTop: 22 }}>
            Pay Pal, Venmo, or Cash App to joeymcveigh150@gmail.com. No card form on this site.
          </p>
        </div>
      </section>

      <section style={{ padding: "72px 0" }}>
        <div className="wrap">
          <h2 style={h2}>Sample row</h2>
          <p
            style={{
              display: "inline-block",
              background: "#1f3d32",
              color: "#fff",
              fontWeight: 800,
              padding: "6px 10px",
              borderRadius: 4,
              marginBottom: 16,
            }}
          >
            Example, not this week&apos;s list
          </p>
          <div style={{ overflowX: "auto", background: "#faf8f3", border: "1px solid #d8d2c6", borderRadius: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 520 }}>
              <thead>
                <tr>
                  <th style={th}>Address</th>
                  <th style={th}>Permit</th>
                  <th style={th}>Pulled</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}>2324 47th Ave NE</td>
                  <td style={td}>Demolition</td>
                  <td style={td}>Aug 4</td>
                </tr>
                <tr>
                  <td style={td}>1955 Beach Ave NE</td>
                  <td style={td}>Interior alteration</td>
                  <td style={td}>Jul 30</td>
                </tr>
                <tr>
                  <td style={td}>2080 Manorview Cir NW</td>
                  <td style={td}>Addition</td>
                  <td style={td}>Jul 22</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ ...muted, marginTop: 16 }}>
            Real Salem permits. The Monday email looks like this, with the applicant name added when the city has it.
          </p>
        </div>
      </section>

      <section style={{ padding: "72px 0", background: "#ebe6db" }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <h2 style={h2}>Common questions</h2>
          {faqs.map((item) => (
            <details
              key={item.q}
              style={{ background: "#faf8f3", border: "1px solid #d8d2c6", borderRadius: 8, padding: "16px 18px", margin: "10px 0" }}
            >
              <summary style={{ fontWeight: 800, cursor: "pointer" }}>{item.q}</summary>
              <p style={{ ...muted, margin: "12px 0 0" }}>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="get-list" style={{ padding: "72px 0" }}>
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h2 style={h2}>Get next Monday&apos;s list free.</h2>
          <form
            action="mailto:joeymcveigh150@gmail.com?subject=PERMIT LIST"
            method="post"
            encType="text/plain"
            style={{ ...card, padding: 24 }}
          >
            <label style={label}>
              Name
              <input name="Name" required style={input} />
            </label>
            <label style={label}>
              Trade
              <select name="Trade" required style={input} defaultValue="Flooring">
                <option>Flooring</option>
                <option>HVAC</option>
                <option>Fence</option>
                <option>Paint</option>
                <option>Landscape</option>
                <option>Windows</option>
                <option>Other</option>
              </select>
            </label>
            <label style={label}>
              Email or phone
              <input name="Email or phone" required style={input} />
            </label>
            <button className="btn btn-dark" type="submit" style={{ marginTop: 12, width: "100%" }}>
              Email Joey
            </button>
          </form>
          <p style={{ ...muted, marginTop: 18 }}>
            Or just text <a href="tel:5414252008">541-425-2008</a> and say what you do.
          </p>
        </div>
      </section>

      <footer style={{ background: "#151915", color: "#cfc9bd", padding: "36px 0" }}>
        <div className="wrap">
          <strong style={{ color: "#fff" }}>Northwest Estate Cleanouts</strong> · Salem, Oregon
          <br />
          <a href="tel:5414252008">541-425-2008</a> ·{" "}
          <a href="mailto:joeymcveigh150@gmail.com">joeymcveigh150@gmail.com</a>
          <p style={{ marginTop: 12 }}>Not a lead mill. Public permits, one town.</p>
        </div>
      </footer>
    </>
  );
}

const h2: CSSProperties = {
  fontFamily: "var(--font-display), Georgia, serif",
  fontSize: "clamp(2rem, 5vw, 3.1rem)",
  lineHeight: 1.1,
  margin: "0 0 24px",
};

const h3: CSSProperties = {
  margin: "0 0 8px",
  fontSize: "1.15rem",
};

const muted: CSSProperties = { color: "#5b645c", margin: 0, lineHeight: 1.55 };

const card: CSSProperties = {
  background: "#faf8f3",
  border: "1px solid #d8d2c6",
  borderRadius: 8,
  padding: 22,
};

const grid3: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 14,
};

const num: CSSProperties = { color: "#c97d1a", fontWeight: 900, fontSize: "1.6rem", margin: "0 0 8px" };

const th: CSSProperties = {
  textAlign: "left",
  padding: "12px 14px",
  borderBottom: "1px solid #d8d2c6",
  fontSize: 14,
};

const td: CSSProperties = {
  padding: "12px 14px",
  borderBottom: "1px solid #eee8dc",
};

const label: CSSProperties = { display: "block", fontWeight: 700, margin: "0 0 14px" };

const input: CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: "12px",
  border: "1px solid #ccc4b6",
  borderRadius: 6,
  font: "inherit",
  background: "#fff",
};

const faqs = [
  {
    q: "Is this Angi?",
    a: "No. No bid requests. No shared leads. You get the public permit. You call the owner or the contractor on it.",
  },
  {
    q: "Do other junk companies get this?",
    a: "No. Dump and demo stay with Northwest Estate Cleanouts. This list is for the trades that come after the tear-out.",
  },
  {
    q: "What cities?",
    a: "Salem city permits first. Keizer and Marion County when they are public the same way.",
  },
  {
    q: "When do I get it?",
    a: "Monday morning by email. Text 541-425-2008 if you want it as a text instead.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Text stop. No contract.",
  },
  {
    q: "Is this legal?",
    a: "Yes. These are public building permits. We do not sell moving jobs or real-estate listing packs.",
  },
];
