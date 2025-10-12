<script setup lang="ts">
import { Wrench, Clock } from 'lucide-vue-next'
definePageMeta({ layout: 'empty' })

const { t } = useI18n()

</script>

<template>
  <section class="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-fuchsia-950 via-gray-950 to-black text-gray-100">
    <div class="max-w-md p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg">
      <Wrench class="w-16 h-16 text-fuchsia-400 mb-4 mx-auto" />
      <h1 class="text-3xl font-bold mb-2">{{ t('pages.error.maintenance.title') }}</h1>
      <p class="text-gray-400 mb-6">
        {{ t('pages.error.maintenance.description') }}<br />
        {{ t('pages.error.maintenance.checkBack') }}
      </p>
      <div class="flex justify-center items-center gap-2 text-sm text-gray-500">
        <Clock class="w-4 h-4" />
        {{ t('pages.error.maintenance.lastUpdated') }}: {{ new Date().toLocaleString() }}
      </div>
    </div>
  </section>
</template>
