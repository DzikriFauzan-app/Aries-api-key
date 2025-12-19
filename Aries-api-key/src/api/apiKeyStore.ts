import fs from "fs";

const KEY_DB = "data/api_keys.json";
const USAGE_DB = "data/api_usage.json";

export function loadKeys() {
  return fs.existsSync(KEY_DB)
    ? JSON.parse(fs.readFileSync(KEY_DB, "utf8"))
    : [];
}

export function saveKeys(keys: any[]) {
  fs.writeFileSync(KEY_DB, JSON.stringify(keys, null, 2));
}

export function recordUsage(key: string, tokens = 1) {
  const usage = fs.existsSync(USAGE_DB)
    ? JSON.parse(fs.readFileSync(USAGE_DB, "utf8"))
    : {};

  usage[key] = usage[key] || { count: 0, tokens: 0 };
  usage[key].count += 1;
  usage[key].tokens += tokens;

  fs.writeFileSync(USAGE_DB, JSON.stringify(usage, null, 2));
  return usage[key];
}

export function getUsage(key: string) {
  if (!fs.existsSync(USAGE_DB)) return null;
  const usage = JSON.parse(fs.readFileSync(USAGE_DB, "utf8"));
  return usage[key] || null;
}
