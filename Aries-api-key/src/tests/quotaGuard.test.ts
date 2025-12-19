import { enforceQuota } from "../api/quotaGuard";

test("Quota allows usage below limit", () => {
  const apiKey = {
    key: "test-key-1",
    quota: 5
  };

  expect(() => enforceQuota(apiKey, 1)).not.toThrow();
});

test("Quota blocks when exceeded", () => {
  const apiKey = {
    key: "test-key-2",
    quota: 0
  };

  expect(() => enforceQuota(apiKey, 1)).toThrow("API_QUOTA_EXCEEDED");
});
