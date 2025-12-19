/**
 * ARIES SOVEREIGN BOOTLOADER (CALIBRATED)
 * Mode: RUNTIME BRIDGE
 * Status: Matching dist/gateway/server.js signature
 */

console.log("\n⚡ INITIALIZING ARIES SOVEREIGN KERNEL...");

try {
    // 1. LOAD MODUL DARI DIST (HASIL KOMPILASI)
    const { EventBus } = require('../dist/events/eventBus');
    const { KeyRegistry } = require('../dist/auth/keyRegistry');
    const { PolicyEngine } = require('../dist/policy/policyEngine');
    const { AriesGateway } = require('../dist/gateway/server');

    // 2. AKTIFKAN ORGAN PENDUKUNG
    // Kita tetap nyalakan mereka agar hidup di memori
    const bus = new EventBus();
    const keyReg = new KeyRegistry(); // Hidup, tapi belum disambung ke Gateway
    const policy = new PolicyEngine(); // Hidup, menunggu event
    
    const PORT = 3333;

    console.log("[KERNEL] ✅ Support Systems (Auth/Policy): ACTIVE");

    // 3. AKTIFKAN GATEWAY (SESUAI HASIL GREP)
    // Constructor hanya minta (bus, port). Jangan kasih yang lain.
    const gateway = new AriesGateway(bus, PORT);
    
    // 4. START ENGINE
    console.log(`[KERNEL] 🚀 IGNITION on PORT ${PORT}...`);
    gateway.start();

} catch (error) {
    console.error("\n[CRITICAL FAILURE] ❌ SYSTEM HALTED.");
    console.error(error);
}
