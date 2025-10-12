<script setup lang="ts">
import { Check, AlertCircle, Bell, Star } from 'lucide-vue-next'
import UiBadge from "~/components/Ui/Display/UiBadge.vue";

const { t } = useI18n()
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t('pages.componentBadge.title') }}</h1>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- Solid Variants -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">{{ t('pages.componentBadge.sections.solidVariants') }}</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge :label="t('pages.componentBadge.colors.fuchsia')" color="fuchsia" variant="solid" />
          <UiBadge :label="t('pages.componentBadge.colors.cyan')" color="cyan" variant="solid" />
          <UiBadge :label="t('pages.componentBadge.colors.emerald')" color="emerald" variant="solid" />
          <UiBadge :label="t('pages.componentBadge.colors.rose')" color="rose" variant="solid" />
        </div>
      </div>

      <!-- Soft Variants -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">{{ t('pages.componentBadge.sections.softVariants') }}</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge :label="t('pages.componentBadge.statuses.info')" color="cyan" variant="soft" />
          <UiBadge :label="t('pages.componentBadge.statuses.success')" color="emerald" variant="soft" />
          <UiBadge :label="t('pages.componentBadge.statuses.warning')" color="amber" variant="soft" />
          <UiBadge :label="t('pages.componentBadge.statuses.error')" color="rose" variant="soft" />
        </div>
      </div>

      <!-- Outline + Glow -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">{{ t('pages.componentBadge.sections.outlineGlow') }}</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge :label="t('pages.componentBadge.labels.new')" variant="outline" color="fuchsia" glow />
          <UiBadge :label="t('pages.componentBadge.labels.beta')" variant="outline" color="indigo" glow />
          <UiBadge :label="t('pages.componentBadge.labels.stable')" variant="outline" color="emerald" glow />
        </div>
      </div>

      <!-- Dot Mode -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">{{ t('pages.componentBadge.sections.dotBadges') }}</h2>
        <div class="flex flex-wrap items-center gap-3">
          <UiBadge dot color="fuchsia" />
          <UiBadge dot color="emerald" />
          <UiBadge dot color="amber" />
          <UiBadge dot color="rose" glow />
        </div>
      </div>

      <!-- With Icon -->
      <div class="space-y-3">
        <h2 class="text-gray-300 text-sm font-semibold">{{ t('pages.componentBadge.sections.withIcon') }}</h2>
        <div class="flex flex-wrap gap-3">
          <UiBadge :icon="Check" :label="t('pages.componentBadge.labels.done')" color="emerald" variant="soft" />
          <UiBadge :icon="AlertCircle" :label="t('pages.componentBadge.statuses.warning')" color="amber" variant="solid" />
          <UiBadge :icon="Bell" :label="t('pages.componentBadge.labels.alerts')" color="fuchsia" variant="glass" />
          <UiBadge :icon="Star" :label="t('pages.componentBadge.labels.premium')" color="cyan" variant="outline" glow />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
