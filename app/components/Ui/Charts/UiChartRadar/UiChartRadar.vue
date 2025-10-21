<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import type { UiChartRadarProps } from "./UiChartRadar.type";

Chart.register(
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const props = defineProps<UiChartRadarProps>();
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  new Chart(ctx, {
    type: "radar",
    data: {
      labels: props.labels,
      datasets: props.datasets.map(d => ({
        label: d.label,
        data: d.data,
        borderColor: d.color ?? "#f472b6",
        backgroundColor: `${d.color ?? "#f472b6"}33`,
        fill: true,
      })),
    },
    options: {
      scales: {
        r: {
          angleLines: { color: "rgba(255,255,255,0.05)" },
          grid: { color: "rgba(255,255,255,0.05)" },
          pointLabels: { color: "#9ca3af" },
        },
      },
      plugins: { legend: { labels: { color: "#cbd5e1" } } },
    },
  });
});
</script>

<template>
  <div
    class="relative h-64 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4"
  >
    <canvas ref="canvas"></canvas>
  </div>
</template>
