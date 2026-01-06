"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeKey = storeKey;
exports.findKey = findKey;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const STORE_PATH = path_1.default.join(process.cwd(), "aries_keys.json");
function load() {
    if (!fs_1.default.existsSync(STORE_PATH))
        return [];
    return JSON.parse(fs_1.default.readFileSync(STORE_PATH, "utf8"));
}
function save(keys) {
    fs_1.default.writeFileSync(STORE_PATH, JSON.stringify(keys, null, 2));
}
function storeKey(k) {
    const keys = load();
    keys.push(k);
    save(keys);
}
function findKey(key) {
    return load().find(k => k.key === key);
}
