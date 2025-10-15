export const UiBadgeStatusColors = {
  Default: "default",
  Success: "success",
  Warning: "warning",
  Error: "error",
  Info: "info",
} as const;
export type UiBadgeStatusColor =
  (typeof UiBadgeStatusColors)[keyof typeof UiBadgeStatusColors];

export const UiBadgeStatusSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiBadgeStatusSize =
  (typeof UiBadgeStatusSizes)[keyof typeof UiBadgeStatusSizes];

export type UiBadgeStatusProps = {
  label: string;
  color?: UiBadgeStatusColor;
  size?: UiBadgeStatusSize;
  pill?: boolean;
  icon?: string;
};

export const UiBadgeStatusDefaults = {
  color: UiBadgeStatusColors.Default,
  size: UiBadgeStatusSizes.Medium,
  pill: true,
} as const;
