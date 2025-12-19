import { enableLearning, processLearning } from "../learning/learningAuthority";

export async function handleBrainCommand(input: string, ctx: any) {
  if (input === "allow-learn") {
    enableLearning("human");
    return { status: "LEARNING_ENABLED" };
  }

  if (input.startsWith("learn ")) {
    return processLearning(
      input.replace("learn ", ""),
      ctx.agent,
      ctx.session_id
    );
  }
  return { status: "IDLE" };
}
