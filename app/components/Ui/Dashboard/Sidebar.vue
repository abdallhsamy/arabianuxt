<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { Home, BarChart3, Users, Settings, Crown } from 'lucide-vue-next';
import { useRouter, useRoute } from '#imports';

const router = useRouter();
const route = useRoute();

const isExpanded = ref(false);
const isMobile = ref(false);

const checkViewport = (): void => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkViewport();
  window.addEventListener('resize', checkViewport);
});

const toggleSidebar = (): void => {
  isExpanded.value = !isExpanded.value;
};

const menuItems = [
  { icon: Home, label: 'Dashboard', to: '/dashboard' },
  { icon: BarChart3, label: 'Analytics', to: '/dashboard/analytics' },
  { icon: Users, label: 'Users', to: '/dashboard/users' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
];

const mainMargin = computed(() =>
    isMobile.value ? '0' : isExpanded.value ? '14rem' : '4rem'
);

onMounted(() => {
  const main = document.querySelector('#main') as HTMLElement | null
  if (main) main.style.marginLeft = mainMargin.value
});

watch(mainMargin, (val) => {
  const main = document.querySelector('#main') as HTMLElement | null
  if (main) main.style.marginLeft = val
});

const navigate = (to: string): void => {
  router.push(to);
};
</script>

<template>
  <!-- 🧭 Desktop Sidebar -->
  <aside
      v-if="!isMobile"
      class="fixed top-6 left-6 z-50 flex flex-col items-center rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
      :class="[
          // h-[calc(100vh-3rem)]
      isExpanded ? 'w-56' : 'w-16',
      'bg-gradient-to-br from-[#0f0f11]/95 via-[#141417]/95 to-[#0a0a0c]/95'
    ]"
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
  >
    <!-- Header -->
    <div class="flex items-center justify-between w-full p-3 border-b border-white/10">
      <span
          class="font-bold text-lg whitespace-nowrap transition-opacity duration-300 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400"
          :class="isExpanded ? 'opacity-100' : 'opacity-0 hidden'"
      >
        Dashboard
      </span>
      <button
          class="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-300"
          :class="!isExpanded && 'mx-auto'"
          @click="toggleSidebar"
      >
        <Settings class="w-5 h-5" />
      </button>
    </div>

    <!-- Nav -->
    <nav class="flex flex-col w-full mt-2">
      <button
          v-for="item in menuItems"
          :key="item.label"
          class="relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group overflow-hidden"
          :class="!isExpanded && 'mx-auto'"
          @click="navigate(item.to)"
      >
        <!-- Active Glow Border -->
        <div
            v-if="route.path === item.to"
            class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-40 blur-md animate-gradient-flow"
        />

        <!-- Icon -->
        <component
            :is="item.icon"
            class="w-5 h-5 shrink-0 z-10 transition-all duration-300"
            :class="route.path === item.to
            ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
            : 'text-gray-400 group-hover:text-fuchsia-400 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'"
        />

        <!-- Label -->
        <span
            class="z-10 font-medium text-sm transition-opacity duration-300"
            :class="[
            isExpanded ? 'opacity-100' : 'opacity-0 hidden',
            route.path === item.to ? 'text-white' : 'text-gray-400'
          ]"
        >
          {{ item.label }}
        </span>
      </button>
    </nav>

    <!-- Upgrade -->
    <div class="mt-auto mb-3 w-full px-3 flex justify-center z-10">
      <button
          class="relative flex items-center justify-center w-full gap-2 overflow-hidden rounded-xl transition-all duration-300"
          :class="isExpanded ? 'px-3 py-2' : 'p-3 aspect-square'"
      >
        <!-- Animated Gradient Background -->
        <span
            class="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 opacity-90 animate-gradient-flow"
        />
        <span class="absolute inset-0 bg-black/50"/>

        <Crown v-if="!isExpanded" class="w-5 h-5 text-white z-10" />
        <template v-else>
          <Crown class="w-4 h-4 text-white z-10" />
          <span class="text-sm font-semibold text-white z-10">Upgrade</span>
        </template>
      </button>
    </div>
  </aside>

  <!-- 📱 Mobile Bottom Nav -->
  <nav
      v-else
      class="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-lg bg-gradient-to-t from-[#0a0a0c]/90 to-[#141417]/90 flex justify-around items-center py-2 border-t border-white/10"
  >
    <button
        v-for="item in menuItems"
        :key="item.label"
        class="flex flex-col items-center gap-1 transition-all duration-300"
        :class="[
        route.path === item.to
          ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'
          : 'text-gray-400 hover:text-fuchsia-400 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'
      ]"
        @click="navigate(item.to)"
    >
      <component :is="item.icon" class="w-5 h-5" />
      <span class="text-xs">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
/* 🌀 Smooth gradient animation */
@keyframes gradient-flow {
  0% { background-position: 0 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0 50%; }
}
.animate-gradient-flow {
  background-size: 200% 200%;
  animation: gradient-flow 6s ease infinite;
}
</style>
