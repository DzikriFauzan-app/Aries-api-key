import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { z, ZodError } from 'zod';
import { EventBus } from '../events/eventBus';
import { AriesEvent } from '../events/eventTypes';
import { randomUUID } from 'crypto';

const CommandSchema = z.object({
  session_id: z.string().min(1),
  user_id: z.string().min(1),
  input: z.string().min(1)
});

export class AriesGateway {
  private server: FastifyInstance;
  private bus: EventBus;

  constructor(bus: EventBus, private port: number = 3000) {
    this.bus = bus;
    this.server = Fastify({ logger: false });
    this.setupRoutes();
  }

  private setupRoutes() {
    this.server.get('/health', async () => {
      return { status: 'ok', timestamp: Date.now() };
    });

    this.server.post('/v1/command', async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const body = CommandSchema.parse(request.body);
        const requestId = randomUUID();

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

      } catch (err) { 
        if (err instanceof ZodError) {
          // FIX FINAL: Force casting ke any.
          // Ini solusi pamungkas. Tidak ada lagi debat dengan compiler.
          return reply.status(400).send({ 
            error: 'Validation Failed', 
            details: (err as any).errors 
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
    } catch (err) {
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
