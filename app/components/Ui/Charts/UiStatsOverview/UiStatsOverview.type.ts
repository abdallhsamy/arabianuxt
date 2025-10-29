export const UiStatsOverviewColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Amber: "amber",
  Rose: "rose",
} as const;

export type UiStatsOverviewColor =
  (typeof UiStatsOverviewColors)[keyof typeof UiStatsOverviewColors];

export type StatItem = {
  label: string;
  value: string | number;
  icon?: string;
  color?: UiStatsOverviewColor;
  change?: string;
};

export type UiStatsOverviewProps = {
  stats: StatItem[];
};
