import { ApiKey, SYSTEM_KEY_DEF, GUEST_KEY_DEF } from "./types";

export class KeyRegistry {
    private keys = new Map<string, ApiKey>();

    constructor() {
        this.register(SYSTEM_KEY_DEF);
        this.register(GUEST_KEY_DEF);
    }

    register(keyDef: ApiKey) {
        this.keys.set(keyDef.key, keyDef);
    }

    validate(keyString: string): ApiKey | null {
        const found = this.keys.get(keyString);
        if (found) {
            console.log(`[AUTH] Access Granted: ${found.owner} as ${found.role}`);
        }
        return found || null;
    }
}
