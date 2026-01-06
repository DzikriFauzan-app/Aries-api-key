"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usageMeter_1 = require("../api/usageMeter");
const perf_hooks_1 = require("perf_hooks");
async function runStress(label, count) {
    console.log(`\n🔥 EXTREME STRESS TEST: ${label} (${count} operations)`);
    const key = `extreme-key-${Math.random().toString(36).substring(7)}`;
    const start = perf_hooks_1.performance.now();
    for (let i = 0; i < count; i++) {
        // Menghitung penggunaan secara beruntun
        (0, usageMeter_1.recordUsage)(key, 1);
        // Progress bar sederhana agar tidak dikira hang
        if (i > 0 && i % (count / 10) === 0) {
            const percent = (i / count * 100).toFixed(0);
            process.stdout.write(`   [PROGRESS] ${percent}% completed...\n`);
        }
    }
    const end = perf_hooks_1.performance.now();
    const duration = (end - start) / 1000;
    console.log(`✅ FINISHED ${label}`);
    console.log(`⏱️  Duration: ${duration.toFixed(2)}s`);
    console.log(`📊 Speed: ${(count / duration).toFixed(0)} ops/sec`);
}
async function main() {
    try {
        // 200K - Ujian Ketahanan
        await runStress("200K_TEST", 200000);
        // 500K - Ambang Batas Monster
        await runStress("500K_TEST", 500000);
    }
    catch (e) {
        console.error("❌ STRESS TEST CRASHED:", e);
    }
}
main();
