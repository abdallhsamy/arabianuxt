<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Chart, type ChartData, type ChartOptions, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler } from 'chart.js'
import { useChartTheme } from '~/composables/useChartTheme'

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler)

export interface UiChartAreaProps {
  labels: string[]
  datasets: { label: string; data: number[]; color?: string }[]
}

const props = defineProps<UiChartAreaProps>()
const canvas = ref<HTMLCanvasElement>()
let chart: Chart | null = null

onMounted(() => {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  const options: ChartOptions<'line'> = useChartTheme()
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.labels,
      datasets: props.datasets.map(d => ({
        label: d.label,
        data: d.data,
        fill: true,
        borderColor: d.color ?? '#a855f7',
        backgroundColor: (ctx: any) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 250)
          gradient.addColorStop(0, (d.color ?? '#a855f7') + '55')
          gradient.addColorStop(1, 'transparent')
          return gradient
        },
        tension: 0.4,
      })),
    },
    options,
  })
})
</script>

<template>
  <div class="relative h-64 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
    <canvas ref="canvas"></canvas>
  </div>
</template>
