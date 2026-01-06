"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fsRegistry_1 = require("./fsRegistry");
(0, fsRegistry_1.registerFsTool)({
    name: "fs.read",
    readOnly: true,
    maxSizeKB: 512
});
(0, fsRegistry_1.registerFsTool)({
    name: "fs.write",
    readOnly: false,
    maxSizeKB: 512
});
(0, fsRegistry_1.registerFsTool)({
    name: "fs.list",
    readOnly: true,
    maxSizeKB: 64
});
