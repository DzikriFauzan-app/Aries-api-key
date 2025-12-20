export type UserPlan = 'FREE' | 'PRO' | 'ENTERPRISE_L1' | 'ENTERPRISE_L10' | 'PLATINUM';

export interface PlanPolicy {
  dailyChatLimit: number;
  maxExplicitMemory: number;
  monthlyPriceUSD: number;
  yearlyPriceUSD: number; // Diskon 25% (9 bulan)
}

export const ARIES_LAWS: Record<UserPlan, PlanPolicy> = {
  FREE: {
    dailyChatLimit: 40,
    maxExplicitMemory: 100,
    monthlyPriceUSD: 0,
    yearlyPriceUSD: 0
  },
  PRO: {
    dailyChatLimit: 500,
    maxExplicitMemory: 10000,
    monthlyPriceUSD: 10,
    yearlyPriceUSD: 90
  },
  ENTERPRISE_L1: {
    dailyChatLimit: 10000,
    maxExplicitMemory: 100000,
    monthlyPriceUSD: 100,
    yearlyPriceUSD: 900
  },
  // Contoh Level 10 dengan kenaikan +5k chat per level
  ENTERPRISE_L10: {
    dailyChatLimit: 55000,
    maxExplicitMemory: 1000000,
    monthlyPriceUSD: 550,
    yearlyPriceUSD: 4950
  },
  PLATINUM: {
    dailyChatLimit: -1, // Unlimited
    maxExplicitMemory: 10000000, // 10M+
    monthlyPriceUSD: 750,
    yearlyPriceUSD: 6750
  }
};

export function getPlanByLevel(level: number): PlanPolicy {
  if (level <= 1) return ARIES_LAWS.ENTERPRISE_L1;
  const baseChat = 10000;
  const baseMemory = 100000;
  const basePrice = 100;
  
  return {
    dailyChatLimit: baseChat + ((level - 1) * 5000), // +5k chat per level
    maxExplicitMemory: baseMemory * level, // +100k memory per level
    monthlyPriceUSD: basePrice + ((level - 1) * 50/1), // Estimasi kenaikan harga
    yearlyPriceUSD: (basePrice + ((level - 1) * 50)) * 9 // Harga 9 bulan
  };
}
