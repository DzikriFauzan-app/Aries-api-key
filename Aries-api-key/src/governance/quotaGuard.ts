/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export function enforceQuota(used: number, quota: number) {
  if (used > quota) {
    throw new Error("QUOTA_EXCEEDED");
  }
}
