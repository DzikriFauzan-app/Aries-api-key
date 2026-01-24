export type RoutingPlan =
  | { type: "REASON"; payload: string }
  | { type: "MEM_WRITE"; key: string; value: string }
  | { type: "MEM_READ"; key: string };
