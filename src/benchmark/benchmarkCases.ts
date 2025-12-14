import { BenchmarkCase } from "./benchmarkTypes";

export const benchmarkCases: BenchmarkCase[] = [
  {
    id: "routing-determinism-1",
    category: "ROUTING_DETERMINISM",
    input: "PING",
    expectedPattern: /PONG/,
    repeat: 3
  }
];
