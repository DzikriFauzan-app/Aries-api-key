/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
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
