import fs from "fs";

const USAGE_DB = "data/usage.json";

type UsageRec = {
  used: number;
  lastUsedAt: number;
};

function load(): Record<string, UsageRec> {
  if (!fs.existsSync(USAGE_DB)) {
    fs.writeFileSync(USAGE_DB, "{}");
    return {};
  }
  return JSON.parse(fs.readFileSync(USAGE_DB, "utf8"));
}

function save(db: Record<string, UsageRec>) {
  fs.writeFileSync(USAGE_DB, JSON.stringify(db, null, 2));
}

export function getUsage(apiKey: string): UsageRec {
  const db = load();
  if (!db[apiKey]) {
    db[apiKey] = { used: 0, lastUsedAt: Date.now() };
    save(db);
  }
  return db[apiKey];
}

export function recordUsage(apiKey: string, amount: number) {
  const db = load();
  if (!db[apiKey]) {
    db[apiKey] = { used: 0, lastUsedAt: Date.now() };
  }
  db[apiKey].used += amount;
  db[apiKey].lastUsedAt = Date.now();
  save(db);
}
