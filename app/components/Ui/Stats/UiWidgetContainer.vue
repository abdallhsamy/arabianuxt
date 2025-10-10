<script setup lang="ts">
export interface UiWidgetContainerProps {
  title?: string
  subtitle?: string
}
const props = withDefaults(defineProps<UiWidgetContainerProps>(), {})
</script>

<template>
  <section class="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
    <header v-if="props.title || props.subtitle" class="mb-3">
      <h3 class="text-gray-100 font-semibold">{{ props.title }}</h3>
      <p v-if="props.subtitle" class="text-xs text-gray-400">{{ props.subtitle }}</p>
    </header>
    <div>
      <slot />
    </div>
  </section>
</template>
