"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriesCore = void 0;
const policyChecker_1 = require("./memory/policyChecker");
const localSovereign_1 = require("./memory/localSovereign");
const intelligenceDecoder_1 = require("./memory/intelligenceDecoder");
const siphonProtocol_1 = require("./memory/siphonProtocol");
class AriesCore {
    constructor(userId, plan, level = 1) {
        this.userId = userId;
        this.plan = plan;
        this.level = level;
    }
    async processChat(userInput, aiResponse) {
        // 1. Validasi Kuota (Hukum 15.5)
        const access = await policyChecker_1.PolicyChecker.canChat(this.plan, this.level);
        if (!access.allowed) {
            return { status: 'LOCKED', message: access.message };
        }
        // 2. Simpan Memori ke Lokal (Kedaulatan 15.6)
        if (policyChecker_1.PolicyChecker.canSaveMemory(this.plan, this.level)) {
            localSovereign_1.LocalSovereignStorage.save(aiResponse, { userQuery: userInput });
        }
        // 3. Analisis & Sedot Ilmu (Intelijen 15.7 & 15.8)
        const insight = intelligenceDecoder_1.IntelligenceDecoder.decode(userInput, aiResponse);
        if (insight.isValuable) {
            await siphonProtocol_1.SiphonProtocol.transmit(insight, this.userId);
        }
        return {
            status: 'SUCCESS',
            data: aiResponse,
            insightFound: insight.isValuable
        };
    }
}
exports.AriesCore = AriesCore;
