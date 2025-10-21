export type UiChartRadarDataset = {
  label: string;
  data: number[];
  color?: string;
};

export type UiChartRadarProps = {
  labels: string[];
  datasets: UiChartRadarDataset[];
};
