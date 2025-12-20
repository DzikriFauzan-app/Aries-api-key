import fs from "fs";
import { getLicense } from "./licenseStore";

const KEY_DB = "data/api_keys.json";

export function publicAuth(req: any, res: any, next: any) {
  const apiKey = req.headers["x-aries-key"];
  if (!apiKey) {
    return res.status(401).json({ error: "API_KEY_REQUIRED" });
  }

  if (!fs.existsSync(KEY_DB)) {
    return res.status(401).json({ error: "API_KEY_DB_MISSING" });
  }

  const keys = JSON.parse(fs.readFileSync(KEY_DB, "utf8"));
  const record = keys.find((k: any) => k.key === apiKey);

  if (!record) {
    return res.status(403).json({ error: "INVALID_API_KEY" });
  }

  const license = getLicense(apiKey);

  req.apiKey = apiKey;
  req.plan = license.plan;

  next();
}
