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
exports.ProjectScanner = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const memoryIndexer_1 = require("./memoryIndexer");
class ProjectScanner {
    /**
     * Memindai direktori dan mengindeks konten file ke dalam saraf Aries.
     */
    static async scanProject(dirPath) {
        console.log(`🔍 [SCANNER] Mapping project at: ${dirPath}`);
        try {
            const files = this.getAllFiles(dirPath);
            for (const file of files) {
                const content = fs.readFileSync(file, 'utf-8');
                const fileName = path.basename(file);
                // Indeks nama file dan isinya ke dalam memori saraf
                await memoryIndexer_1.MemoryIndexer.indexEngram(`FILE_CONTENT: ${fileName} in ${file}`, Date.now());
                console.log(`✅ [SCANNER] Indexed: ${fileName}`);
            }
            return { success: true, count: files.length };
        }
        catch (error) {
            console.error("❌ [SCANNER_ERR]", error.message);
            return { success: false, message: error.message };
        }
    }
    static getAllFiles(dirPath, arrayOfFiles = []) {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
            const fullPath = path.join(dirPath, file);
            if (fs.statSync(fullPath).isDirectory()) {
                if (!file.includes('node_modules') && !file.includes('.git')) {
                    this.getAllFiles(fullPath, arrayOfFiles);
                }
            }
            else {
                // Hanya ambil file teks/kode
                if (/\.(ts|js|json|txt|md|py|sh)$/.test(file)) {
                    arrayOfFiles.push(fullPath);
                }
            }
        });
        return arrayOfFiles;
    }
}
exports.ProjectScanner = ProjectScanner;
