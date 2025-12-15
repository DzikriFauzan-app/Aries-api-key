"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriesGateway = void 0;
const fastify_1 = __importDefault(require("fastify"));
const zod_1 = require("zod");
const crypto_1 = require("crypto");
const CommandSchema = zod_1.z.object({
    session_id: zod_1.z.string().min(1),
    user_id: zod_1.z.string().min(1),
    input: zod_1.z.string().min(1)
});
class AriesGateway {
    constructor(bus, port = 3000) {
        this.port = port;
        this.bus = bus;
        this.server = (0, fastify_1.default)({ logger: false });
        this.setupRoutes();
    }
    setupRoutes() {
        this.server.get('/health', async () => {
            return { status: 'ok', timestamp: Date.now() };
        });
        this.server.post('/v1/command', async (request, reply) => {
            try {
                const body = CommandSchema.parse(request.body);
                const requestId = (0, crypto_1.randomUUID)();
                await this.bus.publish({
                    id: requestId,
                    type: "AGENT_COMMAND",
                    source: "GATEWAY",
                    timestamp: Date.now(),
                    payload: body,
                    correlationId: body.session_id
                });
                return reply.status(202).send({
                    status: 'accepted',
                    request_id: requestId,
                    message: 'Command received and queued'
                });
            }
            catch (err) {
                if (err instanceof zod_1.ZodError) {
                    // FIX FINAL: Force casting ke any.
                    // Ini solusi pamungkas. Tidak ada lagi debat dengan compiler.
                    return reply.status(400).send({
                        error: 'Validation Failed',
                        details: err.errors
                    });
                }
                return reply.status(500).send({ error: 'Gateway Error' });
            }
        });
    }
    async start() {
        try {
            await this.server.listen({ port: this.port });
            console.log(`[Gateway] Listening on port ${this.port}`);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
    async stop() {
        await this.server.close();
    }
    getServer() {
        return this.server;
    }
}
exports.AriesGateway = AriesGateway;
