import { accessMemory } from "../memory/memoryAccess";
import { performance } from "perf_hooks";

async function runMemoryStress() {
  console.log("🧠 STARTING MEMORY GOVERNANCE STRESS TEST (100K)");
  console.log("-----------------------------------------------");
  
  const fakeMemory: any[] = [];
  const start = performance.now();

  for (let i = 1; i <= 100000; i++) {
    try {
      // Menjalankan akses memori melalui Governance Layer
      accessMemory({
        plan: "PRO", // Menggunakan limitasi PRO (Max 10k)
        action: "WRITE",
        memory: fakeMemory,
        payload: { id: i, data: "Sovereign Intelligence Unit " + i }
      });
      
      if (i % 25000 === 0) {
        const currentUsage = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`   [PROGRESS] ${i} ops | RAM Usage: ${currentUsage.toFixed(2)} MB`);
      }
    } catch (e: any) {
      // Seharusnya berhenti di 10.000 karena policy PRO yang kita buat
      if (e.message === "MEMORY_LIMIT_EXCEEDED") {
        console.log(`\n🛑 GOVERNANCE ACTIVE: Blocked at ${i} (Policy: PRO Max 10.000)`);
        break;
      }
      console.error("💀 UNEXPECTED ERROR:", e.message);
      break;
    }
  }

  const end = performance.now();
  const duration = (end - start) / 1000;
  console.log("-----------------------------------------------");
  console.log(`✅ TEST FINISHED`);
  console.log(`⏱️  Duration: ${duration.toFixed(3)}s`);
  console.log(`📊 Efficiency: ${(100000 / duration).toFixed(0)} check/sec`);
}

runMemoryStress();
