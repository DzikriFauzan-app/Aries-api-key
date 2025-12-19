import { checkRate } from "../governance/rateLimiter";
import { consume } from "../governance/usageMeter";
import { enforceQuota } from "../governance/quotaGuard";
import fs from "fs";

export function handlePublicRequest(apiKey: string, input: string) {
  // 1. Validasi Key ada di DB
  const db = JSON.parse(fs.readFileSync("data/api_keys.json", "utf8"));
  const keyData = db.find((k: any) => k.key === apiKey);
  
  if (!keyData) return { error: "INVALID_API_KEY", status: 401 };

  try {
    // 2. Rate Limit Check (60s window)
    if (!checkRate(apiKey)) return { error: "RATE_LIMIT_EXCEEDED", status: 429 };

    // 3. Usage & Quota Check
    const used = consume(apiKey, 1); // Cost 1 per request
    enforceQuota(used, keyData.quota);

    return { 
      status: 200, 
      result: `Aries processed: ${input}`,
      usage: used,
      remaining: keyData.quota - used
    };
  } catch (e: any) {
    return { error: e.message, status: 403 };
  }
}
