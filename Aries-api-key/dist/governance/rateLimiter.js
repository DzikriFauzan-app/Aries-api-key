"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRate = checkRate;
const windowMs = 60000;
const limit = 120;
const hits = new Map();
function checkRate(key) {
    const now = Date.now();
    const rec = hits.get(key);
    if (!rec || now - rec.ts > windowMs) {
        hits.set(key, { count: 1, ts: now });
        return true;
    }
    if (rec.count >= limit)
        return false;
    rec.count++;
    return true;
}
