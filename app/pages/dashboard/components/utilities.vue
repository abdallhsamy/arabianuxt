<script setup lang="ts">
import UiBadge from '~/components/Ui/Display/UiBadge.vue'
import UiEmptyState from '~/components/Ui/Display/UiEmptyState.vue'
import UiLoaderSpinner from '~/components/Ui/Display/UiLoaderSpinner.vue'
import UiDivider from '~/components/Ui/Layout/UiDivider.vue'
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <h1 class="text-2xl font-bold">🧩 Utility Components</h1>

    <div class="flex flex-wrap gap-3">
      <UiBadge label="Active" color="emerald" />
      <UiBadge label="Pending" color="amber" variant="soft" />
      <UiBadge label="Error" color="rose" variant="solid" />
    </div>

    <UiDivider label="Loaders" />

    <div class="flex items-center gap-4">
      <UiLoaderSpinner :size="24" color="#22d3ee" />
      <UiLoaderSpinner :size="40" color="#a855f7" />
      <UiLoaderSpinner :size="60" color="#f472b6" />
    </div>

    <UiDivider label="Empty States" />

    <UiEmptyState
        icon="📭"
        title="No Records Found"
        description="Try changing your filters or create a new item."
        actionLabel="Create New"
    />

    <UiDivider label="Vertical Divider" />

    <div class="flex items-center gap-4 h-20">
      <span>Left</span>
      <UiDivider orientation="vertical" />
      <span>Right</span>
    </div>
  </section>
</template>
