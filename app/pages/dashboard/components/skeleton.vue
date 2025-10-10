<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UiSkeleton from '~/components/Ui/Feedback/UiSkeleton.vue'
import UiSkeletonGroup from '~/components/Ui/Feedback/UiSkeletonGroup.vue'

const loading = ref(true)

onMounted(() => {
  setTimeout(() => (loading.value = false), 2500)
})
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <h1 class="text-2xl font-bold">✨ UiSkeleton Animation Variants</h1>

    <!-- Shimmer -->
    <div>
      <h2 class="font-semibold mb-2">Shimmer (default)</h2>
      <UiSkeleton variant="rect" width="100%" height="60px" animation="shimmer" />
    </div>

    <!-- Pulse -->
    <div>
      <h2 class="font-semibold mb-2">Pulse</h2>
      <UiSkeleton variant="rect" width="100%" height="60px" animation="pulse" />
    </div>

    <!-- Disabled -->
    <div>
      <h2 class="font-semibold mb-2">Static (no animation)</h2>
      <UiSkeleton variant="rect" width="100%" height="60px" :animation="false" />
    </div>

    <!-- Group Example -->
    <UiSkeletonGroup :loading="loading">
      <template #skeletons>
        <div class="space-y-4">
          <UiSkeleton variant="text" :lines="3" animation="pulse" />
          <UiSkeleton variant="rect" height="100px" animation="shimmer" />
          <UiSkeleton variant="button" width="120px" animation="pulse" />
        </div>
      </template>

      <div class="space-y-3">
        <h2 class="text-xl font-semibold">Loaded Data</h2>
        <p>Skeletons above fade out smoothly after loading.</p>
        <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-90 transition"
        >
          Continue
        </button>
      </div>
    </UiSkeletonGroup>
  </section>
</template>
