import { getBilling, consumeQuota } from "../api/billingEngine";

test("FREE quota enforced", () => {
  const key = "aries-test-quota";
  const b = getBilling(key);

  for (let i = 0; i < b.limit; i++) {
    consumeQuota(key);
  }

  expect(() => consumeQuota(key)).toThrow();
});
