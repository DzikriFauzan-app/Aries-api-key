"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sandbox = void 0;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const sandboxPolicy_1 = require("./sandboxPolicy");
const sandboxError_1 = require("./sandboxError");
class Sandbox {
    constructor(rootPath, policy = sandboxPolicy_1.DEFAULT_SANDBOX_POLICY) {
        this.root = path.resolve(process.cwd(), rootPath);
        this.policy = policy;
    }
    resolveSafe(target) {
        const resolved = path.resolve(this.root, target);
        if (!resolved.startsWith(this.root)) {
            throw new sandboxError_1.SandboxError("Path traversal blocked");
        }
        return resolved;
    }
    async readFile(target) {
        if (!this.policy.allowRead) {
            throw new sandboxError_1.SandboxError("Read not allowed");
        }
        const file = this.resolveSafe(target);
        return fs.readFile(file, "utf-8");
    }
    async writeFile(target, content) {
        if (!this.policy.allowWrite) {
            throw new sandboxError_1.SandboxError("Write not allowed");
        }
        const sizeKB = Buffer.byteLength(content, "utf-8") / 1024;
        if (sizeKB > this.policy.maxFileSizeKB) {
            throw new sandboxError_1.SandboxError("Quota exceeded");
        }
        const file = this.resolveSafe(target);
        await fs.mkdir(path.dirname(file), { recursive: true });
        await fs.writeFile(file, content, "utf-8");
    }
    async listDir(target) {
        const dir = this.resolveSafe(target);
        return fs.readdir(dir);
    }
}
exports.Sandbox = Sandbox;
