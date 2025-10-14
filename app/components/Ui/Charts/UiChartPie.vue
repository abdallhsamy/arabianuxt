<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Chart, PieController, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(PieController, ArcElement, Tooltip, Legend);

export interface UiChartPieProps {
  labels: string[];
  values: number[];
  colors?: string[];
}

const props = defineProps<UiChartPieProps>();
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: props.labels,
      datasets: [
        {
          data: props.values,
          backgroundColor: props.colors ?? [
            "#a855f7",
            "#22d3ee",
            "#10b981",
            "#f59e0b",
            "#ef4444",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: { labels: { color: "#cbd5e1" } },
      },
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
