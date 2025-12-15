"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeacLoop = void 0;
const crypto_1 = require("crypto");
const authority_1 = require("../auth/authority");
const keyRegistry_1 = require("../auth/keyRegistry");
class FeacLoop {
    constructor(bus) {
        this.bus = bus;
        this.keyRegistry = new keyRegistry_1.KeyRegistry();
    }
    start() {
        this.bus.subscribe("TASK_ASSIGNED", async (evt) => {
            await this.processTask(evt);
        });
    }
    async processTask(evt) {
        const payload = evt.payload;
        const taskType = payload.type;
        // Inject API Key (Default System for backward compat)
        const apiKeyStr = payload.apiKey || "aries-master-key-123";
        const key = this.keyRegistry.validate(apiKeyStr);
        if (!key) {
            console.log(`FEAC REJECT: Invalid API Key ${apiKeyStr}`);
            return;
        }
        // 1. DETERMINE REQUIRED SCOPE
        let requiredScope = null;
        if (taskType === "fs.write" || taskType === "FILE_WRITE") {
            requiredScope = "fs.write";
        }
        else if (taskType === "fs.read" || taskType === "FILE_READ") {
            requiredScope = "fs.read";
        }
        else if (taskType === "system.exec") {
            requiredScope = "system.exec";
        }
        else if (taskType === "RESPOND") {
            requiredScope = null; // Chat response doesn't need privileged scope
        }
        else {
            // UNKNOWN TASK TYPE -> REJECT BY DEFAULT
            console.log(`FEAC REJECT: Unknown task type '${taskType}' - Deny by default`);
            await this.emitReject(evt, "UNKNOWN_TASK_TYPE");
            return;
        }
        // 2. CHECK SCOPE POSSESSION
        if (requiredScope) {
            if (!key.scopes.includes(requiredScope)) {
                console.log(`FEAC REJECT: Key ${key.id} missing scope ${requiredScope} for task ${taskType}`);
                await this.emitReject(evt, "SCOPE_DENIED");
                return;
            }
        }
        // 3. SIGN & APPROVE
        const signature = (0, authority_1.signPayload)(payload.params || {}, key.id);
        await this.bus.publish({
            id: (0, crypto_1.randomUUID)(),
            type: "TASK_APPROVED",
            source: "FEAC",
            timestamp: Date.now(),
            correlationId: evt.correlationId,
            payload: {
                ...payload,
                authority: {
                    keyId: key.id,
                    signature: signature
                }
            }
        });
    }
    async emitReject(origin, reason) {
        await this.bus.publish({
            id: (0, crypto_1.randomUUID)(),
            type: "TASK_REJECTED",
            source: "FEAC",
            timestamp: Date.now(),
            correlationId: origin.correlationId,
            payload: { reason }
        });
    }
}
exports.FeacLoop = FeacLoop;
