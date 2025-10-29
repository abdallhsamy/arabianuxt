export type UiStatsCardProps = {
  label: string;
  value: string | number;
  delta?: number;
  hint?: string;
};

export const UiStatsCardDefaults = {
  delta: 0,
  hint: "",
};
