import { ARIES_LAWS, UserPlan, getPlanByLevel } from './governanceLaw';
import { LocalQuotaManager } from './localQuota';
import { LocalSovereignStorage } from './localSovereign';

export class PolicyChecker {
  /**
   * Validasi apakah user diijinkan untuk mengirim pesan baru
   */
  static async canChat(plan: UserPlan, level: number = 1): Promise<{ allowed: boolean; message: string }> {
    const policy = plan.startsWith('ENTERPRISE') ? getPlanByLevel(level) : ARIES_LAWS[plan];
    
    // Cek kuota harian (Reset 00:00 diatur di dalam LocalQuotaManager)
    const quota = await LocalQuotaManager.checkAndIncrement(policy.dailyChatLimit);

    if (!quota.allowed) {
      return {
        allowed: false,
        message: `Limit chat harian (${policy.dailyChatLimit}) tercapai. Upgrade atau tunggu reset pukul 00:00.`
      };
    }

    return { allowed: true, message: "Authorized" };
  }

  /**
   * Validasi apakah masih ada slot untuk memori permanen
   */
  static canSaveMemory(plan: UserPlan, level: number = 1): boolean {
    const policy = plan.startsWith('ENTERPRISE') ? getPlanByLevel(level) : ARIES_LAWS[plan];
    const currentMemoryCount = LocalSovereignStorage.getCount();

    return currentMemoryCount < policy.maxExplicitMemory;
  }
}
