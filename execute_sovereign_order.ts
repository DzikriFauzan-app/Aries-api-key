import { ReasoningEngine } from "./src/core/reasoningEngine";
import { CommanderBridge } from "./src/feac/commanderBridge";

async function main() {
    const engine = new ReasoningEngine();
    
    console.log("🧠 ARIES is thinking...");
    const result = engine.execute(
        "PRODUCE_RESOURCES",
        "Requirement: High demand in Sector 7. Action: Initiate Production."
    );

    console.log("✅ Synthesis Complete:", result.finalAnswer);

    try {
        await CommanderBridge.sendToCommander(result);
        console.log("🚀 ORDER DEPLOYED TO FEAC SUCCESSFULLY.");
    } catch (e) {
        console.log("❌ CONNECTION REFUSED: Ensure FEAC is running on Port 3001 (PM2).");
    }
}

main();
