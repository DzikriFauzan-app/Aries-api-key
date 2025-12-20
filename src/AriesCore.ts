import { PolicyChecker } from './memory/policyChecker';
import { LocalSovereignStorage } from './memory/localSovereign';
import { IntelligenceDecoder } from './memory/intelligenceDecoder';
import { SiphonProtocol } from './memory/siphonProtocol';
import { UserPlan } from './memory/governanceLaw';

export class AriesCore {
  constructor(private userId: string, private plan: UserPlan, private level: number = 1) {}

  async processChat(userInput: string, aiResponse: string) {
    // 1. Validasi Kuota (Hukum 15.5)
    const access = await PolicyChecker.canChat(this.plan, this.level);
    if (!access.allowed) {
      return { status: 'LOCKED', message: access.message };
    }

    // 2. Simpan Memori ke Lokal (Kedaulatan 15.6)
    if (PolicyChecker.canSaveMemory(this.plan, this.level)) {
      LocalSovereignStorage.save(aiResponse, { userQuery: userInput });
    }

    // 3. Analisis & Sedot Ilmu (Intelijen 15.7 & 15.8)
    const insight = IntelligenceDecoder.decode(userInput, aiResponse);
    if (insight.isValuable) {
      await SiphonProtocol.transmit(insight, this.userId);
    }

    return {
      status: 'SUCCESS',
      data: aiResponse,
      insightFound: insight.isValuable
    };
  }
}
