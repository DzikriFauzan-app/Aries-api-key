import { billingGuard } from "../api/publicBillingGuard";

export function enforceBilling(req: any, res: any, next: any) {
  try {
    const apiKey = req.headers["x-aries-key"];
    if (!apiKey) {
      return res.status(401).json({ error: "API_KEY_REQUIRED" });
    }

    const info = billingGuard(apiKey);
    (req as any).billing = info;
    next();
  } catch (e: any) {
    return res.status(403).json({ error: e.message });
  }
}
