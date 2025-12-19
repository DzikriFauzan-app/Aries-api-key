import { recordUsage } from "../api/usageMeter";
import { performance } from "perf_hooks";

async function runConcurrent(label: string, total: number, batchSize: number) {
  console.log(`\n⚡ STARTING CONCURRENT TEST: ${label}`);
  console.log(`   Total: ${total} ops | Concurrent Batch: ${batchSize}`);
  
  const key = `conc-key-${Math.random().toString(36).substring(7)}`;
  const start = performance.now();

  // Membagi total ke dalam beberapa batch konkuren
  for (let i = 0; i < total; i += batchSize) {
    const batch = Array(Math.min(batchSize, total - i)).fill(null).map(() => {
      // Simulasi request masuk bersamaan
      return new Promise((resolve) => {
        recordUsage(key, 1);
        resolve(true);
      });
    });
    
    await Promise.all(batch);
  }

  const end = performance.now();
  const duration = (end - start) / 1000;
  console.log(`✅ FINISHED ${label}`);
  console.log(`⏱️  Duration: ${duration.toFixed(2)}s | 📊 Speed: ${(total / duration).toFixed(0)} ops/sec`);
}

async function main() {
  try {
    // 1K Concurrent (Pemanasan)
    await runConcurrent("CONC_1K", 10000, 1000);
    
    // 5K Concurrent (Mulai berat)
    await runConcurrent("CONC_5K", 50000, 5000);
    
    // 10K Concurrent (Sangat berat untuk JSON)
    await runConcurrent("CONC_10K", 100000, 10000);
    
  } catch (e) {
    console.error("❌ CONCURRENT TEST FAILED:", e);
  }
}

main();
