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
    return this.keys.get(keyString) || null;
  }
}
