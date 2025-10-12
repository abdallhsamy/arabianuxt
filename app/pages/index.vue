<script setup lang="ts">
import { Github, Globe } from 'lucide-vue-next'
import {AvailableLocales, LanguageDirections} from "~~/i18n/config";
const { t, locale, setLocale } = useI18n()

definePageMeta({ layout: 'empty' })

const toggleLocale = (): void => {
  setLocale(locale.value === AvailableLocales.English ? AvailableLocales.Arabic : AvailableLocales.English)
  document.dir = LanguageDirections[locale.value as keyof typeof LanguageDirections]
}

const features = [
  { key: 'nuxt' },
  { key: 'ui' },
  { key: 'ai' },
  { key: 'security' },
  { key: 'typed' },
]
</script>

<template>
  <section
      class="min-h-screen bg-gradient-to-br from-fuchsia-900 via-gray-900 to-black text-gray-100 flex flex-col items-center justify-center px-6 py-24 relative transition-all"
      :dir="$i18n.localeProperties.dir"
  >
    <!-- Language Switch -->
    <button
        class="absolute top-6 right-6 flex items-center gap-2 text-sm bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 hover:bg-white/15 transition"
        @click="toggleLocale"
    >
      <Globe class="w-4 h-4" />
      {{ locale === 'en' ? 'العربية' : 'English' }}
    </button>

    <div class="max-w-4xl text-center space-y-6">
      <h1
          class="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-cyan-400"
      >
        {{ t('public.homePage.title') }}
      </h1>

      <p class="text-lg text-gray-300 max-w-2xl mx-auto">
        {{ t('public.homePage.subtitle') }}
        <br />
        <span class="block pt-1">{{ t('public.homePage.description') }}</span>
      </p>

      <div class="flex justify-center gap-4 pt-2">
        <NuxtLink
            to="/dashboard"
            class="px-6 py-3 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-lg font-semibold hover:opacity-90 transition"
        >
          {{ t('public.homePage.openDashboard') }}
        </NuxtLink>
        <a
            href="https://github.com/abdallhsamy/arabianuxt"
            target="_blank"
            class="flex items-center gap-2 border border-white/10 px-6 py-3 rounded-lg hover:bg-white/10 transition"
        >
          <Github class="w-5 h-5" /> GitHub
        </a>
      </div>

      <!-- Features Grid -->
      <div
          class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 pt-12 text-left transition-all"
          :class="{ 'text-right': locale === 'ar' }"
      >
        <div
            v-for="(f, i) in features"
            :key="i"
            class="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-fuchsia-400/40 hover:bg-white/10 transition"
        >
          <h3 class="font-semibold text-fuchsia-300 mb-1">
            {{ t(`public.homePage.features.${f.key}.title`) }}
          </h3>
          <p class="text-sm text-gray-400">
            {{ t(`public.homePage.features.${f.key}.desc`) }}
          </p>
        </div>
      </div>

      <footer class="pt-16 text-sm text-gray-500">
        {{ t('public.homePage.footer.by', { year: new Date().getFullYear() }) }}
        <a
            href="https://www.linkedin.com/in/abdallah-samy/"
            target="_blank"
            class="hover:text-fuchsia-300 transition"
        >
          {{ t('public.homePage.footer.linkedin') }}
        </a>
        ·
        <a
            href="https://github.com/abdallhsamy"
            target="_blank"
            class="hover:text-cyan-300 transition"
        >
          {{ t('public.homePage.footer.github') }}
        </a>
      </footer>
    </div>
  </section>
</template>
