<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import UiSkeleton from '~/components/Ui/Feedback/UiSkeleton.vue'
import UiSkeletonGroup from '~/components/Ui/Feedback/UiSkeletonGroup.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

const loading = ref(true)

onMounted(() => {
  setTimeout(() => (loading.value = false), 2500)
})

const theme = ref<'default' | 'fancy'>('default')
const toggleTheme = () => {
  theme.value = theme.value === 'default' ? 'fancy' : 'default'
}
watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value)
})
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <h1 class="text-2xl font-bold">{{ t('pages.componentSkeleton.title') }}</h1>

    <!-- Shimmer -->
    <div>
      <h2 class="font-semibold mb-2">{{ t('pages.componentSkeleton.variants.shimmer') }}</h2>
      <UiSkeleton variant="rect" width="100%" height="60px" animation="shimmer" />
    </div>

    <!-- Pulse -->
    <div>
      <h2 class="font-semibold mb-2">{{ t('pages.componentSkeleton.variants.pulse') }}</h2>
      <UiSkeleton variant="rect" width="100%" height="60px" animation="pulse" />
    </div>

    <!-- Disabled -->
    <div>
      <h2 class="font-semibold mb-2">{{ t('pages.componentSkeleton.variants.static') }}</h2>
      <UiSkeleton variant="rect" width="100%" height="60px" :animation="false" />
    </div>

    <div>
      <h2 class="font-semibold mb-2">{{ t('pages.componentSkeleton.sections.intensitySpeed') }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UiSkeleton variant="rect" height="50px" intensity="subtle" :speed="2" />
        <UiSkeleton variant="rect" height="50px" intensity="medium" :speed="1.6" />
        <UiSkeleton variant="rect" height="50px" intensity="strong" :speed="1" />
      </div>
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
        <h2 class="text-xl font-semibold">{{ t('pages.componentSkeleton.loadedData.title') }}</h2>
        <p>{{ t('pages.componentSkeleton.loadedData.description') }}</p>
        <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-90 transition"
        >
          {{ t('pages.componentSkeleton.loadedData.continue') }}
        </button>
      </div>
    </UiSkeletonGroup>

    <div class="space-y-4">
      <UiSkeleton variant="rect" height="60px" />
      <UiSkeleton variant="rect" height="60px" intensity="strong" />
    </div>

    <button
        class="mt-6 px-4 py-2 rounded bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white"
        @click="toggleTheme"
    >
      {{ t('pages.componentSkeleton.buttons.toggleTheme') }}
    </button>
  </section>
</template>
