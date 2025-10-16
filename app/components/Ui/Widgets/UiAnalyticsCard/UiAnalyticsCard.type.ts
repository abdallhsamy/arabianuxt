export const UiAnalyticsCardColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Amber: "amber",
  Rose: "rose",
} as const;

export type UiAnalyticsCardColor =
  (typeof UiAnalyticsCardColors)[keyof typeof UiAnalyticsCardColors];

export interface UiAnalyticsCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: string;
  color?: UiAnalyticsCardColor;
  progress?: number;
}

export const UiAnalyticsCardDefaults = {
  color: UiAnalyticsCardColors.Fuchsia,
};
