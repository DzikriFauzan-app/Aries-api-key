import * as crypto from "crypto";

const MANAGER_HASH = process.env.ARIES_MANAGER_HASH || "";

export function assertManagerAccess(secret: string) {
  const hash = crypto.createHash("sha256").update(secret).digest("hex");
  if (hash !== MANAGER_HASH) {
    throw new Error("MANAGER_ACCESS_DENIED");
  }
}
