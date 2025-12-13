export type ReasoningStepType =
  | "premise"
  | "inference"
  | "validation"
  | "synthesis";

export interface ReasoningStep {
  id: number;
  type: ReasoningStepType;
  description: string;
  input: string;
  output: string;
}

export interface ReasoningPlan {
  goal: string;
  steps: ReasoningStep[];
}

export interface ReasoningResult {
  finalAnswer: string;
  plan: ReasoningPlan;
}
