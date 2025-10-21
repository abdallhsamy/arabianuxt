export const UiTooltipPositions = {
  Top: "top",
  Bottom: "bottom",
  Left: "left",
  Right: "right",
  Start: "start",
  End: "end",
} as const;

export type UiTooltipPosition =
  (typeof UiTooltipPositions)[keyof typeof UiTooltipPositions];

export const UiTooltipDefaultPosition = UiTooltipPositions.Top;

export type UiTooltipProps = {
  text: string;
  position?: UiTooltipPosition;
};
