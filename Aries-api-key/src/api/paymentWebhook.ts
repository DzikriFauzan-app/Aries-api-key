import { setLicense } from "./licenseStore";
import { Plan } from "./licenseTypes";

export function paymentWebhook(payload: any) {
  const { apiKey, plan, status } = payload;
  if (status !== "PAID") {
    return { ignored: true };
  }
  setLicense(apiKey, plan as Plan);
  return { upgraded: true };
}
