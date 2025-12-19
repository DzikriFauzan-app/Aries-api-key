import crypto from "crypto";
import fs from "fs";

const KEY_DB = "data/api_keys.json";

export function generateApiKey(owner: string, scopes: string[]) {
  const key = {
    key: "aries-" + crypto.randomBytes(20).toString("hex"),
    owner,
    scopes,
    quota: 100_000,
    createdAt: Date.now()
  };

  const db = fs.existsSync(KEY_DB)
    ? JSON.parse(fs.readFileSync(KEY_DB, "utf8"))
    : [];

  db.push(key);
  fs.writeFileSync(KEY_DB, JSON.stringify(db, null, 2));
  return key;
}
