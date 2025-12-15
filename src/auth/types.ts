export type ApiScope = "fs.read" | "fs.write" | "system.exec";

export interface ApiKey {
  id: string;
  key: string; // Hash di real system, plain di sini utk demo
  owner: "SYSTEM" | "USER";
  scopes: ApiScope[];
  maxSeverity: number;
}

export const SYSTEM_KEY_DEF: ApiKey = {
  id: "sys-root",
  key: "aries-master-key-123",
  owner: "SYSTEM",
  scopes: ["fs.read", "fs.write", "system.exec"],
  maxSeverity: 10
};

export const GUEST_KEY_DEF: ApiKey = {
  id: "guest-1",
  key: "guest-key",
  owner: "USER",
  scopes: ["fs.read"], // Read only
  maxSeverity: 1
};
