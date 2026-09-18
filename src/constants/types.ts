export type Complexity = "simple" | "moderate" | "complex";

export const complexityOrder: Complexity[] = ["simple", "moderate", "complex"];

export type Task = {
  id: number;
  title: string;
  date: string;
  estimatedMinutes: number;
  complexity: Complexity;
  urgent: boolean;
  completed: boolean;
};