import fs from "fs";

const LICENSE_DB = "data/licenses.json";

export function getLicense(apiKey: string) {
  if (!fs.existsSync(LICENSE_DB)) {
    fs.writeFileSync(LICENSE_DB, JSON.stringify({}, null, 2));
  }

  const db = JSON.parse(fs.readFileSync(LICENSE_DB, "utf8"));

  if (!db[apiKey]) {
    db[apiKey] = {
      plan: "FREE",
      status: "ACTIVE",
      createdAt: Date.now()
    };
    fs.writeFileSync(LICENSE_DB, JSON.stringify(db, null, 2));
  }

  return db[apiKey];
}
