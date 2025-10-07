<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
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

// Apply live margin to main tag globally
onMounted(() => {
  const main = document.querySelector('#main') as HTMLElement | null;
  if (main) main.style.marginLeft = mainMargin.value;
});
watch(mainMargin, (val) => {
  const main = document.querySelector('#main') as HTMLElement | null;
  if (main) main.style.marginLeft = val;
});

const navigate = (to: string): void => router.push(to);
</script>

<template>
  <!-- 🧭 Desktop Sidebar -->
  <aside
      v-if="!isMobile"
      class="fixed top-6 left-6 z-50 flex flex-col items-center rounded-2xl bg-glass transition-all duration-300 shadow-xl overflow-hidden"
      :class="[
    isExpanded ? 'w-56' : 'w-16',
    // 'h-[calc(100vh-3rem)]'
  ]"
      @mouseenter="isExpanded = true"
      @mouseleave="isExpanded = false"
  >
    <!-- Header -->
    <div class="flex items-center justify-between w-full p-3">
      <span
          class="text-gradient font-bold text-lg whitespace-nowrap transition-opacity duration-300"
          :class="isExpanded ? 'opacity-100' : 'opacity-0 hidden'"
      >
        Dashboard
      </span>
      <button
          class="text-gray-400 hover:text-white"
          :class="!isExpanded ? 'mx-auto' : ''"
          @click="toggleSidebar">
        <Settings class="w-5 h-5" />
      </button>
    </div>

    <div class="border-t border-[var(--border)] w-full opacity-50"></div>

    <!-- Navigation -->
    <nav class="flex flex-col w-full mt-2">
      <button
          v-for="item in menuItems"
          :key="item.label"
          class="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:bg-[var(--overlay)] hover:text-white"
          :class="[
          route.path === item.to
            ? 'text-white bg-[var(--overlay)] border-l-2 border-indigo-500'
            : 'text-[var(--text-secondary)]',
            !isExpanded ? 'mx-auto' : '',
        ]"
          @click="navigate(item.to)"

      >
        <component
            :is="item.icon"
            class="w-5 h-5 shrink-0"
        />
        <span
            class="font-medium text-sm transition-opacity duration-200"
            :class="isExpanded ? 'opacity-100' : 'opacity-0 hidden'"
        >
          {{ item.label }}
        </span>
      </button>
    </nav>

    <!-- Upgrade -->
    <div class="mt-auto pt-3 mb-3 w-full px-3 flex justify-center">
      <button
          class="btn-primary flex items-center justify-center w-full gap-2"
          :class="isExpanded ? 'px-3 py-2' : 'p-3 aspect-square'"
      >
        <Crown v-if="!isExpanded" class="w-5 h-5" />
        <template v-else>
          <Crown class="w-4 h-4" />
          <span class="text-sm font-semibold">Upgrade</span>
        </template>
      </button>
    </div>
  </aside>

  <!-- 📱 Mobile Bottom Nav -->
  <nav
      v-else
      class="fixed bottom-0 left-0 right-0 z-50 bg-glass flex justify-around items-center py-2 border-t border-[var(--border)] backdrop-blur-md"
  >
    <button
        v-for="item in menuItems"
        :key="item.label"
        class="flex flex-col items-center gap-1 transition-colors"
        :class="[
        route.path === item.to
          ? 'text-indigo-400'
          : 'text-[var(--text-secondary)] hover:text-white',
      ]"
        @click="navigate(item.to)"
    >
      <component :is="item.icon" class="w-5 h-5" />
      <span class="text-xs">{{ item.label }}</span>
    </button>
  </nav>
</template>

<style scoped>
aside {
  backdrop-filter: blur(16px);
  background: var(--color-glass);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
nav {
  background: var(--color-glass);
}
</style>
