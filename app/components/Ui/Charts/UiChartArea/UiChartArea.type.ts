export const UiChartAreaChartType = "line" as const;

export const UiChartAreaDefaultValues = {
  Color: "#a855f7",
  Tension: 0.4,
  Fill: true,
} as const;

export const UiChartAreaGradientStops = {
  Start: 0,
  End: 1,
  StartOpacity: "55",
  EndOpacity: "transparent",
} as const;

export type UiChartAreaDataset = {
  label: string;
  data: number[];
  color?: string;
};

export type UiChartAreaProps = {
  labels: string[];
  datasets: UiChartAreaDataset[];
};
