import { enableLearning, processLearning } from "../learning/learningAuthority";

test("Learning blocked without permission", () => {
  expect(() =>
    processLearning("data", "feac", "s1")
  ).toThrow();
});

test("Learning allowed after human command", () => {
  enableLearning("human");
  const res = processLearning("important data", "feac", "s2");
  expect(res.status).toBe("LEARNED");
});
