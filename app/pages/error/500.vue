<script setup lang="ts">
import { RefreshCcw, ServerCrash } from 'lucide-vue-next'

const { t } = useI18n()

const refreshPage = () => {
  if (import.meta.client) {
    window.location.reload()
  }
}
</script>

<template>
  <section class="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100">
    <div class="max-w-md p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">
      <ServerCrash class="w-16 h-16 text-rose-500 mb-4 mx-auto" />
      <h1 class="text-5xl font-bold text-rose-400 mb-2">500</h1>
      <p class="text-gray-400 mb-6">
        {{ t('pages.error.500.description') }}<br />
        {{ t('pages.error.500.tryAgain') }}
      </p>
      <button
          class="flex items-center gap-2 px-5 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white transition"
          @click="refreshPage"
      >
        <RefreshCcw class="w-4 h-4" /> {{ t('pages.error.500.refreshPage') }}
      </button>
    </div>
  </section>
</template>
