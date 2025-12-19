import { ariesBrainExecute } from "../brain/ariesBrain";

export async function feacRequestLearn(data: string, ctx: any) {
  return ariesBrainExecute(data, {
    caller: "feac",
    apiKey: ctx.apiKey,
    session_id: ctx.session_id,
    user_id: ctx.user_id
  });
}

export async function neoRequestAction(command: string, ctx: any) {
  return ariesBrainExecute(command, {
    caller: "neo",
    apiKey: ctx.apiKey,
    session_id: ctx.session_id,
    user_id: ctx.user_id
  });
}
