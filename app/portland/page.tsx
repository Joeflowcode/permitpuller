import type { Metadata } from "next";
import { GetListForm } from "../get-list-form";
import { nextListDateLabel } from "../lib/next-monday";
import { Magnetic } from "../magnetic";
import { Reveal } from "../reveal";
import { SiteHeader } from "../site-header";
import { StickyMobileBar } from "../sticky-mobile-bar";

const stripePaymentLink = process.env.PORTLAND_STRIPE_PAYMENT_LINK || "";

export const metadata: Metadata = {
  title: "Portland Permit List | New remodel permits every Monday",
  description:
    "Address, what they pulled, who applied. Weekly Portland building permits for flooring, HVAC, fence, paint, landscape, windows, and dumpsters. First week free. $149 a month.",
};

const trades = [
  { name: "Flooring", copy: "Kitchen and bath guts." },
  { name: "HVAC", copy: "New houses and additions. Not other HVAC permits." },
  { name: "Fence", copy: "New pools and additions. Oregon wants a barrier." },
  { name: "Paint", copy: "Interior remodels after the tear-out." },
  { name: "Landscape", copy: "Additions, pools, new builds." },
  { name: "Windows", copy: "Additions and full-house remodels." },
  { name: "Dumpster", copy: "Demo and tear-out. Joey is not hauling Portland. This list is for local dumpster shops." },
];

const samples = [
  { address: "5405 SE Ramona St, 97206", permit: "Kitchen remodel", pulled: "Aug 13" },
  { address: "6655 N Astor St, 97203", permit: "Kitchen and bathroom", pulled: "Aug 12" },
  { address: "3124 NE Irving St, 97232", permit: "Kitchen and 2nd floor bath", pulled: "Aug 6" },
  { address: "8106 N Interstate Ave, 97217", permit: "Duplex interior, 3 baths", pulled: "Aug 13" },
  { address: "14036 SE Mall St, 97236", permit: "Demolition, detached garage", pulled: "Aug 12" },
  { address: "735 SE Malden St, 97202", permit: "Two shed dormers, new bedroom and bath", pulled: "Aug 7" },
  { address: "1521 SE 42nd Ave, 97215", permit: "Replace deck", pulled: "Aug 6" },
];

const faqs = [
  {
    q: "Is this Angi?",
    a: "No. No bid requests. No shared leads. You get the public permit. You call the owner or the contractor on it.",
  },
  {
    q: "Do dumpster companies get Portland demo?",
    a: "Yes. Portland dumpster shops can buy demo and tear-out. Joey does not keep Portland dump. He is not hauling there.",
  },
  {
    q: "Where do the permits come from?",
    a: "PortlandMaps issued permits. Public record.",
  },
  {
    q: "Do you sell movers or realtor packs?",
    a: "No. No movers. No real-estate listing packs.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Text stop. No contract.",
  },
];

export default function PortlandPage() {
  const payHref = stripePaymentLink || "#get-list";
  const nextList = nextListDateLabel();

  return (
    <>
      <SiteHeader city="portland" />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Portland</p>
            <h1 className="display">New Portland remodel permits, every Monday.</h1>
            <p className="lede">
              Address, what they pulled, who applied. Kitchen guts for flooring. Additions for HVAC and fence. Garage and
              house demo for dumpsters. First week free.
            </p>
            <div className="hero-actions">
              <Magnetic>
                <a className="btn btn-primary" href="tel:5414252008">
                  Text Joey — 541-425-2008
                </a>
              </Magnetic>
              <a className="btn btn-secondary" href="#get-list">
                Get the first week free
              </a>
            </div>
            <p className="next-list">Next list goes out {nextList}.</p>
          </div>
          <div className="folio" aria-hidden="true">
            <article className="permit-card">
              <p className="permit-kicker">
                <span>Portland</span>
                <span>Aug 13</span>
              </p>
              <strong>5405 SE Ramona St</strong>
              <span>Kitchen remodel</span>
            </article>
            <article className="permit-card">
              <p className="permit-kicker">
                <span>Portland</span>
                <span>Aug 12</span>
              </p>
              <strong>14036 SE Mall St</strong>
              <span>Demolition, detached garage</span>
            </article>
            <article className="permit-card">
              <p className="permit-kicker">
                <span>Portland</span>
                <span>Aug 7</span>
              </p>
              <strong>735 SE Malden St</strong>
              <span>Two shed dormers</span>
            </article>
          </div>
        </div>
      </section>

      <section id="who" className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Who it&apos;s for</h2>
          </Reveal>
          <div className="who-grid">
            {trades.map((trade, index) => (
              <Reveal as="article" className="card who-card" delay={index * 60} key={trade.name}>
                <span className="who-index">0{index + 1}</span>
                <h3>{trade.name}</h3>
                <p className="muted">{trade.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>How it works</h2>
          </Reveal>
          <div className="how-steps">
            <Reveal className="how-step" delay={40}>
              <span className="how-num">1</span>
              <h3>
                Text <a href="tel:5414252008">541-425-2008</a> or email{" "}
                <a href="mailto:joeymcveigh150@gmail.com">joeymcveigh150@gmail.com</a>. Say what you do.
              </h3>
            </Reveal>
            <Reveal className="how-step" delay={120}>
              <span className="how-num">2</span>
              <h3>You get next Monday list free.</h3>
            </Reveal>
            <Reveal className="how-step" delay={200}>
              <span className="how-num">3</span>
              <h3>If it is useful, pay $149/month on Stripe. Cancel by text.</h3>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="price" className="section section-alt">
        <div className="wrap price-wrap">
          <Reveal className="section-head">
            <h2>Price</h2>
          </Reveal>
          <Reveal as="article" className="price-card">
            <p className="eyebrow">Monday list</p>
            <p className="price-amount">$149 / month</p>
            <p className="muted">Monday list of new Portland remodel, addition, demo, and pool permits.</p>
            <p className="muted" style={{ marginTop: 12 }}>
              First week free. Cancel by text.
            </p>
            <a className="btn btn-dark" href={payHref}>
              Pay $149 / month
            </a>
            <p className="muted price-fine">Pay after you see the free week. Stripe. No contract.</p>
            {stripePaymentLink ? null : (
              <p className="muted" style={{ marginTop: 10 }}>
                Joey will text the Stripe link after the free week.
              </p>
            )}
          </Reveal>
          <p className="muted price-fine">
            Need one address this month? $50. <a href="tel:5414252008">Text Joey</a>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Sample</h2>
          </Reveal>
          <p className="sample-badge">Real Portland permits. Not this Monday email.</p>
          <div className="ledger">
            <table>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Permit</th>
                  <th>Pulled</th>
                </tr>
              </thead>
              <tbody>
                {samples.map((row) => (
                  <tr key={row.address}>
                    <td>{row.address}</td>
                    <td>{row.permit}</td>
                    <td>{row.pulled}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 16 }}>
            Issued permits from PortlandMaps, pulled Aug 15 2026. Your Monday email looks like this, with the applicant
            name when the city published it.
          </p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap faq-list">
          <Reveal>
            <h2>Common questions</h2>
          </Reveal>
          {faqs.map((item) => (
            <Reveal key={item.q}>
              <details className="faq">
                <summary>{item.q}</summary>
                <p className="muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="get-list" className="section">
        <div className="wrap form-wrap">
          <Reveal>
            <h2>Get next Monday list free.</h2>
          </Reveal>
          <GetListForm city="portland" subject="PERMIT LIST PORTLAND" priceLabel="$149 a month" />
          <p className="muted skip-form">
            Or skip the form. <a href="tel:5414252008">Text Joey</a>.
          </p>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap">
          <strong>Northwest Estate Cleanouts</strong> · Salem, Oregon
          <br />
          Joey McVeigh
          <br />
          <a href="tel:5414252008">541-425-2008</a> ·{" "}
          <a href="mailto:joeymcveigh150@gmail.com">joeymcveigh150@gmail.com</a>
          <p className="muted" style={{ marginTop: 14, color: "#9b9486" }}>
            Joey does not haul Portland. Public permits. Dumpster shops buy the demo.
          </p>
        </div>
      </footer>
      <StickyMobileBar />
    </>
  );
}
