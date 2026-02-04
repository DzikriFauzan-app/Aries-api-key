/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export function billingHook(apiKey: any, usage: any) {
  // FEAC / Stripe / Manual hook
  // Dipanggil async oleh FEAC layer
  return {
    owner: apiKey.owner,
    used: usage.tokens,
    quota: apiKey.quota,
    billable: Math.max(0, usage.tokens - apiKey.quota)
  };
}
