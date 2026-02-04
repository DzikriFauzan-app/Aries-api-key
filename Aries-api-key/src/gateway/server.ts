/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import fastify from 'fastify';
import { handleIntelligence } from '../routes/intelligence';


const app = fastify();
const PORT = 3333;

app.post('/v1/intelligence', handleIntelligence);

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`[Gateway] 🚀 ARIES SOVEREIGN KERNEL LIVE ON ${address}`);
});
