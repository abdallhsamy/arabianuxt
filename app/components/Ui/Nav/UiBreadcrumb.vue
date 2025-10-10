<script setup lang="ts">
export interface Crumb { label: string; to?: string }
export interface UiBreadcrumbProps { items: Crumb[] }
const props = defineProps<UiBreadcrumbProps>()
</script>

<template>
  <nav class="text-sm text-gray-400" aria-label="Breadcrumb">
    <ol class="flex items-center gap-2">
      <li v-for="(c,i) in props.items" :key="i" class="flex items-center gap-2">
        <NuxtLink v-if="c.to && i < props.items.length - 1" :to="c.to" class="hover:text-fuchsia-300">{{ c.label }}</NuxtLink>
        <span v-else class="text-gray-200">{{ c.label }}</span>
        <span v-if="i < props.items.length - 1" class="opacity-50">/</span>
      </li>
    </ol>
  </nav>
</template>
