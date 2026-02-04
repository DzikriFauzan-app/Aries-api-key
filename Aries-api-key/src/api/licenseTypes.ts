/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';


export type Plan = "FREE" | "PRO" | "ENTERPRISE";

export interface License {
  plan: Plan;
  status: "ACTIVE" | "SUSPENDED" | "EXPIRED";
  startedAt: number;
  expiresAt: number;
}
