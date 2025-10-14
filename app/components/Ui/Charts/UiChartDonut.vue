<script setup lang="ts">
import { useChart } from "~/composables/useChart";

export interface UiChartDonutProps {
  labels: string[];
  dataset: number[];
}
const props = defineProps<UiChartDonutProps>();
const { canvas } = useChart(
  (Chart, el) =>
    new Chart.Chart(el, {
      type: "doughnut",
      data: {
        labels: props.labels,
        datasets: [{ data: props.dataset, borderWidth: 0 }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        cutout: "60%",
      },
    })
);
</script>
<template>
  <div
    class="h-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-3"
  >
    <canvas ref="canvas" />
  </div>
</template>
