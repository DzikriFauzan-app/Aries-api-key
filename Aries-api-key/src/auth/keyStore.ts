import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "aries_keys.json");

export interface AriesKey {
  key: string;
  owner: string;
  scopes: string[];
  createdAt: number;
}

function load(): AriesKey[] {
  if (!fs.existsSync(STORE_PATH)) return [];
  return JSON.parse(fs.readFileSync(STORE_PATH, "utf8"));
}

function save(keys: AriesKey[]) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(keys, null, 2));
}

export function storeKey(k: AriesKey) {
  const keys = load();
  keys.push(k);
  save(keys);
}

export function findKey(key: string): AriesKey | undefined {
  return load().find(k => k.key === key);
}
