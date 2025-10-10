import { onMounted, onBeforeUnmount, ref, type Ref } from 'vue'

export type ChartModule = typeof import('chart.js')

export const useChart = (make: (Chart: ChartModule, el: HTMLCanvasElement) => any) => {
    const canvas = ref<HTMLCanvasElement | null>(null)
    let chart: any

    onMounted(async () => {
        const Chart = await import('chart.js')
        // Register all (safe for v4)
        const { Chart: ChartCls, registerables } = Chart as any
        ChartCls.register(...registerables)
        if (canvas.value) chart = make(Chart as any, canvas.value)
    })

    onBeforeUnmount(() => {
        if (chart) chart.destroy()
    })

    return { canvas }
}
