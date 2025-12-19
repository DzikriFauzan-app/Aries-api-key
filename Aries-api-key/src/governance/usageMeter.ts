import fs from "fs";

const USAGE_DB = "data/usage.json";

interface UsageRecord {
  key: string;
  used: number;
  updatedAt: number;
}

function load(): UsageRecord[] {
  if (!fs.existsSync(USAGE_DB)) return [];
  return JSON.parse(fs.readFileSync(USAGE_DB, "utf8"));
}

function save(db: UsageRecord[]) {
  fs.writeFileSync(USAGE_DB, JSON.stringify(db, null, 2));
}

export function consume(key: string, cost = 1) {
  const db = load();
  let rec = db.find(r => r.key === key);

  if (!rec) {
    rec = { key, used: 0, updatedAt: Date.now() };
    db.push(rec);
  }

  rec.used += cost;
  rec.updatedAt = Date.now();
  save(db);

  return rec.used;
}
