const { EventBus } = require("./events/eventBus.js");
const { AriesGateway } = require("./gateway/server.js");
const { ReasoningOrchestrator } = require("./reasoning/reasoningOrchestrator.js");
const { Translator } = require("./translator/translator.js");
const { Executor } = require("./executor/executor.js");
const { FeacLoop } = require("./feac/feacLoop.js");
const { LLMFactory } = require("./llm/llmFactory.js");

const PORT = process.env.ARIES_PORT || 3333;

console.log("🚀 Booting Aries Engine (CommonJS Mode)...");

const bus = new EventBus(true);
const llm = LLMFactory.create("mock");

const gateway = new AriesGateway(bus, PORT);
const reasoning = new ReasoningOrchestrator(bus, llm);
const translator = new Translator(bus);
const executor = new Executor(bus);
const feac = new FeacLoop(bus);

// Optional Start Methods (check existence first)
if (reasoning.start) reasoning.start();
if (translator.start) translator.start();
if (executor.start) executor.start();
if (feac.start) feac.start();

gateway.start();

console.log(`✅ [ARIES] Sovereign Engine ONLINE on port ${PORT}`);
