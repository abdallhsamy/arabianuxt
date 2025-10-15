<script setup lang="ts">
import UiDropdown from "~/components/Ui/Common/UiDropdown/UiDropdown.vue";
import { User, Settings, Bell, LogOut } from "lucide-vue-next";
import type { DropdownItem } from "~/components/Ui/Common/UiDropdown.type";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const dropdownItems: DropdownItem[] = [
  {
    id: "profile",
    label: t("pages.componentDropdown.items.profile"),
    icon: User,
  },
  {
    id: "settings",
    label: t("pages.componentDropdown.items.settings"),
    icon: Settings,
  },
  {
    id: "notifications",
    label: t("pages.componentDropdown.items.notifications"),
    icon: Bell,
  },
  { id: "divider1", divider: true },
  {
    id: "logout",
    label: t("pages.componentDropdown.items.logout"),
    icon: LogOut,
    color: "rose",
  },
];
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentDropdown.title") }}</h1>

    <div class="flex flex-wrap gap-6">
      <UiDropdown
        :label="t('pages.componentDropdown.labels.userMenu')"
        :items="dropdownItems"
        :icon="User"
      />

      <UiDropdown
        :label="t('pages.componentDropdown.labels.hoverMenu')"
        :items="dropdownItems"
        trigger="hover"
        color="cyan"
      />

      <UiDropdown
        :label="t('pages.componentDropdown.labels.rightAligned')"
        :items="dropdownItems"
        align="right"
        color="emerald"
      />

      <UiDropdown
        :label="t('pages.componentDropdown.labels.topPosition')"
        :items="dropdownItems"
        position="top"
        color="rose"
      />
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
