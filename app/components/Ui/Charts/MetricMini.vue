<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Chart from "chart.js/auto";

const props = defineProps<{
  label: string;
  color: string;
  min?: number;
  max?: number;
}>();
const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;
let interval: NodeJS.Timeout | null = null;

onMounted(() => {
  const ctx = canvas.value?.getContext("2d");
  if (!ctx) return;
  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [props.label],
      datasets: [
        {
          data: [0, 100],
          backgroundColor: [props.color, "rgba(255,255,255,0.1)"],
          borderWidth: 0,
        },
      ],
    },
    options: { cutout: "80%", plugins: { legend: { display: false } } },
  });
  interval = setInterval(() => {
    if (!chart) return;
    if (chart && chart.data.datasets[0]) {
      const val = Math.floor(Math.random() * 80 + 10);
      chart.data.datasets[0].data = [val, 100 - val];
      chart.update();
    }
  }, 3000);
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
