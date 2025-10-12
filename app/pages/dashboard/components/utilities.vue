<script setup lang="ts">
import UiBadge from '~/components/Ui/Display/UiBadge.vue'
import UiEmptyState from '~/components/Ui/Display/UiEmptyState.vue'
import UiLoaderSpinner from '~/components/Ui/Display/UiLoaderSpinner.vue'
import UiDivider from '~/components/Ui/Layout/UiDivider.vue'

const { t } = useI18n()
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <h1 class="text-2xl font-bold">{{ t('pages.componentUtilities.title') }}</h1>

    <div class="flex flex-wrap gap-3">
      <UiBadge :label="t('pages.componentUtilities.badges.active')" color="emerald" />
      <UiBadge :label="t('pages.componentUtilities.badges.pending')" color="amber" variant="soft" />
      <UiBadge :label="t('pages.componentUtilities.badges.error')" color="rose" variant="solid" />
    </div>

    <UiDivider :label="t('pages.componentUtilities.sections.loaders')" />

    <div class="flex items-center gap-4">
      <UiLoaderSpinner :size="24" color="#22d3ee" />
      <UiLoaderSpinner :size="40" color="#a855f7" />
      <UiLoaderSpinner :size="60" color="#f472b6" />
    </div>

    <UiDivider :label="t('pages.componentUtilities.sections.emptyStates')" />

    <UiEmptyState
        icon="📭"
        :title="t('pages.componentUtilities.emptyState.title')"
        :description="t('pages.componentUtilities.emptyState.description')"
        :actionLabel="t('pages.componentUtilities.emptyState.actionLabel')"
    />

    <UiDivider :label="t('pages.componentUtilities.sections.verticalDivider')" />

    <div class="flex items-center gap-4 h-20">
      <span>{{ t('pages.componentUtilities.directions.left') }}</span>
      <UiDivider orientation="vertical" />
      <span>{{ t('pages.componentUtilities.directions.right') }}</span>
    </div>
  </section>
</template>
