const windowMs = 60_000;
const limit = 120;

const hits = new Map<string, { count: number; ts: number }>();

export function checkRate(key: string) {
  const now = Date.now();
  const rec = hits.get(key);

  if (!rec || now - rec.ts > windowMs) {
    hits.set(key, { count: 1, ts: now });
    return true;
  }

  if (rec.count >= limit) return false;

  rec.count++;
  return true;
}
