<script setup lang="ts">
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

const components = [
  { name: t('pages.components.componentsList.button.name'), path: '/dashboard/components/button', desc: t('pages.components.componentsList.button.desc') },
  { name: t('pages.components.componentsList.input.name'), path: '/dashboard/components/input', desc: t('pages.components.componentsList.input.desc') },
  { name: t('pages.components.componentsList.select.name'), path: '/dashboard/components/select', desc: t('pages.components.componentsList.select.desc') },
  { name: t('pages.components.componentsList.switch.name'), path: '/dashboard/components/switch', desc: t('pages.components.componentsList.switch.desc') },
  { name: t('pages.components.componentsList.card.name'), path: '/dashboard/components/card', desc: t('pages.components.componentsList.card.desc') },
]
</script>

<template>
  <section class="space-y-8">
    <h1 class="page-title">{{ t('pages.components.title') }}</h1>
    <p class="text-gray-400">{{ t('pages.components.subtitle') }}</p>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <NuxtLink
          v-for="c in components"
          :key="c.path"
          :to="c.path"
          class="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all text-white backdrop-blur-xl"
      >
        <h2 class="text-lg font-semibold mb-1">{{ c.name }}</h2>
        <p class="text-gray-400 text-sm">{{ c.desc }}</p>
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
