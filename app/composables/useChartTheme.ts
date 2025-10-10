import type { ChartOptions } from 'chart.js/auto'

export const useChartTheme = (): ChartOptions<'line'> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            labels: { color: '#cbd5e1', font: { size: 12 } },
        },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            titleColor: '#fff',
            bodyColor: '#ddd',
        },
    },
    scales: {
        x: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255,255,255,0.05)' },
        },
        y: {
            ticks: { color: '#9ca3af' },
            grid: { color: 'rgba(255,255,255,0.05)' },
        },
    },
})
