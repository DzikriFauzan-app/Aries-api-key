console.log("🚀 BOOTING ARIES SOVEREIGN AGENT...");

try {
    // 1. LOAD GATEWAY (Yang di dalamnya sudah ada Cortex & Vault)
    const { AriesGateway } = require('./gateway/server');
    const eventBus = require('./events/eventBus');

    // 2. MODULES LAIN (FEAC, NEO) SEKARANG JADI KLIEN INTERNAL
    // Mereka akan jalan tapi logika utamanya ada di Cortex
    require('./feac/feacLoop');
    require('./neo/neoEngine');

    // 3. START SERVER
    const PORT = 3333;
    const gateway = new AriesGateway(eventBus, PORT);
    gateway.start();

} catch (error) {
    console.error("❌ CRITICAL FAILURE:", error);
}
