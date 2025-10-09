<script setup lang="ts">
import UiCard from '~/components/Ui/Common/UiCard.vue'
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Card Component Examples</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <UiCard title="Basic Card">
        <p>This is a simple card with body content.</p>
      </UiCard>

      <UiCard title="Gradient Card" gradient>
        <p>Use gradient mode for visual hierarchy.</p>
      </UiCard>

      <UiCard title="Interactive Hover" hoverable>
        <p>Hover to see elevation effect.</p>
      </UiCard>

      <UiCard title="With Footer" footer>
        <template #footer>
          <div class="flex justify-end">
            <button class="px-4 py-2 text-sm bg-white/10 rounded-lg text-white hover:bg-white/20">OK</button>
          </div>
        </template>
      </UiCard>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
