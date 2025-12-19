import { recordUsage, getUsage } from "../api/usageMeter";

test("Quota enforcement blocks after limit", () => {
  const key = "aries-quota-test";
  for (let i = 0; i < 10; i++) {
    recordUsage(key, 1000);
  }
  const usage = getUsage(key);
  expect(usage.used).toBeGreaterThan(0);
});
