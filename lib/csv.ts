import { classify, parseTrades, type Status, type Trade } from "./classify";

type CsvRow = Record<string, string>;

function splitCsvLine(line: string) {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur.trim());
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur.trim());
  return out;
}

export function parseCsv(text: string): CsvRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return [];
  const headers = splitCsvLine(lines[0]).map((h) => h.replace(/^\uFEFF/, "").trim());
  return lines.slice(1).map((line) => {
    const cols = splitCsvLine(line);
    const row: CsvRow = {};
    headers.forEach((h, i) => {
      row[h] = cols[i] ?? "";
    });
    return row;
  });
}

function pick(row: CsvRow, names: string[]) {
  const keys = Object.keys(row);
  for (const name of names) {
    const hit = keys.find((k) => k.toLowerCase() === name.toLowerCase());
    if (hit && row[hit]) return row[hit];
  }
  return "";
}

export function mapPortlandRow(row: CsvRow, city: string) {
  const address = pick(row, ["ADDRESS", "Address"]);
  const permitType = pick(row, ["WORK PROPOSED", "Work Proposed", "permitType"]);
  const work = pick(row, ["DESCRIPTION OF WORK", "Description of Work", "work"]);
  const issuedOn = pick(row, ["DATE ISSUED", "Date Issued", "issuedOn"]);
  const applicant = pick(row, ["CONTRACTOR", "Contractor", "applicant"]);
  if (!address) return null;
  const input = {
    city: city || "Portland",
    address,
    permitType: permitType || "Permit",
    work: work || permitType || "",
    applicant: applicant || "Owner",
  };
  const result = classify(input);
  return {
    ...input,
    issuedOn: issuedOn || new Date().toISOString().slice(0, 10),
    sourceUrl: "https://www.portlandmaps.com/",
    status: result.status as Status,
    trades: result.trades as Trade[],
    override: false,
    notes: "",
  };
}

export function parseTradesJson(raw: string) {
  return parseTrades(raw);
}
