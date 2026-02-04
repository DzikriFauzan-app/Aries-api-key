/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export const PUBLIC_API_POLICY = {
  rateLimit: "soft",
  quotaEnforced: true,
  memoryIsolation: true,
  jailEnabled: true,
  auditLogged: true,
  ownerOverride: true
};
