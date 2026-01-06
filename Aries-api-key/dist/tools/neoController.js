"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NeoController = void 0;
const child_process_1 = require("child_process");
class NeoController {
    constructor() {
        this.adapterPath = '/data/data/com.termux/files/home/neo-backend/aries_adapter.py';
    }
    async sendToNeo(command, payload = {}) {
        return new Promise((resolve, reject) => {
            const input = JSON.stringify({ cmd: command, payload });
            // Eksekusi Python Adapter
            (0, child_process_1.exec)(`python ${this.adapterPath} '${input}'`, (error, stdout, stderr) => {
                if (error) {
                    reject({ status: 'ERROR', msg: error.message });
                    return;
                }
                try {
                    const result = JSON.parse(stdout);
                    resolve(result);
                }
                catch (e) {
                    reject({ status: 'ERROR', msg: 'Invalid JSON response from Neo' });
                }
            });
        });
    }
}
exports.NeoController = NeoController;
