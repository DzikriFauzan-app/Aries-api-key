"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = normalizePath;
exports.enforceSize = enforceSize;
const ROOT = "/workspace";
function normalizePath(path) {
    if (path.includes("..")) {
        throw new Error("Path traversal detected");
    }
    if (!path.startsWith(ROOT)) {
        throw new Error("Access outside workspace denied");
    }
    return path;
}
function enforceSize(content, maxKB) {
    if (!content)
        return;
    const sizeKB = Buffer.byteLength(content, "utf8") / 1024;
    if (sizeKB > maxKB) {
        throw new Error("File size limit exceeded");
    }
}
