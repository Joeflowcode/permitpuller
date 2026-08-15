import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { classify, isMineRow, isSellRow } from "./classify";

describe("classify Portland", () => {
  it("sends demo to dumpster shops as sell, never mine", () => {
    const result = classify({
      city: "Portland",
      address: "14036 SE Mall St",
      permitType: "Demolition",
      work: "demolition, detached garage",
      applicant: "Owner",
    });
    assert.equal(result.status, "sell");
    assert.ok(result.trades.includes("dumpster"));
    assert.equal(isMineRow(result.status, "Portland"), false);
    assert.equal(isSellRow(result.status, result.trades, "Portland"), true);
  });

  it("sells kitchen guts to flooring and paint", () => {
    const result = classify({
      city: "Portland",
      address: "5405 SE Ramona St",
      permitType: "Interior alteration",
      work: "kitchen remodel",
      applicant: "Owner",
    });
    assert.equal(result.status, "sell");
    assert.ok(result.trades.includes("flooring"));
    assert.ok(result.trades.includes("paint"));
    assert.equal(result.trades.includes("dumpster"), false);
  });

  it("does not put dumpster on non-Portland sell rows", () => {
    const result = classify({
      city: "Albany",
      address: "100 Main St",
      permitType: "Demolition",
      work: "garage demo",
      applicant: "Owner",
    });
    assert.equal(result.status, "sell");
    assert.equal(result.trades.includes("dumpster"), false);
  });

  it("keeps Salem demo on Joey mine list without a dumpster chip", () => {
    const result = classify({
      city: "Salem",
      address: "2324 47th Ave NE",
      permitType: "Demolition",
      work: "house demo",
      applicant: "Owner",
    });
    assert.equal(result.status, "mine");
    assert.equal(result.trades.includes("dumpster"), false);
  });

  it("skips solar, movers, and realtor packs in Portland", () => {
    assert.equal(
      classify({
        city: "Portland",
        address: "1 Main",
        permitType: "Electrical",
        work: "solar pv array",
        applicant: "Sun Co",
      }).status,
      "skip",
    );
    assert.equal(
      classify({
        city: "Portland",
        address: "1 Main",
        permitType: "Other",
        work: "moving company staging",
        applicant: "Two Men and a Truck",
      }).status,
      "skip",
    );
  });
});
