"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usageMeter_1 = require("../api/usageMeter");
const perf_hooks_1 = require("perf_hooks");
async function runSequential(count) {
    console.log(`\n💎 THE FINAL BOSS: SEQUENTIAL 1 MILLION`);
    const key = `mega-key-1m`;
    const start = perf_hooks_1.performance.now();
    for (let i = 0; i <= count; i++) {
        (0, usageMeter_1.recordUsage)(key, 1);
        if (i % 100000 === 0)
            process.stdout.write(`   [PROGRESS] ${i / 10000}%\n`);
    }
    const end = perf_hooks_1.performance.now();
    const duration = (end - start) / 1000;
    console.log(`✅ 1M FINISHED | Speed: ${(count / duration).toFixed(0)} ops/sec`);
}
async function runConcurrent(label, total, batchSize) {
    console.log(`\n⚡ EXTREME CONCURRENT: ${label} (Batch: ${batchSize})`);
    const key = `conc-boss-${label}`;
    const start = perf_hooks_1.performance.now();
    for (let i = 0; i < total; i += batchSize) {
        const batch = Array(Math.min(batchSize, total - i)).fill(null).map(() => {
            return new Promise((resolve) => {
                (0, usageMeter_1.recordUsage)(key, 1);
                resolve(true);
            });
        });
        await Promise.all(batch);
    }
    const end = perf_hooks_1.performance.now();
    const duration = (end - start) / 1000;
    console.log(`✅ ${label} FINISHED | Speed: ${(total / duration).toFixed(0)} ops/sec`);
}
async function main() {
    console.log("🚀 STARTING THE ULTIMATE ARIES STRESS TEST");
    try {
        await runSequential(1000000);
        await runConcurrent("CONC_30K", 30000, 30000);
        await runConcurrent("CONC_50K", 50000, 50000);
        console.log("\n🏆 ARIES HAS PASSED ALL TRIALS.");
    }
    catch (e) {
        console.error("💀 SYSTEM COLLAPSED:", e);
    }
}
main();
