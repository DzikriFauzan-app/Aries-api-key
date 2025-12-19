import { consume } from "../governance/usageMeter";
import { checkRate } from "../governance/rateLimiter";

test("Usage meter increments", () => {
  const used = consume("test-key", 5);
  expect(used).toBeGreaterThanOrEqual(5);
});

test("Rate limiter blocks after threshold", () => {
  let allowed = true;
  for (let i = 0; i < 130; i++) {
    allowed = checkRate("ratelimit-key");
  }
  expect(allowed).toBe(false);
});
