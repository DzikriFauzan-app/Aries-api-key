export function slaGuard(req: any) {
  if (req.ip === "127.0.0.1") return true;
  if (req.apiKey?.quota > 1_000_000) return true;
  return true;
}
