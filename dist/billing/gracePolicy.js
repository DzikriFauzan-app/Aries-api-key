"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOLDEN_HOUR_MS = exports.GRACE_MS = void 0;
exports.getGraceStatus = getGraceStatus;
exports.GRACE_MS = 1 * 24 * 3600 * 1000; // 24 Jam ketat
exports.GOLDEN_HOUR_MS = 2 * 3600 * 1000; // 2 Jam terakhir promo gila
function getGraceStatus(expireAt) {
    const now = Date.now();
    const deadline = expireAt + exports.GRACE_MS;
    const timeLeft = deadline - now;
    if (timeLeft <= 0)
        return { status: "EXPIRED_FORCE_FREE" };
    // Deteksi 2 jam terakhir (Golden Hour)
    if (timeLeft <= exports.GOLDEN_HOUR_MS) {
        return {
            status: "GOLDEN_HOUR",
            timeLeftMinutes: Math.floor(timeLeft / 60000),
            offers: {
                annual: "35% OFF (Valid 10 Min)",
                monthly: "10% OFF (Valid 10 Min)"
            }
        };
    }
    return { status: "GRACE_PERIOD_ACTIVE" };
}
