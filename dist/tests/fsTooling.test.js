"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsRegistry_1 = require("../tools/fs/fsRegistry");
require("../tools/fs");
(async () => {
    console.log("[TEST] FS TOOLING");
    const tools = (0, fsRegistry_1.listFsTools)();
    if (tools.length !== 3) {
        throw new Error("FS tools not fully registered");
    }
    const read = (0, fsRegistry_1.getFsTool)("fs.read");
    if (!read.readOnly) {
        throw new Error("fs.read must be readOnly");
    }
    const write = (0, fsRegistry_1.getFsTool)("fs.write");
    if (write.readOnly) {
        throw new Error("fs.write must NOT be readOnly");
    }
    try {
        (0, fsRegistry_1.getFsTool)("fs.delete");
        throw new Error("Illegal tool passed");
    }
    catch { }
    console.log("FS TOOLING TEST PASSED");
})();
