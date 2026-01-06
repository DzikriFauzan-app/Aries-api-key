"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEMORY_POLICY = void 0;
exports.MEMORY_POLICY = {
    FREE: {
        maxRecords: 100,
        write: false
    },
    PRO: {
        maxRecords: 10000,
        write: true
    },
    ENTERPRISE: {
        maxRecords: 1000000,
        write: true
    }
};
