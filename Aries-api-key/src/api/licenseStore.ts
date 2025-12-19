import fs from "fs";
import { License, Plan } from "./licenseTypes";

const LICENSE_DB = "data/licenses.json";

function load(): Record<string, License> {
  if (!fs.existsSync(LICENSE_DB)) return {};
  return JSON.parse(fs.readFileSync(LICENSE_DB, "utf8"));
}

function save(db: Record<string, License>) {
  fs.writeFileSync(LICENSE_DB, JSON.stringify(db, null, 2));
}

export function getLicense(apiKey: string): License {
  const db = load();

  if (!db[apiKey]) {
    db[apiKey] = {
      plan: "FREE",
      status: "ACTIVE",
      startedAt: Date.now(),
      expiresAt: Date.now() + 30 * 24 * 3600 * 1000
    };
    save(db);
  }

  return db[apiKey];
}

export function setLicense(apiKey: string, plan: Plan) {
  const db = load();
  db[apiKey] = {
    plan,
    status: "ACTIVE",
    startedAt: Date.now(),
    expiresAt:
      plan === "FREE"
        ? Date.now() + 30 * 24 * 3600 * 1000
        : Date.now() + 365 * 24 * 3600 * 1000
  };
  save(db);
}
