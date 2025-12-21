export interface PlanLimit {
  userQuota: number;      // Populasi user unik
  maxIpSlots: number;     // IP yang boleh didaftarkan
  verifierRole: string;   // Siapa yang memverifikasi IP baru?
}

export const PLAN_CONFIGS: Record<string, PlanLimit> = {
  "FREE":          { userQuota: 1,   maxIpSlots: 1, verifierRole: "SELF" },
  "PRO":           { userQuota: 1,   maxIpSlots: 2, verifierRole: "PRIMARY_DEVICE" },
  "ENTERPRISE_1":  { userQuota: 50,  maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_2":  { userQuota: 75,  maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_3":  { userQuota: 100, maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_4":  { userQuota: 125, maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_5":  { userQuota: 150, maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_6":  { userQuota: 175, maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_7":  { userQuota: 200, maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_8":  { userQuota: 225, maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_9":  { userQuota: 250, maxIpSlots: 15, verifierRole: "MANAGER" },
  "ENTERPRISE_10": { userQuota: 275, maxIpSlots: 15, verifierRole: "MANAGER" },
  "PLATINUM":      { userQuota: 500, maxIpSlots: 30, verifierRole: "DIRECTOR/STAFF_HIGH" }
};

export function getPlanLimit(plan: string): PlanLimit {
  return PLAN_CONFIGS[plan] || PLAN_CONFIGS["FREE"];
}
