<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import UiFileViewer from "~/components/Ui/Dev/UiFileViewer/UiFileViewer.vue";
import UiJsonInspector from "~/components/Ui/Dev/UiJsonInspector/UiJsonInspector.vue";
import UiDiffViewer from "~/components/Ui/Dev/UiDiffViewer/UiDiffViewer.vue";
import UiLogConsole from "~/components/Ui/Dev/UiLogConsole/UiLogConsole.vue";
import UiTerminalShell from "~/components/Ui/Dev/UiTerminalShell.vue";
import type { UiLogConsoleLogItem } from "~/components/Ui/Dev/UiLogConsole/UiLogConsole.type";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const logs = ref<UiLogConsoleLogItem[]>([]);
const pushLog = (
  level: UiLogConsoleLogItem["level"],
  message: string
): void => {
  logs.value = [
    ...logs.value,
    { id: crypto.randomUUID(), ts: Date.now(), level, message },
  ];
};

const jsonData = {
  name: "Dashboard",
  version: "1.0.0",
  features: ["nuxt", "tailwind", "charts"],
  flags: { dark: true, glass: 0.7 },
};

let interval: NodeJS.Timeout | undefined;

onMounted(() => {
  interval = setInterval(() => {
    const levels = ["debug", "info", "warn", "error"] as const;
    const randomLevel =
      levels[Math.floor(Math.random() * levels.length)] || "info";
    pushLog(randomLevel, t("pages.componentDevTools.heartbeat"));
  }, 3000);
});

onBeforeUnmount(() => {
  if (interval) clearInterval(interval);
});
</script>

<template>
  <section class="p-8 space-y-8 text-gray-100">
    <h1 class="text-2xl font-bold">{{ t("pages.componentDevTools.title") }}</h1>

    <div class="grid lg:grid-cols-2 gap-6">
      <UiFileViewer filename="example.json" :json="jsonData" />
      <UiJsonInspector :value="jsonData" root-key="package.json" />
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <UiDiffViewer
        :before="`line 1\nold value\nsame\nremove me`"
        :after="`line 1\nnew value\nsame\nadd me`"
      />
      <UiLogConsole v-model="logs" />
    </div>

    <UiTerminalShell />
  </section>
</template>
