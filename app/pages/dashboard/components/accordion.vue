<script setup lang="ts">
import UiAccordion from '~/components/Ui/Common/UiAccordion.vue'
import { Info, Settings, Lock } from 'lucide-vue-next'

const faqItems = [
  {
    id: 'privacy',
    title: 'What is our privacy policy?',
    icon: Lock,
    content:
        'We use advanced encryption to secure your data. No third parties can access personal information.',
  },
  {
    id: 'settings',
    title: 'How to change my settings?',
    icon: Settings,
    content:
        'Go to Settings → Preferences to personalize your dashboard experience.',
  },
  {
    id: 'docs',
    title: 'Where can I find more info?',
    icon: Info,
    content:
        'Visit our docs or contact support for further technical details.',
  },
]
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Accordion Component Examples</h1>

    <!-- Vertical -->
    <div>
      <h2 class="section-title">Vertical Variant</h2>
      <UiAccordion :items="faqItems" color="fuchsia" />
    </div>

    <!-- Multiple open vertical -->
    <div>
      <h2 class="section-title">Multiple Vertical</h2>
      <UiAccordion :items="faqItems" multiple color="cyan" />
    </div>

    <!-- Horizontal -->
    <div>
      <h2 class="section-title">Horizontal Variant</h2>
      <UiAccordion :items="faqItems" orientation="horizontal" color="emerald" />
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
.section-title {
  @apply text-lg font-semibold text-gray-300 mb-3;
}
</style>
