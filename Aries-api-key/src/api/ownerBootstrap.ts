import fs from "fs";
import crypto from "crypto";

const OWNER_FILE = "data/owner.key.json";

export function bootstrapOwner() {
  if (fs.existsSync(OWNER_FILE)) {
    return JSON.parse(fs.readFileSync(OWNER_FILE, "utf8"));
  }

  const ownerKey = {
    key: "aries-owner-" + crypto.randomBytes(24).toString("hex"),
    role: "OWNER",
    scopes: ["*"],
    createdAt: Date.now()
  };

  fs.mkdirSync("data", { recursive: true });
  fs.writeFileSync(OWNER_FILE, JSON.stringify(ownerKey, null, 2));

  return ownerKey;
}
