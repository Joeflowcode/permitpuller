"use client";

import {
  addPermitAction,
  importCsvAction,
  logoutAction,
  setStatusAction,
  toggleTradeAction,
} from "@/lib/actions";
import type { Trade } from "@/lib/classify";
import { isMineRow, isSellRow } from "@/lib/classify";
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";

type PermitRow = {
  id: string;
  city: string;
  address: string;
  permitType: string;
  work: string;
  applicant: string;
  issuedOn: string;
  sourceUrl: string;
  status: string;
  trades: Trade[];
  override: boolean;
  notes: string;
};

const TRADE_FILTERS: Trade[] = [
  "flooring",
  "hvac",
  "fence",
  "paint",
  "landscape",
  "windows",
  "dumpster",
  "roofing",
];

export function AdminConsole({ permits }: { permits: PermitRow[] }) {
  const [tab, setTab] = useState<"mine" | "sell" | "add">("mine");
  const [tradeFilter, setTradeFilter] = useState<Trade | "all">("all");

  const mine = useMemo(() => {
    return permits
      .filter((p) => isMineRow(p.status))
      .sort((a, b) => {
        const ad = /demo/i.test(a.permitType) || /demo/i.test(a.work) ? 0 : 1;
        const bd = /demo/i.test(b.permitType) || /demo/i.test(b.work) ? 0 : 1;
        if (ad !== bd) return ad - bd;
        return b.issuedOn.localeCompare(a.issuedOn);
      });
  }, [permits]);

  const sell = useMemo(() => {
    return permits
      .filter((p) => isSellRow(p.status, p.trades))
      .filter((p) => (tradeFilter === "all" ? true : p.trades.includes(tradeFilter)))
      .sort((a, b) => b.issuedOn.localeCompare(a.issuedOn));
  }, [permits, tradeFilter]);

  return (
    <main style={{ minHeight: "100vh", background: "#f3efe6", color: "#1c241e" }}>
      <header
        style={{
          background: "#1f3d32",
          color: "#fff",
          padding: "14px 20px",
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <strong>Salem Permit List — admin</strong>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="/" style={{ color: "#e8a532" }}>
            Public site
          </a>
          <form action={logoutAction}>
            <button type="submit" style={smallBtn}>
              Log out
            </button>
          </form>
        </div>
      </header>

      <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          <TabButton active={tab === "mine"} onClick={() => setTab("mine")}>
            Mine ({mine.length})
          </TabButton>
          <TabButton active={tab === "sell"} onClick={() => setTab("sell")}>
            Sell ({sell.length})
          </TabButton>
          <TabButton active={tab === "add"} onClick={() => setTab("add")}>
            Add / paste
          </TabButton>
        </div>

        {tab === "mine" ? (
          <section>
            <p style={{ color: "#5b645c", maxWidth: 640 }}>
              Joey&apos;s call list. Demo first. Never email this tab to trades.
            </p>
            <PermitTable rows={mine} mode="mine" />
          </section>
        ) : null}

        {tab === "sell" ? (
          <section>
            <p style={{ color: "#5b645c" }}>Filter by trade. Toggle a chip to set override. This is what shops pay for.</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "14px 0" }}>
              <Chip active={tradeFilter === "all"} onClick={() => setTradeFilter("all")}>
                All
              </Chip>
              {TRADE_FILTERS.map((t) => (
                <Chip key={t} active={tradeFilter === t} onClick={() => setTradeFilter(t)}>
                  {t}
                </Chip>
              ))}
            </div>
            <PermitTable rows={sell} mode="sell" />
          </section>
        ) : null}

        {tab === "add" ? (
          <section style={{ display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <form action={addPermitAction} style={panel}>
              <h2 style={{ marginTop: 0 }}>Add one permit</h2>
              <Field name="city" label="City" placeholder="Salem" />
              <Field name="address" label="Address" />
              <Field name="permitType" label="Permit type" placeholder="Demolition" />
              <Field name="work" label="Work" />
              <Field name="applicant" label="Applicant / contractor" />
              <Field name="issuedOn" label="Issued on" placeholder="2026-08-15" />
              <Field name="sourceUrl" label="Source URL" />
              <label style={lab}>
                Notes
                <textarea name="notes" rows={3} style={inp} />
              </label>
              <label style={lab}>
                Status
                <select name="status" defaultValue="auto" style={inp}>
                  <option value="auto">Auto (classify)</option>
                  <option value="mine">Mine</option>
                  <option value="sell">Sell</option>
                  <option value="skip">Skip</option>
                </select>
              </label>
              <p style={{ color: "#5b645c", fontSize: 14 }}>
                Manual Mine / Sell / Skip sets override so classify will not overwrite it.
              </p>
              <button type="submit" style={primaryBtn}>
                Save permit
              </button>
            </form>

            <form action={importCsvAction} style={panel}>
              <h2 style={{ marginTop: 0 }}>Paste PortlandMaps CSV</h2>
              <Field name="csvCity" label="City for these rows" placeholder="Portland" />
              <label style={lab}>
                CSV
                <textarea
                  name="csv"
                  rows={12}
                  style={inp}
                  placeholder="ADDRESS,WORK PROPOSED,DESCRIPTION OF WORK,DATE ISSUED,CONTRACTOR"
                />
              </label>
              <p style={{ color: "#5b645c", fontSize: 14 }}>
                Maps ADDRESS, WORK PROPOSED, DESCRIPTION OF WORK, DATE ISSUED, CONTRACTOR.
              </p>
              <button type="submit" style={primaryBtn}>
                Import CSV
              </button>
            </form>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function PermitTable({ rows, mode }: { rows: PermitRow[]; mode: "mine" | "sell" }) {
  if (!rows.length) return <p>Nothing in this tab.</p>;
  return (
    <div style={{ overflowX: "auto", border: "1px solid #d8d2c6", borderRadius: 8, background: "#faf8f3" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
        <thead>
          <tr>
            <th style={th}>Address</th>
            <th style={th}>City</th>
            <th style={th}>Type</th>
            <th style={th}>Applicant</th>
            <th style={th}>Issued</th>
            <th style={th}>{mode === "sell" ? "Trades" : "Notes"}</th>
            <th style={th}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={td}>
                <strong>{row.address}</strong>
                <div style={{ color: "#5b645c", fontSize: 13 }}>{row.work}</div>
              </td>
              <td style={td}>{row.city}</td>
              <td style={td}>{row.permitType}</td>
              <td style={td}>{row.applicant}</td>
              <td style={td}>{row.issuedOn}</td>
              <td style={td}>
                {mode === "sell" ? (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {TRADE_FILTERS.map((trade) => (
                      <form action={toggleTradeAction} key={trade}>
                        <input type="hidden" name="id" value={row.id} />
                        <input type="hidden" name="trade" value={trade} />
                        <button type="submit" style={chipBtn(row.trades.includes(trade))}>
                          {trade}
                        </button>
                      </form>
                    ))}
                  </div>
                ) : (
                  row.notes || "—"
                )}
              </td>
              <td style={td}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {mode === "sell" ? (
                    <form action={setStatusAction}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="status" value="mine" />
                      <button type="submit" style={smallBtn}>
                        Move to Mine
                      </button>
                    </form>
                  ) : null}
                  <form action={setStatusAction}>
                    <input type="hidden" name="id" value={row.id} />
                    <input type="hidden" name="status" value="skip" />
                    <button type="submit" style={smallBtn}>
                      Skip
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Field({
  name,
  label,
  placeholder,
}: {
  name: string;
  label: string;
  placeholder?: string;
}) {
  return (
    <label style={lab}>
      {label}
      <input name={name} placeholder={placeholder} style={inp} />
    </label>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        ...smallBtn,
        background: active ? "#1f3d32" : "#fff",
        color: active ? "#fff" : "#1c241e",
        border: "1px solid #1f3d32",
      }}
    >
      {children}
    </button>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button type="button" onClick={onClick} style={chipBtn(active)}>
      {children}
    </button>
  );
}

const th: CSSProperties = { textAlign: "left", padding: 10, borderBottom: "1px solid #d8d2c6", fontSize: 13 };
const td: CSSProperties = { padding: 10, borderBottom: "1px solid #eee8dc", verticalAlign: "top", fontSize: 14 };
const lab: CSSProperties = { display: "block", fontWeight: 700, marginBottom: 12 };
const inp: CSSProperties = {
  display: "block",
  width: "100%",
  marginTop: 6,
  padding: 10,
  border: "1px solid #ccc4b6",
  borderRadius: 6,
  font: "inherit",
};
const panel: CSSProperties = { background: "#faf8f3", border: "1px solid #d8d2c6", borderRadius: 8, padding: 20 };
const smallBtn: CSSProperties = {
  background: "#fff",
  border: "1px solid #bbb",
  borderRadius: 6,
  padding: "8px 10px",
  fontWeight: 700,
  cursor: "pointer",
};
const primaryBtn: CSSProperties = {
  background: "#1f3d32",
  color: "#fff",
  border: 0,
  borderRadius: 6,
  padding: "12px 14px",
  fontWeight: 800,
  cursor: "pointer",
  width: "100%",
};

function chipBtn(on: boolean): CSSProperties {
  return {
    border: "1px solid #1f3d32",
    background: on ? "#2f6b4f" : "#fff",
    color: on ? "#fff" : "#1f3d32",
    borderRadius: 999,
    padding: "4px 10px",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
    textTransform: "capitalize",
  };
}
