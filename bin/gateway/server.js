const express = require('express');
const cors = require('cors');
const Vault = require('../core/keyVault');
const Memory = require('../core/memoryBank');

class AriesGateway {
    constructor(eventBus, port) {
        this.app = express();
        this.port = port || 3333;
        
        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        
        // --- LAYER 1: SECURITY & BILLING ---
        this.app.use((req, res, next) => {
            const apiKey = req.headers['x-aries-key']; // Standar Header API
            
            const access = Vault.validate(apiKey);
            
            if (!access.valid) {
                console.log(`[GATEWAY] ⛔ BLOCK: ${access.error}`);
                return res.status(403).json({ 
                    status: "error",
                    code: access.error, 
                    message: "Access Denied via Aries Gateway." 
                });
            }

            // Tempel info user ke request
            req.userObj = access;
            next();
        });
    }

    setupRoutes() {
        // ENDPOINT UTAMA
        this.app.post('/v1/intelligence', async (req, res) => {
            const { prompt, target_agent } = req.body;
            // target_agent bisa: "FEAC", "NEO", "CORTEX"

            console.log(`[GATEWAY] 🚀 Request from ${req.userObj.owner} -> Target: ${target_agent || 'General'}`);

            // --- LAYER 2: MEMORY CHECK (RAG) ---
            // Aries ngecek apakah dia punya contekan buat pertanyaan ini
            const context = Memory.recall(prompt);
            let memoryNote = "";
            if (context) {
                memoryNote = "[ARIES MEMORY]: Saya pernah menangani ini. Solusinya: " + context;
            }

            // --- LAYER 3: ROUTING (KARENA FEAC BELUM ADA) ---
            let outputData = {};

            if (target_agent === 'FEAC') {
                // Simulasi FEAC (Nanti diganti koneksi ke Ollama)
                outputData = {
                    agent: "FEAC_BETA",
                    status: "PENDING_BUILD",
                    note: "FEAC Agent belum diinstal. Aries mengambil alih.",
                    data: "Menunggu instruksi Architect untuk membangun Neural Network FEAC.",
                    context_found: context ? true : false
                };
            } else {
                // Logic Standar Aries
                outputData = {
                    agent: "ARIES_CORTEX",
                    response: `Processed: ${prompt}`,
                    memory_injection: context || "No memory found."
                };
            }

            // Kirim Balasan
            res.json({
                meta: {
                    tier: req.userObj.tier,
                    quota_remaining: req.userObj.remaining
                },
                result: outputData
            });
        });

        // ENDPOINT ADMIN: MENGAJARI ARIES (MANUAL)
        this.app.post('/v1/admin/teach', (req, res) => {
            if (req.userObj.tier !== 'GOD') return res.status(403).send("ONLY ARCHITECT CAN TEACH.");
            
            const { topic, knowledge } = req.body;
            Memory.learn(topic, knowledge);
            res.json({ status: "Learned", topic });
        });
    }

    start() {
        this.app.listen(this.port, '0.0.0.0', () => {
            console.log(`[GATEWAY] 🌐 ARIES API v2.0 LISTENING ON PORT ${this.port}`);
        });
    }
}

module.exports = { AriesGateway };
