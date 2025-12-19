import { billingGuard } from "../api/publicBillingGuard";
import { recordUsage } from "../api/usageMeter";

test("Billing guard blocks when quota exceeded", () => {
  const key = "aries-billing-guard-test";

  recordUsage(key, 200000);

  expect(() => billingGuard(key)).toThrow("QUOTA_EXCEEDED");
});
