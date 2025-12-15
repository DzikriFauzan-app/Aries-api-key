import { MemoryRetention } from "../memory/memoryRetention";
import { MemoryRecord } from "../memory/memoryRecord";

(() => {
  const retention = new MemoryRetention(50);

  const records: MemoryRecord[] = [
    { key:"a", value:"A", ts:0, hits:1, lastAccess:0, score:10 },
    { key:"b", value:"B", ts:0, hits:10, lastAccess:0, score:100 }
  ];

  const kept = retention.retain(records);

  if (kept.length !== 1 || kept[0].key !== "b") {
    throw new Error("MEMORY RETENTION FAILED");
  }

  console.log("MEMORY RETENTION TEST PASSED");
})();
