<script setup lang="ts">
export interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: any;
}

defineProps<{ items: BreadcrumbItem[] }>();
</script>

<template>
  <nav
    aria-label="breadcrumb"
    class="flex items-center gap-2 text-sm text-gray-300"
  >
    <template v-for="(item, i) in items" :key="i">
      <a
        v-if="item.to"
        :href="item.to"
        class="hover:text-fuchsia-400 transition-colors"
      >
        {{ item.label }}
      </a>
      <span v-else class="text-gray-400">{{ item.label }}</span>
      <span v-if="i < items.length - 1" class="text-gray-500 mx-1">/</span>
    </template>
  </nav>
</template>
