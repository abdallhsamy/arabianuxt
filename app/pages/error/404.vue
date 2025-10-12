<script setup lang="ts">
import { Home, MapPin } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-black via-gray-900 to-gray-950 text-gray-100">
    <div class="max-w-md p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">
      <h1 class="text-8xl font-extrabold text-fuchsia-400 mb-4">{{ t('pages.error.404.title') }}</h1>
      <h2 class="text-xl font-semibold mb-2">{{ t('pages.error.404.pageNotFound') }}</h2>
      <p class="text-gray-400 mb-8">
        {{ t('pages.error.404.description') }}
      </p>

      <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-lg text-white font-semibold hover:opacity-90 transition"
      >
        <Home class="w-4 h-4" /> {{ t('pages.error.404.goHome') }}
      </NuxtLink>
    </div>
  </section>
</template>
