<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, LayoutDashboard, Settings, Bell, Star } from 'lucide-vue-next'

export interface NavItem {
  label: string
  icon?: any
  to?: string
  badge?: string | number
  children?: NavItem[]
}

export interface UiSidebarAdvancedProps {
  items: NavItem[]
  expanded?: boolean
}

const props = withDefaults(defineProps<UiSidebarAdvancedProps>(), {
  items: () => [],
  expanded: true,
})

const isExpanded = ref(props.expanded)
const toggle = (): void => { isExpanded.value = !isExpanded.value }

const baseCls = 'fixed z-40 top-4 left-4 h-[calc(100vh-2rem)] rounded-2xl bg-black/50 backdrop-blur-xl border border-white/10 shadow-2xl'
const wCls = computed(() => isExpanded.value ? 'w-64' : 'w-18')
const openMap = ref<Record<string, boolean>>({})

const toggleGroup = (key: string): void => { openMap.value[key] = !openMap.value[key] }

const renderIcon = (icon: any) => icon || LayoutDashboard
</script>

<template>
  <aside :class="[baseCls, wCls, 'flex flex-col']" role="navigation" aria-label="Sidebar">
    <!-- Header -->
    <div class="flex items-center justify-between px-3 py-3 border-b border-white/10">
      <div class="flex items-center gap-2">
        <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-fuchsia-500/40 to-cyan-500/40" />
        <span v-if="isExpanded" class="text-gray-100 font-semibold">Dashboard</span>
      </div>
      <button class="rounded-lg border border-white/10 bg-white/5 text-gray-200 px-2 py-1" @click="toggle">
        {{ isExpanded ? '⟨' : '⟩' }}
      </button>
    </div>

    <!-- Items -->
    <nav class="p-2 flex-1 overflow-y-auto">
      <ul class="space-y-1">
        <li v-for="(it, i) in props.items" :key="i">
          <!-- Simple link -->
          <NuxtLink
              v-if="!it.children?.length"
              :to="it.to || '#'"
              class="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 text-gray-200"
          >
            <component :is="renderIcon(it.icon)" class="w-4 h-4 text-gray-400" />
            <span v-if="isExpanded" class="flex-1 truncate">{{ it.label }}</span>
            <span v-if="isExpanded && it.badge" class="text-xs rounded-md bg-white/10 border border-white/10 px-1.5 py-0.5">{{ it.badge }}</span>
          </NuxtLink>

          <!-- Group -->
          <div v-else class="px-1">
            <button
                class="w-full flex items-center gap-3 px-2.5 py-2 rounded-lg hover:bg-white/10 text-gray-200"
                @click="toggleGroup(it.label)"
            >
              <component :is="renderIcon(it.icon)" class="w-4 h-4 text-gray-400" />
              <span v-if="isExpanded" class="flex-1 text-left">{{ it.label }}</span>
              <ChevronDown v-if="isExpanded" class="w-4 h-4 transition" :class="{ 'rotate-180': openMap[it.label] }" />
            </button>
            <transition name="fade">
              <ul
                  v-if="openMap[it.label] && isExpanded"
                  class="ms-7 mt-1 space-y-1 border-l border-white/10 pl-3"
              >
                <li v-for="(ch, j) in it.children" :key="j">
                  <NuxtLink :to="ch.to || '#'" class="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300">
                    <component :is="renderIcon(ch.icon)" class="w-3.5 h-3.5 text-gray-500" />
                    <span class="truncate">{{ ch.label }}</span>
                    <span v-if="ch.badge" class="ms-auto text-[10px] rounded bg-white/10 px-1.5 border border-white/10">{{ ch.badge }}</span>
                  </NuxtLink>
                </li>
              </ul>
            </transition>
          </div>
        </li>
      </ul>
    </nav>

    <!-- Footer -->
    <div class="mt-auto p-2 border-t border-white/10">
      <NuxtLink to="/upgrade" class="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10">
        <Star class="w-4 h-4 text-amber-300" />
        <span v-if="isExpanded" class="text-gray-100">Upgrade</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:all .2s ease}
.fade-enter-from,.fade-leave-to{opacity:0; transform: translateY(-4px)}
</style>
