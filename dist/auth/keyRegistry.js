"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyRegistry = void 0;
const types_1 = require("./types");
class KeyRegistry {
    constructor() {
        this.keys = new Map();
        this.register(types_1.SYSTEM_KEY_DEF);
        this.register(types_1.GUEST_KEY_DEF);
    }
    register(keyDef) {
        this.keys.set(keyDef.key, keyDef);
    }
    validate(keyString) {
        return this.keys.get(keyString) || null;
    }
}
exports.KeyRegistry = KeyRegistry;
