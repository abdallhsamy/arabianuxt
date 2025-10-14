<script setup lang="ts">
import { ref } from "vue";
import UiNotificationsPanel, {
  type Notice,
} from "~/components/Ui/Feedback/UiNotificationsPanel.vue";
import UiSettingsDrawer from "~/components/Ui/Layout/UiSettingsDrawer.vue";
import UiThemeSwitcher from "~/components/Ui/Layout/UiThemeSwitcher.vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const notifOpen = ref(false);
const settingsOpen = ref(false);
const themeValue = ref<"light" | "dark" | "fancy">("dark");

const notices = ref<Notice[]>([
  {
    id: "n1",
    title: t("pages.componentSettings.notifications.buildComplete"),
    body: t("pages.componentSettings.notifications.deploymentFinished"),
    time: t("pages.componentSettings.notifications.twoMinAgo"),
  },
  {
    id: "n2",
    title: t("pages.componentSettings.notifications.newSignup"),
    body: t("pages.componentSettings.notifications.userJoined"),
    time: t("pages.componentSettings.notifications.tenMinAgo"),
    read: true,
  },
]);

const markAllRead = (): void => {
  notices.value = notices.value.map(n => ({ ...n, read: true }));
};
const clearAll = (): void => {
  notices.value = [];
};
</script>

<template>
  <section class="p-8 space-y-6 text-gray-100">
    <div class="flex gap-3">
      <button
        class="px-3 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white"
        @click="notifOpen = true"
      >
        {{ t("pages.componentSettings.buttons.openNotifications") }}
      </button>

      <button
        class="px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-200"
        @click="settingsOpen = true"
      >
        {{ t("pages.componentSettings.buttons.openSettings") }}
      </button>

      <UiThemeSwitcher v-model="themeValue" :showLabel="true" />
    </div>

    <p class="text-sm text-gray-400">
      {{ t("pages.componentSettings.currentTheme") }}:
      <span class="text-gray-200">{{ themeValue }}</span>
    </p>
  </section>

  <UiNotificationsPanel
    v-model="notifOpen"
    :items="notices"
    @select="n => console.log('Selected', n)"
    @mark-all-read="markAllRead"
    @clear-all="clearAll"
  />

  <UiSettingsDrawer
    v-model="settingsOpen"
    @update:settings="s => console.log('Settings', s)"
  />
</template>
