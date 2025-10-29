<script setup lang="ts">
import { useChart } from "~/composables/useChart";
import type { UiChartDonutProps } from "./UiChartDonut.type";
import {
  UiChartDonutChartType,
  UiChartDonutDefaultValues,
} from "./UiChartDonut.type";

const props = defineProps<UiChartDonutProps>();

const { canvas } = useChart(
  (Chart, el) =>
    new Chart.Chart(el, {
      type: UiChartDonutChartType,
      data: {
        labels: props.labels,
        datasets: [
          {
            data: props.dataset,
            borderWidth: UiChartDonutDefaultValues.BorderWidth,
          },
        ],
      },
      options: {
        responsive: UiChartDonutDefaultValues.Responsive,
        maintainAspectRatio: UiChartDonutDefaultValues.MaintainAspectRatio,
        plugins: {
          legend: { display: UiChartDonutDefaultValues.LegendDisplay },
        },
        cutout: UiChartDonutDefaultValues.Cutout,
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
