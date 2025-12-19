import { runBenchmarks } from "../src/benchmark/benchmarkRunner";
import { benchmarkCases } from "../src/benchmark/benchmarkCases";

(async () => {
  const report = await runBenchmarks(benchmarkCases);

  console.log(JSON.stringify(report, null, 2));

  /**
   * NOTE:
   * Benchmark failure is reported, not fatal.
   * Decision is deferred to manual inspection.
   */

  if (report.passed === report.total) {
    console.log("BENCHMARK TEST PASSED");
  } else {
    console.log("BENCHMARK TEST COMPLETED WITH FAILURES");
  }
})();
