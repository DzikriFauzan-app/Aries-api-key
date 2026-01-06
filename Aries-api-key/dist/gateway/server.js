"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const intelligence_1 = require("../routes/intelligence");
const app = (0, fastify_1.default)();
const PORT = 3333;
app.post('/v1/intelligence', intelligence_1.handleIntelligence);
app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`[Gateway] 🚀 ARIES SOVEREIGN KERNEL LIVE ON ${address}`);
});
