import { exec } from 'child_process';
import path from 'path';

export class NeoController {
    private adapterPath: string = '/data/data/com.termux/files/home/neo-backend/aries_adapter.py';

    async sendToNeo(command: string, payload: any = {}): Promise<any> {
        return new Promise((resolve, reject) => {
            const input = JSON.stringify({ cmd: command, payload });
            
            // Eksekusi Python Adapter
            exec(`python ${this.adapterPath} '${input}'`, (error, stdout, stderr) => {
                if (error) {
                    reject({ status: 'ERROR', msg: error.message });
                    return;
                }
                try {
                    const result = JSON.parse(stdout);
                    resolve(result);
                } catch (e) {
                    reject({ status: 'ERROR', msg: 'Invalid JSON response from Neo' });
                }
            });
        });
    }
}
