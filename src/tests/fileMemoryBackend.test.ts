import { FileMemoryBackend } from "../memory/fileMemoryBackend";

function assert(cond: any, msg: string) {
  if (!cond) throw new Error(msg);
}

const backend = new FileMemoryBackend(".aries_test_mem.json");

backend.write({ key: "a", value: "1", ts: 1 });
backend.write({ key: "b", value: "2", ts: 2 });

assert(backend.read("a")?.value === "1", "READ a FAILED");
assert(backend.read("b")?.value === "2", "READ b FAILED");
assert(backend.read("x") === undefined, "READ x SHOULD FAIL");

console.log("FILE MEMORY BACKEND TEST PASSED");
