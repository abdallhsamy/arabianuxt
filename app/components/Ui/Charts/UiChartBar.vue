<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
} from "chart.js";
import { useChartTheme } from "~/composables/useChartTheme";

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);

export interface UiChartBarProps {
  labels: string[];
  datasets: { label: string; data: number[]; color?: string }[];
}

const props = defineProps<UiChartBarProps>();
const canvas = ref<HTMLCanvasElement>();
onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  const options = useChartTheme();
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: props.datasets.map(d => ({
        label: d.label,
        data: d.data,
        backgroundColor: d.color ?? "#06b6d4",
        borderRadius: 6,
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
