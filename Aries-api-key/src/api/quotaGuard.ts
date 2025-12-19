import { getUsage, recordUsage } from "./apiKeyStore";

export function enforceQuota(apiKey: any, tokens = 1) {
  const usage = recordUsage(apiKey.key, tokens);

  if (apiKey.banned === "HARD") {
    throw new Error("API_KEY_HARD_BANNED");
  }

  if (apiKey.banned === "SOFT") {
    throw new Error("API_KEY_SOFT_BANNED");
  }

  if (usage.tokens > apiKey.quota) {
    throw new Error("API_QUOTA_EXCEEDED");
  }

  return true;
}
