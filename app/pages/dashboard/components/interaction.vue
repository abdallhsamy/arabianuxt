<script setup lang="ts">
import { ref } from "vue";
import UiFileUploadAdvanced from "~/components/Ui/Form/UiFileUploadAdvanced/UiFileUploadAdvanced.vue";
import UiDateRangePicker from "~/components/Ui/Form/UiDateRangePicker/UiDateRangePicker.vue";
import UiSearchPanel from "~/components/Ui/Nav/UiSearchPanel/UiSearchPanel.vue";
import UiChatDock from "~/components/Ui/Assist/UiChatDock/UiChatDock.vue";
import UiTooltip from "~/components/Ui/Common/UiTooltip/UiTooltip.vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const searchOpen = ref(false);
const items = [
  {
    id: "1",
    title: t("pages.componentInteraction.items.dashboardOverview"),
    category: t("pages.componentInteraction.categories.pages"),
  },
  {
    id: "2",
    title: t("pages.componentInteraction.items.settingsPanel"),
    category: t("pages.componentInteraction.categories.pages"),
  },
  {
    id: "3",
    title: t("pages.componentInteraction.items.revenueReport"),
    category: t("pages.componentInteraction.categories.analytics"),
  },
];
</script>

<template>
  <section class="p-8 text-gray-100 space-y-6">
    <h1 class="text-2xl font-bold">
      {{ t("pages.componentInteraction.title") }}
    </h1>

    <div class="grid md:grid-cols-2 gap-6">
      <UiFileUploadAdvanced />
      <UiDateRangePicker />
    </div>

    <button
      class="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white"
      @click="searchOpen = true"
    >
      {{ t("pages.componentInteraction.openSearch") }}
    </button>

    <UiTooltip
      class="ms-4"
      :text="t('pages.componentInteraction.tooltipExample')"
    >
      <span class="underline cursor-help">
        {{ t("pages.componentInteraction.hoverMe") }}
      </span>
    </UiTooltip>

    <UiSearchPanel v-model="searchOpen" :items="items" />
    <UiChatDock />
  </section>
</template>
