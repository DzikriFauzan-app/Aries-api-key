import { AriesGateway } from "../gateway/server";
import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] Setting up Gateway & Bus...");
  
  const bus = new EventBus();
  const gateway = new AriesGateway(bus, 0); 
  
  // FIX: Definisi tipe eksplisit agar TS tidak bingung
  let receivedEvent: AriesEvent | null = null;
  
  bus.subscribe("AGENT_COMMAND", async (evt: AriesEvent) => {
    receivedEvent = evt;
  });

  const app = gateway.getServer();

  // CASE 1: Valid Command
  console.log("[TEST] Case 1: Valid Request");
  const response1 = await app.inject({
    method: 'POST',
    url: '/v1/command',
    payload: {
      session_id: "test-sess-1",
      user_id: "user-1",
      input: "Hello Aries"
    }
  });

  if (response1.statusCode !== 202) {
    throw new Error(`Expected 202, got ${response1.statusCode}`);
  }

  // FIX: Type Guard Manual
  // Kita paksa TS percaya bahwa receivedEvent bukan null
  if (!receivedEvent) {
    throw new Error("Gateway did not publish event to Bus");
  }

  // Casting ke any untuk akses payload dengan bebas tanpa strict check
  // (Di test file, ini sah demi kepraktisan)
  const evt = receivedEvent as any;

  if (evt.payload.input !== "Hello Aries") {
    throw new Error("Payload corrupted");
  }
  if (evt.source !== "GATEWAY") {
    throw new Error("Wrong source");
  }

  // CASE 2: Invalid Command
  console.log("[TEST] Case 2: Invalid Request (Missing input)");
  const response2 = await app.inject({
    method: 'POST',
    url: '/v1/command',
    payload: {
      session_id: "test-sess-2"
    }
  });

  if (response2.statusCode !== 400) {
    throw new Error(`Expected 400 for bad input, got ${response2.statusCode}`);
  }

  console.log("GATEWAY TEST PASSED");
})();
