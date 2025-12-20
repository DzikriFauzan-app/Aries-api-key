export type BillingStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "EXPIRED";

export interface BillingRecord {
  plan: string;
  status: BillingStatus;
  expireAt: number;
  stripeSubId?: string;
}
