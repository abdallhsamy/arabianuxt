<script setup lang="ts">
import { ref } from "vue";
import UiAnalyticsCard from "~/components/Ui/Widgets/UiAnalyticsCard/UiAnalyticsCard.vue";
import UiActivityFeed from "~/components/Ui/Widgets/UiActivityFeed/UiActivityFeed.vue";
import UiMapWidget from "~/components/Ui/Widgets/UiMapWidget/UiMapWidget.vue";
import UiKanbanBoard from "~/components/Ui/Widgets/UiKanbanBoard/UiKanbanBoard.vue";
import UiUserAvatarGroup from "~/components/Ui/Widgets/UiUserAvatarGroup/UiUserAvatarGroup.vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const tasks = ref([
  {
    id: "1",
    title: t("pages.componentWidgets.tasks.designMockups"),
    status: "todo" as const,
  },
  {
    id: "2",
    title: t("pages.componentWidgets.tasks.fixBugs"),
    status: "progress" as const,
  },
  {
    id: "3",
    title: t("pages.componentWidgets.tasks.deployRelease"),
    status: "done" as const,
  },
]);

const feed = [
  {
    id: "1",
    title: t("pages.componentWidgets.feed.newUserJoined"),
    description: t("pages.componentWidgets.feed.ahmedRegistered"),
    time: t("pages.componentWidgets.feed.fiveMinAgo"),
    type: "info" as const,
  },
  {
    id: "2",
    title: t("pages.componentWidgets.feed.paymentReceived"),
    description: t("pages.componentWidgets.feed.amountCredited"),
    time: t("pages.componentWidgets.feed.tenMinAgo"),
    type: "success" as const,
  },
  {
    id: "3",
    title: t("pages.componentWidgets.feed.serverWarning"),
    description: t("pages.componentWidgets.feed.memoryUsageHigh"),
    time: t("pages.componentWidgets.feed.oneHourAgo"),
    type: "warning" as const,
  },
];

const users = [
  { id: "1", name: "A" },
  { id: "2", name: "B" },
  { id: "3", name: "C" },
  { id: "4", name: "D" },
  { id: "5", name: "E" },
  { id: "6", name: "F" },
];
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UiAnalyticsCard
        :label="t('pages.componentWidgets.analytics.revenue')"
        value="$45K"
        change="+8%"
        icon="💰"
        color="emerald"
        :progress="80"
      />
      <UiAnalyticsCard
        :label="t('pages.componentWidgets.analytics.activeUsers')"
        value="1.2K"
        change="+4%"
        icon="👥"
        color="cyan"
        :progress="70"
      />
      <UiAnalyticsCard
        :label="t('pages.componentWidgets.analytics.bounceRate')"
        value="24%"
        change="-3%"
        icon="📉"
        color="amber"
        :progress="40"
      />
      <UiAnalyticsCard
        :label="t('pages.componentWidgets.analytics.errors')"
        value="12"
        change="+2%"
        icon="⚠️"
        color="rose"
        :progress="20"
      />
    </div>

    <UiUserAvatarGroup :users="users" :max="5" />

    <UiActivityFeed :items="feed" />

    <UiKanbanBoard v-model="tasks" />

    <UiMapWidget :lat="24.7136" :lng="46.6753" height="300px" />
  </section>
</template>
