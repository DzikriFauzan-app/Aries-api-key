const http = require('http');
const { spawn } = require('child_process');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const data = JSON.parse(body);
            const cmd = data.cmd ? data.cmd.toLowerCase() : "";
            
            if (cmd.includes("render")) {
                // Eksekusi skrip render yang akan menembak ke port 8080
                const render = spawn('python3', [process.env.HOME + '/Feac-ultimate-sovereign/render_narration_video.py']);
                
                render.stdout.on('data', (d) => { console.log(`[NEO_LOG]: ${d}`); });
                render.stderr.on('data', (d) => { console.error(`[NEO_ERR]: ${d}`); });
                
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    status: "EXECUTING_RENDER",
                    engine: "NeoEngine (SDCard)",
                    details: "Instruksi diproses oleh Fauzan Engine melalui NeoEngine Server."
                }));
            } else {
                res.end(JSON.stringify({status: "ONLINE", owner: "Dzikri"}));
            }
        });
    }
});
server.listen(3333);
