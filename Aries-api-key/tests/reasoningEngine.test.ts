import { ReasoningEngine } from "../src/core/reasoningEngine";

const engine = new ReasoningEngine();

const result = engine.execute(
  "test_reasoning",
  "All humans are mortal. Socrates is human."
);

if (result.finalAnswer !== "ANSWER(VALID(INFERRED(All humans are mortal. Socrates is human.)))") {
  throw new Error("FINAL ANSWER MISMATCH");
}

if (result.plan.steps.length !== 4) {
  throw new Error("INVALID STEP COUNT");
}

console.log("REASONING ENGINE TEST PASSED");
