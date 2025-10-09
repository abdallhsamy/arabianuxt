<script setup lang="ts">
import UiCard from '~/components/Ui/Common/UiCard.vue'
import UiButton from '~/components/Ui/Common/UiButton.vue'
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Card Component Examples</h1>

    <!-- Glass Variant -->
    <UiCard title="Glass Variant" subtitle="Default dashboard panel">
      <p>
        This is the default <strong>glass-style card</strong> with a subtle transparent background.
        It’s great for dashboard widgets and stats.
      </p>
      <template #footer>
        <UiButton label="View Details" variant="primary" />
      </template>
    </UiCard>

    <!-- Solid Variant -->
    <UiCard title="Solid Variant" subtitle="Opaque background" variant="solid" color="cyan">
      <p>
        The solid variant provides a high-contrast opaque background — great for text-heavy sections.
      </p>
    </UiCard>

    <!-- Gradient Variant -->
    <UiCard title="Gradient Variant" variant="gradient" color="emerald">
      <p class="text-white">
        The gradient variant features a dynamic background from your accent colors.
      </p>
    </UiCard>

    <!-- Outlined Variant -->
    <UiCard title="Outlined Variant" variant="outlined" color="rose">
      <p>
        The outlined variant is subtle, lightweight, and perfect for nested containers.
      </p>
    </UiCard>

    <!-- With Custom Header & Footer -->
    <UiCard>
      <template #header>
        <div class="flex items-center justify-between w-full">
          <h3 class="text-gray-100 font-semibold">Custom Header</h3>
          <UiButton label="Action" size="sm" variant="outline" />
        </div>
      </template>

      <p>
        You can fully customize the header and footer using named slots for ultimate flexibility.
      </p>

      <template #footer>
        <UiButton label="Cancel" variant="outline" />
        <UiButton label="Confirm" variant="success" />
      </template>
    </UiCard>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
