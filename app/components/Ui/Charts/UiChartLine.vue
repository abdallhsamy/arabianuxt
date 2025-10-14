<script setup lang="ts">
import { useChart } from "~/composables/useChart";

export interface UiChartLineProps {
  labels: string[];
  dataset: number[];
}
const props = defineProps<UiChartLineProps>();

const { canvas } = useChart(
  (Chart, el) =>
    new Chart.Chart(el, {
      type: "line",
      data: {
        labels: props.labels,
        datasets: [
          {
            data: props.dataset,
            fill: false,
            tension: 0.35,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: "rgba(255,255,255,.06)" } },
          y: { grid: { color: "rgba(255,255,255,.06)" } },
        },
      },
    })
);
</script>

<template>
  <div
    class="h-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-3"
  >
    <canvas ref="canvas"></canvas>
  </div>
</template>
