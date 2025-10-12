<script setup lang="ts">
import UiTooltip from '~/components/Ui/Common/UiTooltip.vue'
import UiButton from '~/components/Ui/Common/UiButton.vue'
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Tooltip Component Examples</h1>

    <div class="grid gap-12 md:grid-cols-3 place-items-center">
      <!-- Top -->
      <UiTooltip text="Top Tooltip" position="top">
        <UiButton label="Hover Top" />
      </UiTooltip>

      <!-- Bottom -->
      <UiTooltip text="Bottom Tooltip" position="bottom" color="cyan">
        <UiButton label="Hover Bottom" />
      </UiTooltip>

      <!-- Right -->
      <UiTooltip text="Right Tooltip" position="right" color="emerald">
        <UiButton label="Hover Right" />
      </UiTooltip>

      <!-- Left -->
      <UiTooltip text="Left Tooltip" position="left" color="rose">
        <UiButton label="Hover Left" />
      </UiTooltip>

      <!-- Start -->
      <UiTooltip text="Start Tooltip" position="start" color="emerald">
        <UiButton label="Hover Start" />
      </UiTooltip>

      <!-- End -->
      <UiTooltip text="End Tooltip" position="end" color="rose">
        <UiButton label="Hover End" />
      </UiTooltip>

      <!-- Click Trigger -->
      <UiTooltip text="Click me to toggle" trigger="click" color="amber">
        <UiButton label="Click Tooltip" />
      </UiTooltip>

      <!-- Focus Trigger -->
      <UiTooltip text="Focus to show" trigger="focus" color="indigo">
        <input
            type="text"
            placeholder="Focus me"
            class="px-3 py-2 rounded-lg bg-white/10 border border-white/20 outline-none focus:ring-2 ring-indigo-500/40 text-gray-200 placeholder-gray-500"
        />
      </UiTooltip>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
