export const GRACE_MS = 1 * 24 * 3600 * 1000; // 24 Jam ketat
export const GOLDEN_HOUR_MS = 2 * 3600 * 1000; // 2 Jam terakhir promo gila

export function getGraceStatus(expireAt: number) {
  const now = Date.now();
  const deadline = expireAt + GRACE_MS;
  const timeLeft = deadline - now;

  if (timeLeft <= 0) return { status: "EXPIRED_FORCE_FREE" };
  
  // Deteksi 2 jam terakhir (Golden Hour)
  if (timeLeft <= GOLDEN_HOUR_MS) {
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
