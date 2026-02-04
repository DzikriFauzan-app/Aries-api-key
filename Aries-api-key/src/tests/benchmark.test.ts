/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { BenchmarkRunner } from "../benchmark/benchmarkRunner";


(async () => {
  // Hanya jalan jika ENV variable diset (agar tidak memberatkan test biasa)
  if (process.env.ARIES_BENCH) {
    const runner = new BenchmarkRunner();
    await runner.run();
  } else {
    console.log("Benchmark skipped (set ARIES_BENCH=1 to run)");
  }
})();
