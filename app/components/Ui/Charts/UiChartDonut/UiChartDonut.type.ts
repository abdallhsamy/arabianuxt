export const UiChartDonutChartType = "doughnut" as const;

export const UiChartDonutDefaultValues = {
  BorderWidth: 0,
  Cutout: "60%",
  Responsive: true,
  MaintainAspectRatio: false,
  LegendDisplay: false,
} as const;

export const UiChartDonutHeight = "h-56" as const;

export type UiChartDonutProps = {
  labels: string[];
  dataset: number[];
};
