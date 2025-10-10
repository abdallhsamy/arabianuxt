<script setup lang="ts">
import { ref, onMounted } from 'vue'
import UiSkeleton from '~/components/Ui/Feedback/UiSkeleton.vue'
import UiSkeletonGroup from '~/components/Ui/Feedback/UiSkeletonGroup.vue'

const loading = ref(true)

/* simulate API load */
onMounted(() => {
  setTimeout(() => (loading.value = false), 2500)
})
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <h1 class="text-2xl font-bold">✨ UiSkeleton + UiSkeletonGroup</h1>

    <!-- SkeletonGroup Example -->
    <UiSkeletonGroup :loading="loading" @loaded="console.log('Loaded!')">
      <template #skeletons>
        <div class="space-y-4">
          <UiSkeleton variant="text" :lines="3" />
          <UiSkeleton variant="rect" height="80px" />
          <UiSkeleton variant="button" width="120px" />
        </div>
      </template>

      <!-- Actual content -->
      <div class="space-y-3">
        <h2 class="text-xl font-semibold">Loaded Data</h2>
        <p>
          This content replaces the skeletons automatically when loading
          finishes. The transition is smooth and glassy ✨.
        </p>
        <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-90 transition"
        >
          Fancy Loaded Button
        </button>
      </div>
    </UiSkeletonGroup>
  </section>
</template>
