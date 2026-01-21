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
exports.ReasoningEngine = void 0;
const evolution_1 = require("./evolution");
const fs = __importStar(require("fs"));
const child_process_1 = require("child_process");
class ReasoningEngine {
    static async synthesize(prompt) {
        let cleanPrompt = this.extractPrompt(prompt);
        if (cleanPrompt.toLowerCase().includes("asimilasi")) {
            const status = await evolution_1.AriesEvolution.assimilateUpgrade();
            return this.createResponse(`[ASIMILASI] ${status.message}`, "Evolution", cleanPrompt);
        }
        // PENCARIAN ABSOLUT TANPA FILTER KATA "CARI/FILE"
        if (cleanPrompt.toLowerCase().includes("temukan") || cleanPrompt.toLowerCase().includes("search")) {
            return this.performGlobalSearch(cleanPrompt);
        }
        if (cleanPrompt.toLowerCase().includes("baca file")) {
            return this.handleDeepRead(cleanPrompt);
        }
        return this.createResponse(`[DEIFIC_LOGIC] Sovereign, sistem siap melacak 41 Agen Anda.`, "Logic", cleanPrompt);
    }
    static performGlobalSearch(query) {
        try {
            // Mengambil kata kunci terakhir setelah kata "temukan" atau "search"
            const parts = query.split(/temukan|search/i);
            const keyword = parts[parts.length - 1].trim();
            // Mencari di seluruh folder NeoEngine untuk menemukan file .py agen
            const cmd = `find "/sdcard/Buku saya/Fauzan engine/NeoEngine" -iname "*${keyword}*" | head -n 20`;
            const result = (0, child_process_1.execSync)(cmd).toString().trim();
            return this.createResponse(`[GLOBAL_SCOUT] Hasil pelacakan "${keyword}":\n${result ? result : "Tidak ditemukan fisik file."}`, "Retrieval", query);
        }
        catch (e) {
            return this.createResponse("Gagal akses filesystem.", "Error", query);
        }
    }
    static handleDeepRead(query) {
        const match = query.match(/([a-zA-Z0-9._-]+\.(ts|js|json|md|txt|sh|py|db))/);
        if (!match)
            return this.createResponse("Sebutkan nama file.", "Error", query);
        const fileName = match[1];
        const findCmd = `find "/sdcard/Buku saya/Fauzan engine/NeoEngine" -name "${fileName}" | head -n 1`;
        try {
            const fullPath = (0, child_process_1.execSync)(findCmd).toString().trim();
            if (fullPath) {
                const content = fs.readFileSync(fullPath, 'utf-8').substring(0, 2000);
                return this.createResponse(`[DEEP_READ] ${fileName}:\n\n${content}`, "Reading", query);
            }
            return this.createResponse("File tidak ditemukan.", "Error", query);
        }
        catch (e) {
            return this.createResponse("Error membaca file.", "Error", query);
        }
    }
    static createResponse(output, goal, input) {
        return {
            finalAnswer: `ANSWER(VALID(${output}))`,
            plan: { goal, steps: [{ id: Date.now(), type: "PROCESS", description: output, input, output: "DONE" }] }
        };
    }
    static extractPrompt(input) {
        try {
            const p = JSON.parse(input);
            return (p.finalAnswer || p.command || input).replace(/^ANSWER\(VALID\((.*)\)\)$/, '$1');
        }
        catch {
            return input;
        }
    }
}
exports.ReasoningEngine = ReasoningEngine;
