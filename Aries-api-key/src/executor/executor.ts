import { verifyAuthority } from "../auth/authority";
import { EventBus } from "../events/eventBus";

export class Executor {
  async run(input: string) {
    return {
      output: input,
      engine: "ARIES_EXECUTOR"
    };
  }
}

/* === HELPER UNTUK BRAIN === */
export async function executeTask(payload: {
  session_id: string;
  user_id: string;
  input: string;
  apiKey?: string;
}) {
  const auth = verifyAuthority(payload.apiKey);

  if (!auth.allowed) {
    throw new Error("EXECUTOR_AUTH_DENIED");
  }

  const executor = new Executor();
  const result = await executor.run(payload.input);

  EventBus.emit("EXECUTOR_FINISHED", {
    session: payload.session_id,
    user: payload.user_id,
    result
  });

  return result;
}
