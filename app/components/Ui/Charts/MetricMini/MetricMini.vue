<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Chart from "chart.js/auto";
import type { MetricMiniProps } from "./MetricMini.type";
import {
  MetricMiniDefaultValues,
  MetricMiniChartType,
  MetricMiniChartOptions,
  MetricMiniBackgroundColors,
} from "./MetricMini.type";

const props = defineProps<MetricMiniProps>();

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;
let interval: NodeJS.Timeout | null = null;

onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  chart = new Chart(ctx, {
    type: MetricMiniChartType,
    data: {
      labels: [props.label],
      datasets: [
        {
          data: [0, MetricMiniDefaultValues.Total],
          backgroundColor: [props.color, MetricMiniBackgroundColors.Active],
          borderWidth: MetricMiniChartOptions.BorderWidth,
        },
      ],
    },
    options: {
      cutout: MetricMiniChartOptions.Cutout,
      plugins: { legend: { display: MetricMiniChartOptions.LegendDisplay } },
    },
  });
  interval = setInterval(() => {
    if (!chart) return;
    if (chart && chart.data.datasets[0]) {
      const min = props.min ?? MetricMiniDefaultValues.Min;
      const max = props.max ?? MetricMiniDefaultValues.Max;
      const val = Math.floor(Math.random() * (max - min) + min);
      chart.data.datasets[0].data = [val, MetricMiniDefaultValues.Total - val];
      chart.update();
    }
  }, MetricMiniDefaultValues.UpdateInterval);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
  chart?.destroy();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center w-32">
    <canvas ref="canvas" class="h-24 w-24" />
    <p class="text-gray-300 text-xs mt-2">{{ label }}</p>
  </div>
</template>
