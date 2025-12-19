import crypto from "crypto";
import { storeKey } from "./keyStore";

export function issueKey(
  owner: string,
  scopes: string[]
) {
  const key = "aries-" + crypto.randomBytes(16).toString("hex");

  storeKey({
    key,
    owner,
    scopes,
    createdAt: Date.now()
  });

  return key;
}
