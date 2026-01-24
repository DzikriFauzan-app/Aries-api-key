export type ApiScope = "fs.read" | "fs.write" | "system.exec" | "network.all";

export interface ApiKey {
    id: string;
    key: string;
    owner: string;
    role: 'OWNER' | 'SYSTEM' | 'GUEST';
    scopes: ApiScope[];
    maxSeverity: number;
}

export const SYSTEM_KEY_DEF: ApiKey = {
    id: "SOVEREIGN_OWNER",
    key: "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1",
    owner: "Dzikri Fauzan",
    role: "OWNER",
    scopes: ["fs.read", "fs.write", "system.exec", "network.all"],
    maxSeverity: 10
};

export const GUEST_KEY_DEF: ApiKey = {
    id: "guest-1",
    key: "guest-key",
    owner: "GUEST",
    role: "GUEST",
    scopes: ["fs.read"],
    maxSeverity: 1
};
