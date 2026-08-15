export const HAUL_CITIES = new Set(["salem", "keizer", "stayton", "lyons"]);

export type Trade =
  | "flooring"
  | "hvac"
  | "fence"
  | "paint"
  | "landscape"
  | "windows"
  | "roofing"
  | "dumpster";

export type Status = "mine" | "sell" | "skip";

export type PermitInput = {
  city: string;
  address: string;
  permitType: string;
  work: string;
  applicant: string;
};

export type ClassifyResult = {
  status: Status;
  trades: Trade[];
};

const ALL_TRADES: Trade[] = [
  "flooring",
  "hvac",
  "fence",
  "paint",
  "landscape",
  "windows",
  "roofing",
  "dumpster",
];

function lower(s: string) {
  return s.toLowerCase();
}

function blob(p: PermitInput) {
  return `${p.permitType} ${p.work} ${p.applicant}`.toLowerCase();
}

function uniq(trades: Trade[]) {
  return [...new Set(trades)];
}

function isHaulCity(city: string) {
  return HAUL_CITIES.has(city.trim().toLowerCase());
}

function isRoofingCompany(applicant: string) {
  return /roof/.test(lower(applicant));
}

function isHvacShop(applicant: string) {
  return /\bhvac\b|heating|air cond|mechanical llc|mechanical inc|furnace/.test(
    lower(applicant),
  );
}

function isMechanicalPermit(permitType: string) {
  return /mechanical/.test(lower(permitType));
}

function isElectricalOnly(p: PermitInput) {
  const type = lower(p.permitType);
  const work = lower(p.work);
  if (!/electrical/.test(type) && !/^electrical\b/.test(work)) return false;
  return !/demo|demolition|interior|kitchen|bath|addition|remodel|gut/.test(
    `${type} ${work}`,
  );
}

function shouldSkip(p: PermitInput) {
  const text = blob(p);
  if (/\bsolar\b|\bpv\b|photovoltaic/.test(text)) return true;
  if (/seismic/.test(text)) return true;
  if (/\$0\b|valuation\s*0|0\s*revision/.test(text)) return true;
  if (/\bmover|\bmoving\b/.test(text)) return true;
  if (/real estate|realtor/.test(text)) return true;
  if (isElectricalOnly(p)) return true;
  if (isMechanicalPermit(p.permitType) && !/demo|interior|kitchen|addition|pool|remodel/.test(blob(p))) {
    return true;
  }
  return false;
}

function isDemo(text: string) {
  return /demolition|\bdemo\b|tear[\s-]?down|tear[\s-]?off|garage demo/.test(text);
}

function isInterior(text: string) {
  return /interior|kitchen|bath|remodel|alteration|gut/.test(text);
}

function isAddition(text: string) {
  return /addition|dormer|new construction|new build|new single/.test(text);
}

function isPool(text: string) {
  return /\bpool\b/.test(text);
}

function isDeck(text: string) {
  return /\bdeck\b/.test(text);
}

function isRoof(text: string) {
  return /re-?roof|reroof|\broofing\b|\broof\b/.test(text) && !/proof/.test(text);
}

function windowsCalledOut(work: string, permitType: string) {
  return /window/.test(`${work} ${permitType}`.toLowerCase());
}

function dropNamedTradeChips(trades: Trade[], applicant: string) {
  const a = lower(applicant);
  let next = [...trades];
  if (/paint/.test(a)) next = next.filter((t) => t !== "paint");
  if (/floor/.test(a)) next = next.filter((t) => t !== "flooring");
  if (isHvacShop(applicant)) next = next.filter((t) => t !== "hvac");
  if (/fence/.test(a)) next = next.filter((t) => t !== "fence");
  if (/landscap/.test(a)) next = next.filter((t) => t !== "landscape");
  if (/window/.test(a)) next = next.filter((t) => t !== "windows");
  if (/roof/.test(a)) next = next.filter((t) => t !== "roofing");
  return next;
}

export function classify(p: PermitInput): ClassifyResult {
  const text = blob(p);
  const haul = isHaulCity(p.city);

  if (shouldSkip(p)) return { status: "skip", trades: [] };

  if (
    isRoof(text) &&
    !isDemo(text) &&
    !isInterior(text) &&
    !isAddition(text)
  ) {
    if (isRoofingCompany(p.applicant)) return { status: "skip", trades: [] };
    const trades: Trade[] = ["roofing"];
    return haul
      ? { status: "mine", trades }
      : { status: "sell", trades };
  }

  let trades: Trade[] = [];

  if (isInterior(text)) {
    trades.push("flooring", "paint");
  }
  if (isAddition(text) && !isDeck(text)) {
    trades.push("hvac", "fence", "landscape");
  }
  if (isPool(text)) {
    trades.push("fence", "landscape");
  }
  if (isDeck(text)) {
    trades.push("fence", "landscape");
  }
  if (windowsCalledOut(p.work, p.permitType) || (isAddition(text) && windowsCalledOut(p.work, p.permitType))) {
    trades.push("windows");
  }
  if (isAddition(text) && /window|dormer/.test(text)) {
    trades.push("windows");
  }

  if (isHvacShop(p.applicant) || isMechanicalPermit(p.permitType)) {
    trades = trades.filter((t) => t !== "hvac");
  }

  trades = dropNamedTradeChips(trades, p.applicant);
  trades = uniq(trades).filter((t) => ALL_TRADES.includes(t));

  if (isDemo(text) && !haul) {
    return { status: "sell", trades: uniq(["dumpster", ...trades]) };
  }

  if (haul && (isDemo(text) || isInterior(text) || isAddition(text) || isPool(text))) {
    return { status: "mine", trades };
  }

  if (trades.length) return { status: "sell", trades };
  return { status: "skip", trades: [] };
}

export function parseTrades(raw: string): Trade[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t): t is Trade => ALL_TRADES.includes(t as Trade));
  } catch {
    return [];
  }
}

export function isMineRow(status: string) {
  return status === "mine";
}

export function isSellRow(status: string, trades: Trade[]) {
  if (status === "skip") return false;
  if (status === "sell") return true;
  return status === "mine" && trades.length > 0;
}
