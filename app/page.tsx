import { CityMap } from "./city-map";
import { GetListForm } from "./get-list-form";
import { nextListDateLabel } from "./lib/next-monday";
import { Magnetic } from "./magnetic";
import { Reveal } from "./reveal";
import { SiteHeader } from "./site-header";
import { StickyMobileBar } from "./sticky-mobile-bar";
import { TextJoeyLink } from "./text-joey-link";

const stripePaymentLink =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || process.env.STRIPE_PAYMENT_LINK || "";

const trades = [
  {
    name: "Flooring",
    copy: "Kitchen and bath guts. You call before the GC flooring guy is locked in.",
  },
  {
    name: "HVAC",
    copy: "New houses and additions. Not other HVAC permits. That shop already has the mechanical.",
  },
  {
    name: "Fence",
    copy: "New pools and additions. Oregon wants a barrier. That is your job.",
  },
  {
    name: "Paint",
    copy: "Interior remodels after the tear-out.",
  },
  {
    name: "Landscape",
    copy: "Additions, pools, new builds.",
  },
  {
    name: "Windows",
    copy: "Additions and full-house remodels.",
  },
];

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
  {
    q: "Can I get another free week?",
    a: "No. One free week per shop. Same email or phone does not get a second list. After that it is $99 a month. Cancel by text.",
  },
];

export default function Home() {
  const payHref = stripePaymentLink || "#get-list";
  const nextList = nextListDateLabel();

  return (
    <>
      <SiteHeader />

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Salem · Keizer · Stayton · Lyons · Albany</p>
            <h1 className="display">New Salem remodel permits, every Monday.</h1>
            <p className="lede">
              Address, what they pulled, who applied. Kitchen guts for flooring. Additions for HVAC and fence. First week
              free.
            </p>
            <div className="hero-actions">
              <Magnetic>
                <TextJoeyLink className="btn btn-primary">Text Joey — 541-425-2008</TextJoeyLink>
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
                <span>Salem</span>
                <span>Aug 4</span>
              </p>
              <strong>2324 47th Ave NE</strong>
              <span>Demolition</span>
            </article>
            <article className="permit-card">
              <p className="permit-kicker">
                <span>Salem</span>
                <span>Jul 30</span>
              </p>
              <strong>1955 Beach Ave NE</strong>
              <span>Interior alteration</span>
            </article>
            <article className="permit-card">
              <p className="permit-kicker">
                <span>Salem</span>
                <span>Jul 22</span>
              </p>
              <strong>2080 Manorview Cir NW</strong>
              <span>Addition</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>What you get</h2>
            <p className="muted">Three lines. Monday morning. You call who you want. No portal. No app.</p>
          </Reveal>
          <div className="grid-3">
            <Reveal as="article" className="card" delay={40}>
              <h3>The address</h3>
              <p className="muted">Street, city, and the permit type (demo, interior alteration, addition, pool).</p>
            </Reveal>
            <Reveal as="article" className="card" delay={120}>
              <h3>What they pulled</h3>
              <p className="muted">So you know if it is a kitchen gut, a new build, or a pool barrier job.</p>
            </Reveal>
            <Reveal as="article" className="card" delay={200}>
              <h3>Who applied</h3>
              <p className="muted">Name on the permit when the city published it.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="who" className="section section-alt">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Who it&apos;s for</h2>
            <p className="muted">A shop that wants the job before the GC already has a guy.</p>
          </Reveal>
          <div className="who-grid">
            {trades.map((trade, index) => (
              <Reveal as="article" className="card who-card" delay={index * 70} key={trade.name}>
                <span className="who-index">0{index + 1}</span>
                <h3>{trade.name}</h3>
                <p className="muted">{trade.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="section">
        <div className="wrap how-grid">
          <div>
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
                <h3>If it is useful, pay $99/month on Stripe. Cancel by text.</h3>
              </Reveal>
            </div>
          </div>
          <Reveal>
            <CityMap />
          </Reveal>
        </div>
      </section>

      <section id="price" className="section section-alt">
        <div className="wrap price-wrap">
          <Reveal className="section-head">
            <h2>Price</h2>
          </Reveal>
          <Reveal as="article" className="price-card">
            <p className="eyebrow">Monday list</p>
            <p className="price-amount">$99 / month</p>
            <p className="muted">Monday list of new Salem remodel, addition, demo, and pool permits.</p>
            <p className="muted" style={{ marginTop: 12 }}>
              First week free. Cancel by text.
            </p>
            <a className="btn btn-dark" href={payHref}>
              Pay $99 / month
            </a>
            <p className="muted price-fine">Pay after you see the free week. Stripe. No contract.</p>
            {stripePaymentLink ? null : (
              <p className="muted" style={{ marginTop: 10 }}>
                Joey will text you the Stripe link after your free week.
              </p>
            )}
          </Reveal>
          <p className="muted price-fine">
            Need one address this month? $35. <TextJoeyLink>Text Joey</TextJoeyLink>.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Reveal className="section-head">
            <h2>Sample</h2>
          </Reveal>
          <p className="sample-badge">Real Salem permits. Not this Monday email.</p>
          <div className="ledger">
            <Reveal className="stamp">
              Filed
              <br />
              Salem
            </Reveal>
            <table>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Permit</th>
                  <th>Pulled</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2324 47th Ave NE</td>
                  <td>Demolition</td>
                  <td>Aug 4</td>
                </tr>
                <tr>
                  <td>1955 Beach Ave NE</td>
                  <td>Interior alteration</td>
                  <td>Jul 30</td>
                </tr>
                <tr>
                  <td>2080 Manorview Cir NW</td>
                  <td>Addition</td>
                  <td>Jul 22</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 16 }}>
            Your Monday email looks like this, with the applicant name when the city published it.
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
          <GetListForm />
          <p className="muted skip-form">
            Or skip the form. <TextJoeyLink>Text Joey</TextJoeyLink>.
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
            Not a lead mill. Public permits, one town.
          </p>
        </div>
      </footer>
      <StickyMobileBar />
    </>
  );
}
