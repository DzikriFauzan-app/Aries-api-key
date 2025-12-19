import { getUsage, recordUsage } from "../api/usageMeter";

test("Usage meter accumulates usage", () => {
  const key = "aries-usage-eof-test";
  recordUsage(key, 500);
  recordUsage(key, 300);

  const usage = getUsage(key);
  expect(usage.used).toBe(800);
});
