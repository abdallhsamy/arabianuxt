export interface UiChartBarDataset {
  label: string;
  data: number[];
  color?: string;
}

export interface UiChartBarProps {
  labels: string[];
  datasets: UiChartBarDataset[];
}
