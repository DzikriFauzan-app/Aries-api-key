export type BenchmarkCategory =
  | "REASONING_DEPTH"
  | "CONSISTENCY"
  | "ROUTING_DETERMINISM"
  | "POLICY_ENFORCEMENT"
  | "MEMORY_RECALL";

export interface BenchmarkCase {
  id: string;
  category: BenchmarkCategory;
  input: string;
  expectedPattern: RegExp;
  repeat?: number;
}

export interface BenchmarkResult {
  caseId: string;
  category: BenchmarkCategory;
  passed: boolean;
  runs: number;
  failures: number;
}

export interface BenchmarkReport {
  total: number;
  passed: number;
  failed: number;
  results: BenchmarkResult[];
}
