import { KeyRegistry } from "../src/auth/keyRegistry";
import { FeacLoop } from "../src/feac/feacLoop";
import { EventBus } from "../src/events/eventBus";
import { randomUUID } from "crypto";

async function runSecurityTest() {
    const bus = new EventBus();
    const feac = new FeacLoop(bus);
    feac.start();

    console.log("--- 🛡️ STARTING FEAC SECURITY AUDIT ---");

    const tests = [
        { 
            name: "UNAUTHORIZED ACCESS (Wrong Key)", 
            key: "fake-key-123", 
            expected: "REJECT" 
        },
        { 
            name: "GUEST ACCESS (Insufficient Scope)", 
            key: "guest-key", 
            expected: "REJECT" 
        },
        { 
            name: "SOVEREIGN OWNER ACCESS (Dzikri Fauzan)", 
            key: "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1", 
            expected: "APPROVED" 
        }
    ];

    for (const t of tests) {
        console.log(`\nTesting: ${t.name}...`);
        
        await bus.publish({
            id: randomUUID(),
            type: "TASK_ASSIGNED",
            source: "SIMULATOR",
            timestamp: Date.now(),
            correlationId: randomUUID(),
            payload: {
                type: "system.exec",
                instruction: "EXECUTE_PRODUCTION",
                apiKey: t.key
            }
        });
        
        // Beri jeda kecil untuk pemrosesan event
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

runSecurityTest();
