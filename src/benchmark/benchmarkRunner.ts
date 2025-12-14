import { benchmarkCases } from "./benchmarkCases";
import { routeCommand } from "../router/commandRouter";
import { MemoryStore } from "../memory/memoryStore";
import { FileMemoryBackend } from "../memory/fileMemoryBackend";

export async function runBenchmarks(): Promise<void> {
  let passed = 0;
  let failed = 0;

  // BENCHMARK HARUS PAKAI BACKEND NYATA
  const backend = new FileMemoryBackend(".aries_bench_mem.json");
  const memory = new MemoryStore(backend);

  for (const testCase of benchmarkCases) {
    const repeat = testCase.repeat ?? 1;

    for (let i = 0; i < repeat; i++) {
      try {
        const output: string = await routeCommand(
          testCase.input,
          memory
        );

        if (testCase.expectedPattern.test(output)) {
          passed++;
        } else {
          failed++;
        }
      } catch {
        failed++;
      }
    }
  }

  console.log({ total: passed + failed, passed, failed });

  if (failed > 0) {
    throw new Error("BENCHMARK TEST COMPLETED WITH FAILURES");
  }
}
