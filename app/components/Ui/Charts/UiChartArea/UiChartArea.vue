<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Chart,
  type ChartOptions,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler,
} from "chart.js";
import { useChartTheme } from "~/composables/useChartTheme";
import type { UiChartAreaProps } from "./UiChartArea.type";
import {
  UiChartAreaChartType,
  UiChartAreaDefaultValues,
  UiChartAreaGradientStops,
} from "./UiChartArea.type";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Filler
);

const props = defineProps<UiChartAreaProps>();
const canvas = ref<HTMLCanvasElement>();

onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  const options: ChartOptions<"line"> = useChartTheme();
  new Chart(ctx, {
    type: UiChartAreaChartType,
    data: {
      labels: props.labels,
      datasets: props.datasets.map(d => ({
        label: d.label,
        data: d.data,
        fill: UiChartAreaDefaultValues.Fill,
        borderColor: d.color ?? UiChartAreaDefaultValues.Color,
        backgroundColor: (ctx: Chart.ChartContext) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(
            UiChartAreaGradientStops.Start,
            `${d.color ?? UiChartAreaDefaultValues.Color}${UiChartAreaGradientStops.StartOpacity}`
          );
          gradient.addColorStop(
            UiChartAreaGradientStops.End,
            UiChartAreaGradientStops.EndOpacity
          );
          return gradient;
        },
        tension: UiChartAreaDefaultValues.Tension,
      })),
    },
    options,
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
