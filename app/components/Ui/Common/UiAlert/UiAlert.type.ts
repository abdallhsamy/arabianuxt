export const UiAlertTypes = {
  Info: "info",
  Success: "success",
  Warning: "warning",
  Error: "error",
} as const;

export type UiAlertType = (typeof UiAlertTypes)[keyof typeof UiAlertTypes];

export const UiAlertColors = {
  Fuchsia: "fuchsia",
  Emerald: "emerald",
  Amber: "amber",
  Rose: "rose",
  Indigo: "indigo",
  Cyan: "cyan",
} as const;

export type UiAlertColor = (typeof UiAlertColors)[keyof typeof UiAlertColors];

export type UiAlertProps = {
  type?: UiAlertType;
  title?: string;
  message?: string;
  dismissible?: boolean;
  autoClose?: boolean;
  duration?: number;
  icon?: boolean;
  color?: UiAlertColor;
};
