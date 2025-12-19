import { internalExecute } from "./internalExecute";

export async function dispatch(payload: any) {
  return internalExecute(payload);
}
