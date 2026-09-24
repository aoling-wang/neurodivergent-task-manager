export type Complexity = "Simple" | "Moderate" | "Complex";

export const complexityOrder: Complexity[] = ["Simple", "Moderate", "Complex"];

export type Task = {
  id: number;
  title: string;
  date: string;
  estimatedMinutes: number;
  complexity: Complexity;
  urgent: boolean;
  completed: boolean;
};

export type Error = {
    title?: string;
    date?: string;
    complexity?: string;
  }