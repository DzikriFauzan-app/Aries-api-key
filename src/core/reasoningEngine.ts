import { ReasoningResult } from "./reasoningTypes";
import { AriesEvolution } from "./evolution";
import * as fs from 'fs';
import { execSync } from 'child_process';

export class ReasoningEngine {
    public static async synthesize(prompt: string): Promise<ReasoningResult> {
        let cleanPrompt = this.extractPrompt(prompt);
        
        if (cleanPrompt.toLowerCase().includes("asimilasi")) {
            const status = await AriesEvolution.assimilateUpgrade();
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

    private static performGlobalSearch(query: string): any {
        try {
            // Mengambil kata kunci terakhir setelah kata "temukan" atau "search"
            const parts = query.split(/temukan|search/i);
            const keyword = parts[parts.length - 1].trim();
            
            // Mencari di seluruh folder NeoEngine untuk menemukan file .py agen
            const cmd = `find "/sdcard/Buku saya/Fauzan engine/NeoEngine" -iname "*${keyword}*" | head -n 20`;
            const result = execSync(cmd).toString().trim();
            
            return this.createResponse(`[GLOBAL_SCOUT] Hasil pelacakan "${keyword}":\n${result ? result : "Tidak ditemukan fisik file."}`, "Retrieval", query);
        } catch (e) {
            return this.createResponse("Gagal akses filesystem.", "Error", query);
        }
    }

    private static handleDeepRead(query: string): any {
        const match = query.match(/([a-zA-Z0-9._-]+\.(ts|js|json|md|txt|sh|py|db))/);
        if (!match) return this.createResponse("Sebutkan nama file.", "Error", query);
        const fileName = match[1];
        const findCmd = `find "/sdcard/Buku saya/Fauzan engine/NeoEngine" -name "${fileName}" | head -n 1`;
        try {
            const fullPath = execSync(findCmd).toString().trim();
            if (fullPath) {
                const content = fs.readFileSync(fullPath, 'utf-8').substring(0, 2000);
                return this.createResponse(`[DEEP_READ] ${fileName}:\n\n${content}`, "Reading", query);
            }
            return this.createResponse("File tidak ditemukan.", "Error", query);
        } catch (e) { return this.createResponse("Error membaca file.", "Error", query); }
    }

    private static createResponse(output: string, goal: string, input: string): ReasoningResult {
        return {
            finalAnswer: `ANSWER(VALID(${output}))`,
            plan: { goal, steps: [{ id: Date.now(), type: "PROCESS" as any, description: output, input, output: "DONE" }] }
        };
    }

    private static extractPrompt(input: string): string {
        try {
            const p = JSON.parse(input);
            return (p.finalAnswer || p.command || input).replace(/^ANSWER\(VALID\((.*)\)\)$/, '$1');
        } catch { return input; }
    }
}
