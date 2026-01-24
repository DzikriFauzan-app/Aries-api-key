import { accessMemory } from "../memory/memoryAccess";

test("FREE cannot write memory", () => {
  expect(() =>
    accessMemory({
      plan: "FREE",
      action: "WRITE",
      memory: [],
      payload: "test"
    })
  ).toThrow();
});

test("PRO can write memory", () => {
  const mem: any[] = [];
  accessMemory({
    plan: "PRO",
    action: "WRITE",
    memory: mem,
    payload: "ok"
  });
  expect(mem.length).toBe(1);
});
