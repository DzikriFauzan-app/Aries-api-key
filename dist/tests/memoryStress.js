"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoryAccess_1 = require("../memory/memoryAccess");
const perf_hooks_1 = require("perf_hooks");
async function runMemoryStress() {
    console.log("🧠 STARTING MEMORY GOVERNANCE STRESS TEST (100K)");
    console.log("-----------------------------------------------");
    const fakeMemory = [];
    const start = perf_hooks_1.performance.now();
    for (let i = 1; i <= 100000; i++) {
        try {
            // Menjalankan akses memori melalui Governance Layer
            (0, memoryAccess_1.accessMemory)({
                plan: "PRO", // Menggunakan limitasi PRO (Max 10k)
                action: "WRITE",
                memory: fakeMemory,
                payload: { id: i, data: "Sovereign Intelligence Unit " + i }
            });
            if (i % 25000 === 0) {
                const currentUsage = process.memoryUsage().heapUsed / 1024 / 1024;
                console.log(`   [PROGRESS] ${i} ops | RAM Usage: ${currentUsage.toFixed(2)} MB`);
            }
        }
        catch (e) {
            // Seharusnya berhenti di 10.000 karena policy PRO yang kita buat
            if (e.message === "MEMORY_LIMIT_EXCEEDED") {
                console.log(`\n🛑 GOVERNANCE ACTIVE: Blocked at ${i} (Policy: PRO Max 10.000)`);
                break;
            }
            console.error("💀 UNEXPECTED ERROR:", e.message);
            break;
        }
    }
    const end = perf_hooks_1.performance.now();
    const duration = (end - start) / 1000;
    console.log("-----------------------------------------------");
    console.log(`✅ TEST FINISHED`);
    console.log(`⏱️  Duration: ${duration.toFixed(3)}s`);
    console.log(`📊 Efficiency: ${(100000 / duration).toFixed(0)} check/sec`);
}
runMemoryStress();
