<script setup lang="ts">
import UiChartArea from "~/components/Ui/Charts/UiChartArea.vue";
import UiChartBar from "~/components/Ui/Charts/UiChartBar.vue";
import UiChartPie from "~/components/Ui/Charts/UiChartPie.vue";
import UiChartRadar from "~/components/Ui/Charts/UiChartRadar.vue";
import UiStatsOverview from "~/components/Ui/Charts/UiStatsOverview.vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const stats = [
  {
    label: t("pages.componentCharts.stats.revenue"),
    value: "$42K",
    color: "fuchsia" as const,
    change: "+12%",
  },
  {
    label: t("pages.componentCharts.stats.users"),
    value: "1,245",
    color: "cyan" as const,
    change: "+4%",
  },
  {
    label: t("pages.componentCharts.stats.sessions"),
    value: "9,120",
    color: "emerald" as const,
    change: "-2%",
  },
  {
    label: t("pages.componentCharts.stats.errors"),
    value: "12",
    color: "rose" as const,
    change: "-8%",
  },
];
</script>

<template>
  <section class="p-8 space-y-8 text-gray-100">
    <UiStatsOverview :stats="stats" />

    <div class="grid md:grid-cols-2 gap-6">
      <UiChartArea
        :labels="[
          t('pages.componentCharts.days.mon'),
          t('pages.componentCharts.days.tue'),
          t('pages.componentCharts.days.wed'),
          t('pages.componentCharts.days.thu'),
          t('pages.componentCharts.days.fri'),
        ]"
        :datasets="[
          {
            label: t('pages.componentCharts.datasets.traffic'),
            data: [20, 40, 35, 50, 65],
          },
        ]"
      />
      <UiChartBar
        :labels="[
          t('pages.componentCharts.quarters.q1'),
          t('pages.componentCharts.quarters.q2'),
          t('pages.componentCharts.quarters.q3'),
          t('pages.componentCharts.quarters.q4'),
        ]"
        :datasets="[
          {
            label: t('pages.componentCharts.datasets.sales'),
            data: [12, 25, 30, 22],
          },
        ]"
      />
      <UiChartPie
        :labels="[
          t('pages.componentCharts.browsers.chrome'),
          t('pages.componentCharts.browsers.firefox'),
          t('pages.componentCharts.browsers.edge'),
          t('pages.componentCharts.browsers.safari'),
        ]"
        :values="[55, 25, 10, 10]"
      />
      <UiChartRadar
        :labels="[
          t('pages.componentCharts.metrics.speed'),
          t('pages.componentCharts.metrics.ui'),
          t('pages.componentCharts.metrics.ux'),
          t('pages.componentCharts.metrics.security'),
          t('pages.componentCharts.metrics.support'),
        ]"
        :datasets="[
          {
            label: t('pages.componentCharts.datasets.score'),
            data: [90, 80, 85, 70, 95],
          },
        ]"
      />
    </div>
  </section>
</template>
