import { benchmarkCases } from "./benchmarkCases";
import { routeCommand } from "../router/commandRouter";
import { createDefaultMemory } from "../memory";

export async function runBenchmarks() {
  let passed = 0;
  let failed = 0;

  for (const testCase of benchmarkCases) {
    const repeat = testCase.repeat ?? 1;
    let ok = true;

    for (let i = 0; i < repeat; i++) {
      const memory = createDefaultMemory();
      const output = await routeCommand(testCase.input, memory);
      if (!testCase.expectedPattern.test(output)) {
        ok = false;
      }
    }

    if (ok) passed++;
    else failed++;
  }

  console.log({
    total: benchmarkCases.length,
    passed,
    failed
  });

  if (failed > 0) {
    throw new Error("BENCHMARK TEST COMPLETED WITH FAILURES");
  }

  console.log("BENCHMARK TEST PASSED");
}
