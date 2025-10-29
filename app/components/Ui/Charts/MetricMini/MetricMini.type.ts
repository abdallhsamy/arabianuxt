export const MetricMiniDefaultValues = {
  Min: 10,
  Max: 90,
  Total: 100,
  UpdateInterval: 3000,
} as const;

export const MetricMiniChartType = "doughnut" as const;

export const MetricMiniChartOptions = {
  Cutout: "80%",
  LegendDisplay: false,
  BorderWidth: 0,
} as const;

export const MetricMiniBackgroundColors = {
  Active: "rgba(255,255,255,0.1)",
} as const;

export const MetricMiniDimensions = {
  ContainerWidth: "w-32",
  CanvasSize: "h-24 w-24",
} as const;

export type MetricMiniProps = {
  label: string;
  color: string;
  min?: number;
  max?: number;
};
