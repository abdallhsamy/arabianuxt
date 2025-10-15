export const UiTooltipPositions = {
  Top: "top",
  Right: "right",
  Bottom: "bottom",
  Left: "left",
  Start: "start",
  End: "end",
} as const;

export type UiTooltipPosition =
  (typeof UiTooltipPositions)[keyof typeof UiTooltipPositions];

export const UiTooltipTriggers = {
  Hover: "hover",
  Click: "click",
  Focus: "focus",
} as const;

export type UiTooltipTrigger =
  (typeof UiTooltipTriggers)[keyof typeof UiTooltipTriggers];

export const UiTooltipColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Rose: "rose",
  Amber: "amber",
  Indigo: "indigo",
} as const;

export type UiTooltipColor =
  (typeof UiTooltipColors)[keyof typeof UiTooltipColors];

export type UiTooltipProps = {
  text: string;
  position?: UiTooltipPosition;
  trigger?: UiTooltipTrigger;
  delay?: number;
  arrow?: boolean;
  color?: UiTooltipColor;
  glow?: boolean;
};
