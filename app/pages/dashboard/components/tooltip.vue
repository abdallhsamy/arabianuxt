<script setup lang="ts">
import UiTooltip from "~/components/Ui/Common/UiTooltip/UiTooltip.vue";
import UiButton from "~/components/Ui/Common/UiButton/UiButton.vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t("pages.componentTooltip.title") }}</h1>

    <div class="grid gap-12 md:grid-cols-3 place-items-center">
      <!-- Top -->
      <UiTooltip
        :text="t('pages.componentTooltip.positions.top')"
        position="top"
      >
        <UiButton :label="t('pages.componentTooltip.buttons.hoverTop')" />
      </UiTooltip>

      <!-- Bottom -->
      <UiTooltip
        :text="t('pages.componentTooltip.positions.bottom')"
        position="bottom"
        color="cyan"
      >
        <UiButton :label="t('pages.componentTooltip.buttons.hoverBottom')" />
      </UiTooltip>

      <!-- Right -->
      <UiTooltip
        :text="t('pages.componentTooltip.positions.right')"
        position="right"
        color="emerald"
      >
        <UiButton :label="t('pages.componentTooltip.buttons.hoverRight')" />
      </UiTooltip>

      <!-- Left -->
      <UiTooltip
        :text="t('pages.componentTooltip.positions.left')"
        position="left"
        color="rose"
      >
        <UiButton :label="t('pages.componentTooltip.buttons.hoverLeft')" />
      </UiTooltip>

      <!-- Start -->
      <UiTooltip
        :text="t('pages.componentTooltip.positions.start')"
        position="start"
        color="emerald"
      >
        <UiButton :label="t('pages.componentTooltip.buttons.hoverStart')" />
      </UiTooltip>

      <!-- End -->
      <UiTooltip
        :text="t('pages.componentTooltip.positions.end')"
        position="end"
        color="rose"
      >
        <UiButton :label="t('pages.componentTooltip.buttons.hoverEnd')" />
      </UiTooltip>

      <!-- Click Trigger -->
      <UiTooltip
        :text="t('pages.componentTooltip.triggers.clickMe')"
        trigger="click"
        color="amber"
      >
        <UiButton :label="t('pages.componentTooltip.buttons.clickTooltip')" />
      </UiTooltip>

      <!-- Focus Trigger -->
      <UiTooltip
        :text="t('pages.componentTooltip.triggers.focusToShow')"
        trigger="focus"
        color="indigo"
      >
        <input
          type="text"
          :placeholder="t('pages.componentTooltip.placeholders.focusMe')"
          class="px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 ring-indigo-500/40 text-gray-200 placeholder-gray-500"
        />
      </UiTooltip>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
