import { enforceQuota } from "../api/quotaGuard";

test("Soft ban blocks API usage", () => {
  const apiKey = {
    key: "soft-ban-key",
    quota: 100,
    banned: "SOFT"
  };

  expect(() => enforceQuota(apiKey, 1)).toThrow("API_KEY_SOFT_BANNED");
});

test("Hard ban blocks API usage", () => {
  const apiKey = {
    key: "hard-ban-key",
    quota: 100,
    banned: "HARD"
  };

  expect(() => enforceQuota(apiKey, 1)).toThrow("API_KEY_HARD_BANNED");
});
