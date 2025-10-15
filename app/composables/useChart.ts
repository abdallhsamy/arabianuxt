import { onMounted, onBeforeUnmount, ref } from "vue";
import type { Chart } from "chart.js";

export type ChartModule = typeof import("chart.js");

export const useChart = (
  make: (Chart: ChartModule, el: HTMLCanvasElement) => Chart
) => {
  const canvas = ref<HTMLCanvasElement | null>(null);
  let chart: Chart | null = null;

  onMounted(async () => {
    const Chart = await import("chart.js");
    // Register all (safe for v4)
    const { Chart: ChartCls, registerables } = Chart as {
      Chart: typeof Chart;
      registerables: unknown[];
    };
    ChartCls.register(...registerables);
    if (canvas.value) chart = make(Chart as ChartModule, canvas.value);
  });

  onBeforeUnmount(() => {
    if (chart) chart.destroy();
  });

  return { canvas };
};
