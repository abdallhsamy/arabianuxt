import type { Component } from "vue";

export const UiStepperStates = {
  Pending: "pending",
  Active: "active",
  Completed: "completed",
  Error: "error",
} as const;
export type UiStepperState =
  (typeof UiStepperStates)[keyof typeof UiStepperStates];

export const UiStepperColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Rose: "rose",
  Indigo: "indigo",
  Amber: "amber",
} as const;
export type UiStepperColor =
  (typeof UiStepperColors)[keyof typeof UiStepperColors];

export type StepItem = {
  id: string;
  label: string;
  description?: string;
  icon?: Component;
  state?: UiStepperState;
};

export type UiStepperProps = {
  steps: StepItem[];
  activeStep?: string;
  vertical?: boolean;
  color?: UiStepperColor;
  glow?: boolean;
  showNumbers?: boolean;
  connectLines?: boolean;
};
