import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { isUsableContact, normalizeContact } from "./signup";

describe("normalizeContact", () => {
  it("treats the same Gmail with dots or plus tags as one shop", () => {
    assert.equal(normalizeContact("Joe.Shop+free@gmail.com").key, normalizeContact("joeshop@gmail.com").key);
    assert.equal(normalizeContact("joeshop@googlemail.com").key, "email:joeshop@googlemail.com");
  });

  it("keeps non-Gmail plus tags from colliding across companies", () => {
    assert.equal(normalizeContact("desk+salem@floorpro.com").key, "email:desk@floorpro.com");
  });

  it("treats formatted Salem numbers as the same phone", () => {
    assert.equal(normalizeContact("(541) 425-2008").key, "phone:5414252008");
    assert.equal(normalizeContact("1-541-425-2008").key, "phone:5414252008");
    assert.equal(normalizeContact("5414252008").key, "phone:5414252008");
  });

  it("rejects junk that is neither email nor phone", () => {
    const bad = normalizeContact("flooring shop");
    assert.equal(bad.kind, "unknown");
    assert.equal(isUsableContact(bad), false);
  });

  it("trims and lowercases email", () => {
    assert.equal(normalizeContact("  SAM@Shop.COM  ").key, "email:sam@shop.com");
  });
});
