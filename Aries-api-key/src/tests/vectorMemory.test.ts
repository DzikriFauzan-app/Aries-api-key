import { storeVector, recallVector } from "../memory/vector/vectorStore";

test("Vector memory recall works", () => {
  storeVector("s1", "server sovereign running");
  storeVector("s1", "aries learning control");
  const r = recallVector("aries control");
  expect(r.length).toBeGreaterThan(0);
});
