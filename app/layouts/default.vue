<script setup lang="ts">
import Sidebar from '~/components/Ui/Dashboard/Sidebar.vue';
</script>

<template>
  <div class="min-h-screen bg-[var(--bg)] text-[var(--text-primary)] relative overflow-x-hidden">
    <Sidebar />
    <main
        id="main"
        class="transition-all duration-300 p-8 md:ps-14 md:pb-16"
    >
      <slot />
    </main>
  </div>
</template>
