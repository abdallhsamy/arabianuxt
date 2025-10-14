<script setup lang="ts">
import { useError, clearError, useRoute } from '#app'
import { Home, RefreshCcw, AlertTriangle } from 'lucide-vue-next'

const error = useError()
const route = useRoute()

const status = error.value?.statusCode || 500
const message =
    error.value?.message ||
    (status === 404 ? 'Page Not Found' : 'Something went wrong')

const retry = () => {
  clearError({ redirect: route.fullPath })
}
</script>

<template>
  <section
      class="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100"
  >
    <div
        class="max-w-lg p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
    >
      <div class="text-6xl font-extrabold text-fuchsia-400 mb-2">
        {{ status }}
      </div>
      <p class="text-lg text-gray-300 mb-6">
        {{ message }}
      </p>

      <div class="flex justify-center gap-4">
        <NuxtLink
            to="/"
            class="flex items-center gap-2 px-5 py-2 rounded-md bg-fuchsia-600 hover:bg-fuchsia-700 text-white transition"
            @click="clearError({ redirect: '/' })"
        >
          <Home class="w-4 h-4" /> Home
        </NuxtLink>

        <button
            class="flex items-center gap-2 px-5 py-2 rounded-md bg-white/10 hover:bg-white/15 text-gray-100 transition"
            @click="retry"
        >
          <RefreshCcw class="w-4 h-4" /> Retry
        </button>
      </div>

      <div class="mt-8 text-xs text-gray-500">
        <AlertTriangle class="inline w-4 h-4 me-1" />
        {{ new Date().toLocaleString() }}
      </div>
    </div>
  </section>
</template>
