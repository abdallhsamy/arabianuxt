export const UiSwitchSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiSwitchSize = (typeof UiSwitchSizes)[keyof typeof UiSwitchSizes];

export const UiSwitchColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Rose: "rose",
  Amber: "amber",
  Indigo: "indigo",
} as const;

export type UiSwitchColor =
  (typeof UiSwitchColors)[keyof typeof UiSwitchColors];

export type UiSwitchProps = {
  modelValue: boolean;
  label?: string;
  description?: string;
  size?: UiSwitchSize;
  color?: UiSwitchColor;
  disabled?: boolean;
  icon?: boolean;
  outlined?: boolean;
};
