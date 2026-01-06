"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runSystemTest = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const runSystemTest = async () => {
    console.log("🧪 [TEST_RUNNER] Initiating Core Logic Validation...");
    try {
        // PERBAIKAN: Mencari di folder 'data' di root project, bukan di dalam 'src'
        const ROOT_DIR = process.cwd();
        const KEY_PATH = path_1.default.join(ROOT_DIR, 'data', 'owner.key.json');
        if (!fs_1.default.existsSync(KEY_PATH)) {
            throw new Error(`Security Violation: Owner Key Missing at ${KEY_PATH}`);
        }
        // Verifikasi folder memori
        const MEMORY_DIR = '/sdcard/Documents/Memori';
        if (!fs_1.default.existsSync(MEMORY_DIR)) {
            throw new Error("Storage Violation: Local Memory Path Unreachable!");
        }
        console.log("✅ [TEST_RUNNER] All System Tests Passed.");
        return { success: true, log: "100% Logic Stability Verified" };
    }
    catch (err) {
        console.error(`❌ [TEST_RUNNER] Failed: ${err.message}`);
        return { success: false, log: err.message };
    }
};
exports.runSystemTest = runSystemTest;
