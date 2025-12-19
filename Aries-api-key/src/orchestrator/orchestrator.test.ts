import { AriesOrchestrator } from "./AriesOrchestrator";
import { EventBus } from "../events/eventBus";

describe("ARIES ORCHESTRATOR – STEP 4", () => {

  it("should dispatch command via orchestrator and return result", async () => {
    const orchestrator = new AriesOrchestrator(EventBus);

    const res = await orchestrator.dispatch(
      "who are you",
      {
        session_id: "test-session",
        user_id: "tester",
        caller: "human"
      }
    );

    expect(res.accepted).toBe(true);
    expect(res.result).toBeDefined();
  });

  it("should route FEAC command through orchestrator", async () => {
    const orchestrator = new AriesOrchestrator(EventBus);

    const res = await orchestrator.dispatch(
      "remember that fire is hot",
      {
        session_id: "feac-learn",
        user_id: "feac-node",
        caller: "feac"
      }
    );

    expect(res.accepted).toBe(true);
  });

  it("should isolate sessions", async () => {
    const orchestrator = new AriesOrchestrator(EventBus);

    await orchestrator.dispatch(
      "remember sky is blue",
      { session_id: "A", user_id: "u1", caller: "human" }
    );

    const res = await orchestrator.dispatch(
      "what color is the sky",
      { session_id: "B", user_id: "u2", caller: "human" }
    );

    expect(res.result).toBeDefined();
  });

});
