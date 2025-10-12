<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Bell, Search, User, LogOut, Lock, Settings, Github, Linkedin } from 'lucide-vue-next'
import { useSidebar } from '~/composables/useSidebar'
import LanguageSwitcher from '~/components/Ui/Common/LanguageSwitcher.vue'
import { useI18n } from 'vue-i18n'
import { LanguageDirections } from '~~/i18n/config'

const search = ref('')
const openNotifs = ref(false)
const openProfile = ref(false)

// Use shared sidebar state
const { isExpanded, isMobile, checkViewport } = useSidebar()

// RTL support
const { locale } = useI18n()
const isRTL = computed(() => LanguageDirections[locale.value as keyof typeof LanguageDirections] === 'rtl')

onMounted(() => {
  checkViewport();
  window.addEventListener('resize', checkViewport);
});

// Calculate topbar positioning based on sidebar state and RTL
const topbarPosition = computed(() => {
  if (isMobile.value) return { left: '50%', right: 'auto', transform: 'translateX(-50%)' };
  
  if (isRTL.value) {
    return {
      left: 'auto',
      right: isExpanded.value ? 'calc(14rem + 2rem)' : 'calc(4rem + 2rem)',
      transform: 'none'
    };
  } else {
    return {
      left: isExpanded.value ? 'calc(14rem + 2rem)' : 'calc(4rem + 2rem)',
      right: 'auto',
      transform: 'none'
    };
  }
});

const topbarWidth = computed(() => {
  if (isMobile.value) return 'calc(100% - 4rem)';
  return isExpanded.value ? 'calc(100% - 14rem - 4rem)' : 'calc(100% - 4rem - 4rem)';
});

const notifs = ref([
  { id: 1, text: 'New user signed up', time: '2m ago' },
  { id: 2, text: 'System backup complete', time: '1h ago' },
  { id: 3, text: 'Payment received', time: '2h ago' },
])

const toggleDropdown = (type: 'notif' | 'profile'): void => {
  if (type === 'notif') {
    openNotifs.value = !openNotifs.value
    openProfile.value = false
  } else {
    openProfile.value = !openProfile.value
    openNotifs.value = false
  }
}

const closeAll = (): void => {
  openNotifs.value = false
  openProfile.value = false
}

onMounted(() => document.addEventListener('click', closeAll))
onUnmounted(() => document.removeEventListener('click', closeAll))
</script>

<template>

  <header
      class="fixed top-6 z-10 transition-all duration-500
           bg-[rgba(15,17,23,0.65)] backdrop-blur-2xl border border-white/10
           rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.1)]
           flex items-center justify-between px-6 py-3
           bg-gradient-to-br from-[rgba(139,92,246,0.08)] via-[rgba(236,72,153,0.08)] to-[rgba(34,211,238,0.08)]
           hover:shadow-[0_0_50px_rgba(236,72,153,0.2)]"
      :style="{
        left: topbarPosition.left,
        right: topbarPosition.right,
        transform: topbarPosition.transform,
        width: topbarWidth
      }"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3" :class="isRTL && 'flex-row-reverse'">
      <div
          class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center text-white font-bold"
      >
        A
      </div>
      <span class="text-white font-semibold tracking-wide hidden sm:block">{{ $t("common.appName") }}</span>
    </div>

    <!-- Search -->
    <div class="relative flex-1 max-w-xs mx-6 hidden md:flex">
      <Search class="w-4 h-4 text-gray-400 absolute top-1/2 -translate-y-1/2" :class="isRTL ? 'right-3' : 'left-3'" />
      <input
          v-model="search"
          placeholder="Search…"
          class="w-full py-1.5 rounded-xl bg-white/5 text-gray-200 border border-white/10
               focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 text-sm"
          :class="isRTL ? 'pr-9 pl-3' : 'pl-9 pr-3'"
      />
    </div>

    <!-- Right icons -->
    <div class="flex items-center gap-4 relative">
      <!-- Social Icons -->
      <div class="flex items-center gap-2">
        <a
            href="https://github.com/abdallhsamy/arabianuxt"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="GitHub"
        >
          <Github class="w-5 h-5" />
        </a>
        <a
            href="https://www.linkedin.com/in/abdallah-samy/"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="LinkedIn"
        >
          <Linkedin class="w-5 h-5" />
        </a>
      </div>

      <!-- Language Switcher -->
      <LanguageSwitcher />

      <!-- Notifications -->
      <div class="relative" @click.stop="toggleDropdown('notif')">
        <button
            class="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 relative"
        >
          <Bell class="w-5 h-5" />
          <span
              v-if="notifs.length"
              class="absolute -top-0.5 -right-0.5 h-2 w-2 bg-fuchsia-500 rounded-full"
          />
        </button>

        <transition name="fade">
          <div
              v-if="openNotifs"
              class="absolute mt-2 w-72 rounded-2xl bg-[rgba(15,17,23,0.95)] border border-white/10 shadow-xl p-3 space-y-2"
              :class="isRTL ? 'left-0' : 'right-0'"
          >
            <h3 class="text-white text-sm font-semibold mb-1">Notifications</h3>
            <div
                v-for="n in notifs"
                :key="n.id"
                class="p-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm"
            >
              <p>{{ n.text }}</p>
              <span class="text-[11px] text-gray-500">{{ n.time }}</span>
            </div>
          </div>
        </transition>
      </div>

      <!-- Profile -->
      <div class="relative" @click.stop="toggleDropdown('profile')">
        <button
            class="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white flex items-center justify-center font-semibold"
        >
          <User class="w-4 h-4" />
        </button>

        <transition name="fade">
          <div
              v-if="openProfile"
              class="absolute mt-2 w-44 rounded-2xl bg-[rgba(15,17,23,0.95)] border border-white/10 shadow-xl py-2"
              :class="isRTL ? 'left-0' : 'right-0'"
          >
            <button
                class="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-white/5 gap-2"
                :class="isRTL ? 'text-right flex-row-reverse' : 'text-left'"
                @click="$emit('settings')"
            >
              <Settings class="w-4 h-4 text-indigo-400" /> Settings
            </button>
            <button
                class="flex items-center w-full px-4 py-2 text-sm text-gray-200 hover:bg-white/5 gap-2"
                :class="isRTL ? 'text-right flex-row-reverse' : 'text-left'"
                @click="$emit('lock')"
            >
              <Lock class="w-4 h-4 text-cyan-400" /> Lock
            </button>
            <hr class="border-white/10 my-1" />
            <button
                class="flex items-center w-full px-4 py-2 text-sm text-rose-400 hover:bg-white/5 gap-2"
                :class="isRTL ? 'text-right flex-row-reverse' : 'text-left'"
                @click="$emit('logout')"
            >
              <LogOut class="w-4 h-4" /> Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </header>
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
