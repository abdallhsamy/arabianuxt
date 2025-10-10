<script setup lang="ts">
import UiChartArea from '~/components/Ui/Charts/UiChartArea.vue'
import UiChartBar from '~/components/Ui/Charts/UiChartBar.vue'
import UiChartPie from '~/components/Ui/Charts/UiChartPie.vue'
import UiChartRadar from '~/components/Ui/Charts/UiChartRadar.vue'
import UiStatsOverview from '~/components/Ui/Charts/UiStatsOverview.vue'

const stats = [
  { label: 'Revenue', value: '$42K', color: 'fuchsia', change: '+12%' },
  { label: 'Users', value: '1,245', color: 'cyan', change: '+4%' },
  { label: 'Sessions', value: '9,120', color: 'emerald', change: '-2%' },
  { label: 'Errors', value: '12', color: 'rose', change: '-8%' },
]
</script>

<template>
  <section class="p-8 space-y-8 text-gray-100">
    <UiStatsOverview :stats="stats" />

    <div class="grid md:grid-cols-2 gap-6">
      <UiChartArea :labels="['Mon','Tue','Wed','Thu','Fri']" :datasets="[{ label: 'Traffic', data: [20,40,35,50,65] }]" />
      <UiChartBar :labels="['Q1','Q2','Q3','Q4']" :datasets="[{ label: 'Sales', data: [12,25,30,22] }]" />
      <UiChartPie :labels="['Chrome','Firefox','Edge','Safari']" :values="[55,25,10,10]" />
      <UiChartRadar :labels="['Speed','UI','UX','Security','Support']" :datasets="[{ label: 'Score', data: [90,80,85,70,95] }]" />
    </div>
  </section>
</template>
