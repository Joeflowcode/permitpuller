import { classify, type PermitInput } from "./classify";

export type SeedRow = PermitInput & {
  issuedOn: string;
  sourceUrl?: string;
  notes?: string;
};

export const SEED_ROWS: SeedRow[] = [
  {
    city: "Salem",
    address: "2324 47th Ave NE",
    permitType: "Demolition",
    work: "Residential demolition",
    applicant: "Owner",
    issuedOn: "2026-08-04",
    notes: "Salem demo — Joey haul. Do not email trades.",
  },
  {
    city: "Salem",
    address: "1955 Beach Ave NE",
    permitType: "Interior alteration",
    work: "Kitchen and interior remodel / gut",
    applicant: "Owner",
    issuedOn: "2026-07-30",
    notes: "Salem interiors — dump for Joey, leftovers to flooring and paint.",
  },
  {
    city: "Salem",
    address: "2080 Manorview Cir NW",
    permitType: "Addition",
    work: "Addition with new windows",
    applicant: "Owner",
    issuedOn: "2026-07-22",
    notes: "Salem addition — haul plus leftover trades.",
  },
  {
    city: "Portland",
    address: "14036 SE Mall",
    permitType: "Demolition",
    work: "Garage demolition",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
    notes: "PortlandMaps issued. List-only — dumpster, no Joey haul.",
  },
  {
    city: "Portland",
    address: "5405 SE Ramona",
    permitType: "Interior alteration",
    work: "Kitchen remodel",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
  },
  {
    city: "Portland",
    address: "6655 N Astor",
    permitType: "Interior alteration",
    work: "Interior remodel",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
  },
  {
    city: "Portland",
    address: "3124 NE Irving",
    permitType: "Interior alteration",
    work: "Kitchen and bath remodel",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
  },
  {
    city: "Portland",
    address: "8106 N Interstate",
    permitType: "Interior alteration",
    work: "Interior alteration",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
  },
  {
    city: "Portland",
    address: "2406 NE Halsey",
    permitType: "Interior alteration",
    work: "Kitchen remodel",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
    notes: "No HVAC — interiors only.",
  },
  {
    city: "Portland",
    address: "1039 SE 78th",
    permitType: "Interior alteration",
    work: "Interior remodel, window replacement",
    applicant: "NW Cascade Painting",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
    notes: "Painter already on the permit — no paint chip.",
  },
  {
    city: "Portland",
    address: "7306 N Newell",
    permitType: "Interior alteration",
    work: "Interior remodel and window replacement",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
  },
  {
    city: "Portland",
    address: "735 SE Malden",
    permitType: "Addition",
    work: "Dormers",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
  },
  {
    city: "Portland",
    address: "1521 SE 42nd",
    permitType: "Addition",
    work: "Deck",
    applicant: "Owner",
    issuedOn: "2026-08-15",
    sourceUrl: "https://www.portlandmaps.com/",
  },
];

export function classifiedSeed() {
  return SEED_ROWS.map((row) => {
    const result = classify(row);
    return { ...row, ...result };
  });
}
