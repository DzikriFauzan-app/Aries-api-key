import { recordUsage } from "../api/usageMeter";
import { performance } from "perf_hooks";

async function runSequential(count: number) {
  console.log(`\n💎 THE FINAL BOSS: SEQUENTIAL 1 MILLION`);
  const key = `mega-key-1m`;
  const start = performance.now();
  for (let i = 0; i <= count; i++) {
    recordUsage(key, 1);
    if (i % 100000 === 0) process.stdout.write(`   [PROGRESS] ${i / 10000}%\n`);
  }
  const end = performance.now();
  const duration = (end - start) / 1000;
  console.log(`✅ 1M FINISHED | Speed: ${(count / duration).toFixed(0)} ops/sec`);
}

async function runConcurrent(label: string, total: number, batchSize: number) {
  console.log(`\n⚡ EXTREME CONCURRENT: ${label} (Batch: ${batchSize})`);
  const key = `conc-boss-${label}`;
  const start = performance.now();
  for (let i = 0; i < total; i += batchSize) {
    const batch = Array(Math.min(batchSize, total - i)).fill(null).map(() => {
      return new Promise((resolve) => {
        recordUsage(key, 1);
        resolve(true);
      });
    });
    await Promise.all(batch);
  }
  const end = performance.now();
  const duration = (end - start) / 1000;
  console.log(`✅ ${label} FINISHED | Speed: ${(total / duration).toFixed(0)} ops/sec`);
}

async function main() {
  console.log("🚀 STARTING THE ULTIMATE ARIES STRESS TEST");
  try {
    await runSequential(1_000_000);
    await runConcurrent("CONC_30K", 30_000, 30_000);
    await runConcurrent("CONC_50K", 50_000, 50_000);
    console.log("\n🏆 ARIES HAS PASSED ALL TRIALS.");
  } catch (e) {
    console.error("💀 SYSTEM COLLAPSED:", e);
  }
}

main();
