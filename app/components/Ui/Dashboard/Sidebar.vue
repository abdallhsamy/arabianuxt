<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { 
  Home, BarChart3, Users, Settings, Crown, 
  Activity, Shield, FileText, Zap, Calendar, 
  CreditCard, AlertTriangle, Heart, Plug, 
  BookOpen, ScrollText, Bell, Building2, 
  Lock, User, Sparkles, Palette, 
  HeadphonesIcon, Cog, UserCheck, Eye,
  Square, MousePointer, Edit3, Play, 
  MessageSquare, Mail, Layers, Code, 
  Palette as PaletteIcon, Sliders, 
  Table, Type, ToggleLeft, FileText as FileTextIcon,
  AlertCircle, Badge, CreditCard as CreditCardIcon,
  BarChart, Cpu, Droplets, Grip, 
  Hash, Image, List, Maximize2,
  Minus, Plus, RotateCcw, Search,
  Settings as SettingsIcon, Shield as ShieldIcon,
  Square as SquareIcon, Target, Wrench
} from 'lucide-vue-next';
import { useRouter, useRoute } from '#imports';
import { useSidebar } from '~/composables/useSidebar';

const router = useRouter();
const route = useRoute();

// Use shared sidebar state
const { isExpanded, isMobile, checkViewport, toggleSidebar, setExpanded } = useSidebar();

onMounted(() => {
  checkViewport();
  window.addEventListener('resize', checkViewport);
});

const menuItems = [
  // Main Dashboard
  { icon: Home, label: 'Dashboard', to: '/dashboard' },
  
  // Analytics & Monitoring
  { icon: BarChart3, label: 'Analytics', to: '/dashboard/analytics' },
  { icon: Activity, label: 'Health', to: '/dashboard/health' },
  { icon: ScrollText, label: 'Logs', to: '/dashboard/logs' },
  { icon: AlertTriangle, label: 'Errors', to: '/dashboard/errors' },
  
  // AI & Automation
  { icon: Sparkles, label: 'AI Playground', to: '/dashboard/ai-playground' },
  { icon: Zap, label: 'Assistant', to: '/dashboard/assistant' },
  { icon: BookOpen, label: 'Prompt Library', to: '/dashboard/prompt-library' },
  { icon: Zap, label: 'Automation Rules', to: '/dashboard/automation-rules' },
  
  // Development & Tools
  { icon: Play, label: 'Playground', to: '/dashboard/playground' },
  { icon: Edit3, label: 'Editor', to: '/dashboard/editor' },
  { icon: Square, label: 'Blank', to: '/dashboard/blank' },
  { icon: MessageSquare, label: 'Toaster Demo', to: '/dashboard/toaster-demo' },
  
  // UI Components
  { icon: MousePointer, label: 'Buttons', to: '/dashboard/buttons' },
  { icon: Layers, label: 'Components', to: '/dashboard/components' },
  { icon: Layers, label: 'Components Index', to: '/dashboard/components/index' },
  { icon: AlertCircle, label: 'Alert', to: '/dashboard/components/alert' },
  { icon: Badge, label: 'Badge', to: '/dashboard/components/badge' },
  { icon: CreditCardIcon, label: 'Card', to: '/dashboard/components/card' },
  { icon: BarChart, label: 'Charts', to: '/dashboard/components/charts' },
  { icon: Code, label: 'Dev Tools', to: '/dashboard/components/dev-tools' },
  { icon: Table, label: 'Table', to: '/dashboard/components/table' },
  { icon: Type, label: 'Input', to: '/dashboard/components/input' },
  { icon: ToggleLeft, label: 'Switch', to: '/dashboard/components/switch' },
  { icon: FileTextIcon, label: 'Textarea', to: '/dashboard/components/textarea' },
  { icon: SettingsIcon, label: 'Settings', to: '/dashboard/components/settings' },
  { icon: ShieldIcon, label: 'Security', to: '/dashboard/components/security' },
  { icon: SquareIcon, label: 'Skeleton', to: '/dashboard/components/skeleton' },
  { icon: Target, label: 'Stepper', to: '/dashboard/components/stepper' },
  { icon: Wrench, label: 'Utilities', to: '/dashboard/components/utilities' },
  { icon: Grip, label: 'Widgets', to: '/dashboard/components/widgets' },
  { icon: Droplets, label: 'Advanced UI', to: '/dashboard/components/advanced-ui' },
  { icon: Cpu, label: 'AI Tools', to: '/dashboard/components/ai-tools' },
  { icon: Hash, label: 'Accordion', to: '/dashboard/components/accordion' },
  { icon: Image, label: 'Dropdown', to: '/dashboard/components/dropdown' },
  { icon: List, label: 'Form', to: '/dashboard/components/form' },
  { icon: Maximize2, label: 'Modal', to: '/dashboard/components/modal' },
  { icon: Minus, label: 'Select', to: '/dashboard/components/select' },
  { icon: Plus, label: 'Tabs', to: '/dashboard/components/tabs' },
  { icon: RotateCcw, label: 'Tooltip', to: '/dashboard/components/tooltip' },
  { icon: Search, label: 'Interaction', to: '/dashboard/components/interaction' },
  
  // Communication
  { icon: Mail, label: 'Mail', to: '/dashboard/mail' },
  
  // Security & Access
  { icon: Shield, label: 'Security', to: '/dashboard/security' },
  { icon: UserCheck, label: 'Access Control', to: '/dashboard/access-control' },
  { icon: Eye, label: 'Audit Logs', to: '/dashboard/audit-logs' },
  
  // Team & Organization
  { icon: Users, label: 'Team', to: '/dashboard/team' },
  { icon: Building2, label: 'Organization', to: '/dashboard/organization' },
  { icon: User, label: 'Profile', to: '/dashboard/profile' },
  
  // Support & Communication
  { icon: HeadphonesIcon, label: 'Support', to: '/dashboard/support' },
  { icon: Bell, label: 'Notifications', to: '/dashboard/notifications' },
  { icon: Calendar, label: 'Calendar', to: '/dashboard/calendar' },
  
  // Knowledge & Integrations
  { icon: BookOpen, label: 'Knowledge Base', to: '/dashboard/knowledge-base' },
  { icon: Plug, label: 'Integrations', to: '/dashboard/integrations' },
  
  // System & Settings
  { icon: Cog, label: 'System', to: '/dashboard/system' },
  { icon: Settings, label: 'Settings', to: '/dashboard/settings' },
  { icon: Palette, label: 'Theme Customizer', to: '/dashboard/theme-customizer' },
  { icon: Lock, label: 'Privacy', to: '/dashboard/privacy' },
  { icon: CreditCard, label: 'Billing', to: '/dashboard/billing' },
];

// Group separators for better organization
const menuGroups = [
  { items: menuItems.slice(0, 1), label: 'Main' },
  { items: menuItems.slice(1, 5), label: 'Analytics' },
  { items: menuItems.slice(5, 9), label: 'AI & Automation' },
  { items: menuItems.slice(9, 13), label: 'Development' },
  { items: menuItems.slice(13, 41), label: 'UI Components' },
  { items: menuItems.slice(41, 42), label: 'Communication' },
  { items: menuItems.slice(42, 45), label: 'Security' },
  { items: menuItems.slice(45, 48), label: 'Team' },
  { items: menuItems.slice(48, 51), label: 'Support' },
  { items: menuItems.slice(51, 53), label: 'Knowledge' },
  { items: menuItems.slice(53), label: 'System' },
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
      class="fixed top-6 left-6 z-40 flex flex-col items-center rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.2)] h-[calc(100vh-3rem)]"
      :class="[
      isExpanded ? 'w-56' : 'w-16',
      'bg-gradient-to-br from-[#0f0f11]/95 via-[#141417]/95 to-[#0a0a0c]/95'
    ]"
      @mouseenter="setExpanded(true)"
      @mouseleave="setExpanded(false)"
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
    <nav class="flex flex-col w-full mt-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      <template v-for="group in menuGroups" :key="group.label">
        <!-- Group Separator -->
        <div 
          v-if="isExpanded && group.label !== 'Main'" 
          class="px-3 py-2 mt-2 first:mt-0"
        >
          <div class="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
        </div>
        
        <!-- Group Items -->
        <button
            v-for="item in group.items"
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
      </template>
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
      class="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-lg bg-gradient-to-t from-[#0a0a0c]/90 to-[#141417]/90 flex justify-around items-center py-2 border-t border-white/10 overflow-x-auto"
  >
    <button
        v-for="item in menuItems.slice(0, 8)"
        :key="item.label"
        class="flex flex-col items-center gap-1 transition-all duration-300 min-w-0 flex-shrink-0 px-2"
        :class="[
        route.path === item.to
          ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'
          : 'text-gray-400 hover:text-fuchsia-400 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'
      ]"
        @click="navigate(item.to)"
    >
      <component :is="item.icon" class="w-5 h-5" />
      <span class="text-xs whitespace-nowrap">{{ item.label }}</span>
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
