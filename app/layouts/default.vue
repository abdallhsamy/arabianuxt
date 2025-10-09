<script setup lang="ts">
import Sidebar from '~/components/Ui/Dashboard/Sidebar.vue'
import Topbar from '~/components/Layout/Topbar.vue'
import Toaster from '~/components/Ui/Common/Toaster.vue'
import { useToaster } from '~/composables/useToaster'

const toaster = useToaster()

</script>

<template>
  <div
      class="min-h-screen relative overflow-hidden text-[var(--text-primary)] selection:bg-fuchsia-500/20"
  >
    <!-- 🌌 Animated Gradient Background -->
    <div
        class="absolute inset-0 -z-10 animate-gradient-flow bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.25),transparent_50%),linear-gradient(180deg,#0b0b0f_0%,#0f1115_100%)]"
    />

    <!-- Topbar -->

    <Topbar />

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <main id="main" class="transition-all mt-16 duration-300 p-8 md:pb-16">
      <slot />
    </main>

    <!-- Optional floating blur or particles -->
    <div
        class="pointer-events-none -z-20 absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm"
    />

    <Toaster id="global-toaster" position="top-right" />
  </div>
</template>

<style scoped>
@keyframes gradient-flow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-gradient-flow {
  background-size: 200% 200%;
  animation: gradient-flow 15s ease infinite;
}
</style>
