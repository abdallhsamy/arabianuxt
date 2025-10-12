<script setup lang="ts">
import { ref, computed } from 'vue'
import { Globe } from 'lucide-vue-next'
import {type AvailableLocale, AvailableLocales} from '~~/i18n/config'

const { locale, locales, setLocale } = useI18n()
const openDropdown = ref(false)

const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
});

const availableLocales = computed(() => {
  return locales.value.filter(l => l.code !== locale.value)
})

const localeNames = {
  [AvailableLocales.English]: 'English',
  [AvailableLocales.Arabic]: 'العربية'
}

const switchLanguage = async (localeCode: string) => {
  await setLocale(<AvailableLocale>localeCode)
  openDropdown.value = false
}

const toggleDropdown = () => {
  openDropdown.value = !openDropdown.value
}

const closeDropdown = () => {
  openDropdown.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', closeDropdown)
})

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown)
})
</script>

<template>
  <div class="relative" @click.stop="toggleDropdown">
    <button
      class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-2"
      :title="$t('common.language')"
    >
      <Globe class="w-5 h-5" />
      <span class="hidden sm:block text-sm font-medium">
        {{ localeNames[currentLocale?.code as AvailableLocale] }}
      </span>
    </button>

    <transition name="fade">
      <div
        v-if="openDropdown"
        class="absolute right-0 mt-2 w-48 rounded-2xl bg-[rgba(15,17,23,0.95)] border border-white/10 shadow-xl py-2 z-50"
      >
        <div class="px-3 py-2 text-xs text-gray-400 font-medium uppercase tracking-wide">
          {{ $t('common.selectLanguage') }}
        </div>
        
        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="flex items-center w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-white/5 gap-3 transition-colors"
          @click="switchLanguage(loc.code)"
        >
          <span>{{ localeNames[loc.code] }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
