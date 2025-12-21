import { PolicyChecker } from './src/memory/policyChecker';
import { ARIES_LAWS, getPlanByLevel } from './src/memory/governanceLaw';

async function runTest() {
    console.log("=== ARIES POLICY STRESS TEST ===\n");

    // 1. Test Enterprise Level 3
    console.log("Testing Enterprise Level 3 Scaling...");
    const ent3 = getPlanByLevel(3);
    console.log(`- Limit Chat: ${ent3.dailyChatLimit} (Expected: 20000)`);
    console.log(`- Limit Memory: ${ent3.maxExplicitMemory} (Expected: 300000)`);
    console.log(`- Price: $${ent3.monthlyPriceUSD}/mo\n`);

    // 2. Test Simulasi Limit Chat FREE (40 Chat)
    console.log("Simulating FREE User (40 Chats Limit)...");
    for (let i = 1; i <= 42; i++) {
        const result = await PolicyChecker.canChat('FREE');
        if (!result.allowed) {
            console.log(`[STOP] Chat ke-${i}: ${result.message}`);
            break;
        }
        if (i % 10 === 0) console.log(`- Chat ke-${i} berhasil...`);
    }

    // 3. Test Simulasi Platinum (Unlimited)
    console.log("\nTesting PLATINUM User...");
    const platResult = await PolicyChecker.canChat('PLATINUM');
    console.log(`- Status: ${platResult.message} (Unlimited Mode)`);
}

runTest();
