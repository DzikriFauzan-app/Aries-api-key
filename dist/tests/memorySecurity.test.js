"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const memoryStore_1 = require("../memory/memoryStore");
const memoryController_1 = require("../memory/memoryController");
const fileMemoryBackend_1 = require("../memory/fileMemoryBackend");
const permissionMatrix_1 = require("../policy/permissionMatrix");
const agentPolicyBinder_1 = require("../policy/agentPolicyBinder");
const auditLogger_1 = require("../audit/auditLogger");
const agent_1 = require("../agent/agent");
const fs = __importStar(require("fs"));
class TestAgent extends agent_1.Agent {
    async handle() { return ""; }
}
(() => {
    const TEST_FILE = ".security_test.json";
    // Bersihkan file sisa sebelum mulai (untuk safety)
    if (fs.existsSync(TEST_FILE))
        fs.unlinkSync(TEST_FILE);
    const backend = new fileMemoryBackend_1.FileMemoryBackend(TEST_FILE);
    const store = new memoryStore_1.MemoryStore(backend);
    const matrix = new permissionMatrix_1.PermissionMatrix();
    // FIX: Gunakan Role "WORKER" yang standar, bukan "SPY"
    matrix.register({
        agent: "secret_agent",
        role: "WORKER",
        allow: ["MEMORY_WRITE", "MEMORY_READ"]
    });
    const audit = new auditLogger_1.AuditLogger();
    const policy = new agentPolicyBinder_1.AgentPolicyBinder(matrix, audit);
    const memory = new memoryController_1.MemoryController(store, policy, audit);
    // FIX: Gunakan Role "WORKER" saat spawn agent
    const agent = new TestAgent("secret_agent", "WORKER");
    // 1. Test Compression
    const messyText = "  Hello    World   ";
    memory.remember(agent, messyText, false); // Not sensitive
    const recall1 = memory.recall(agent);
    if (recall1[0] !== "Hello World") {
        throw new Error(`COMPRESSION FAILED: Got '${recall1[0]}'`);
    }
    // 2. Test Encryption
    const secret = "BLUEPRINT_OMEGA";
    memory.remember(agent, secret, true); // Sensitive!
    // Cek fisik file (harus terenkripsi / tidak terbaca plain)
    const rawFile = fs.readFileSync(TEST_FILE, "utf-8");
    if (rawFile.includes("BLUEPRINT_OMEGA")) {
        throw new Error("ENCRYPTION FAILED: Raw secret found in file!");
    }
    // Cek recall (harus ter-decrypt otomatis)
    const recall2 = memory.recall(agent);
    // recall2 akan berisi [compressed_hello, decrypted_secret]
    // Kita cari yang isinya secret
    const retrievedSecret = recall2.find(s => s === "BLUEPRINT_OMEGA");
    if (!retrievedSecret) {
        throw new Error(`DECRYPTION FAILED: Secret not found in recall results. Got: ${JSON.stringify(recall2)}`);
    }
    // Cleanup
    if (fs.existsSync(TEST_FILE))
        fs.unlinkSync(TEST_FILE);
    console.log("MEMORY SECURITY & COMPRESSION TEST PASSED");
})();
