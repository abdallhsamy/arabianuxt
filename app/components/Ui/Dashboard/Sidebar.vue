<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { 
  Home, BarChart3, Users, Settings, Crown, 
  Activity, Shield, Zap, Calendar,
  CreditCard, AlertTriangle, Plug,
  BookOpen, ScrollText, Bell, Building2, 
  Lock, User, Sparkles, Palette, 
  HeadphonesIcon, Cog, UserCheck, Eye,
  Square, MousePointer, Edit3, Play, 
  MessageSquare, Mail, Layers, Code, 
  Table, Type, ToggleLeft, FileText as FileTextIcon,
  AlertCircle, Badge, CreditCard as CreditCardIcon,
  BarChart, Cpu, Droplets, Grip, 
  Hash, Image, List, Maximize2,
  Minus, Plus, RotateCcw, Search,
  Square as SquareIcon, Target, Wrench,
  LogIn, UserPlus, KeyRound, Lock as LockIcon
} from 'lucide-vue-next';
import { useRouter, useRoute } from '#imports';
import { useSidebar } from '~/composables/useSidebar';
import { useI18n } from 'vue-i18n';
import { LanguageDirections } from '~~/i18n/config';

const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
const { t, locale } = useI18n();

// RTL support
const isRTL = computed(() => LanguageDirections[locale.value as keyof typeof LanguageDirections] === 'rtl');

// Use shared sidebar state
const { isExpanded, isMobile, checkViewport, toggleSidebar, setExpanded } = useSidebar();

onMounted(() => {
  checkViewport();
  window.addEventListener('resize', checkViewport);
});

const menuItems = [
  // Main Dashboard
  { icon: Home, label: t('navigation.dashboard'), to: '/dashboard' },
  
  // Analytics & Monitoring
  { icon: BarChart3, label: t('navigation.analytics'), to: '/dashboard/analytics' },
  { icon: Activity, label: t('navigation.health'), to: '/dashboard/health' },
  { icon: ScrollText, label: t('navigation.logs'), to: '/dashboard/logs' },
  { icon: AlertTriangle, label: t('navigation.errors'), to: '/dashboard/errors' },
  
  // AI & Automation
  { icon: Sparkles, label: t('navigation.aiPlayground'), to: '/dashboard/ai-playground' },
  { icon: Zap, label: t('navigation.assistant'), to: '/dashboard/assistant' },
  { icon: BookOpen, label: t('navigation.promptLibrary'), to: '/dashboard/prompt-library' },
  { icon: Zap, label: t('navigation.automationRules'), to: '/dashboard/automation-rules' },
  
  // Development & Tools
  { icon: Play, label: t('navigation.playground'), to: '/dashboard/playground' },
  { icon: Edit3, label: t('navigation.editor'), to: '/dashboard/editor' },
  { icon: Square, label: t('navigation.blank'), to: '/dashboard/blank' },
  { icon: MessageSquare, label: t('navigation.toasterDemo'), to: '/dashboard/toaster-demo' },
  
  // UI Components
  { icon: MousePointer, label: t('navigation.buttons'), to: '/dashboard/buttons' },
  { icon: Layers, label: t('navigation.components'), to: '/dashboard/components' },
  { icon: AlertCircle, label: t('navigation.alert'), to: '/dashboard/components/alert' },
  { icon: Badge, label: t('navigation.badge'), to: '/dashboard/components/badge' },
  { icon: CreditCardIcon, label: t('navigation.card'), to: '/dashboard/components/card' },
  { icon: BarChart, label: t('navigation.charts'), to: '/dashboard/components/charts' },
  { icon: Code, label: t('navigation.devTools'), to: '/dashboard/components/dev-tools' },
  { icon: Table, label: t('navigation.table'), to: '/dashboard/components/table' },
  { icon: Type, label: t('navigation.input'), to: '/dashboard/components/input' },
  { icon: ToggleLeft, label: t('navigation.switch'), to: '/dashboard/components/switch' },
  { icon: FileTextIcon, label: t('navigation.textarea'), to: '/dashboard/components/textarea' },
  { icon: SquareIcon, label: t('navigation.skeleton'), to: '/dashboard/components/skeleton' },
  { icon: Target, label: t('navigation.stepper'), to: '/dashboard/components/stepper' },
  { icon: Wrench, label: t('navigation.utilities'), to: '/dashboard/components/utilities' },
  { icon: Grip, label: t('navigation.widgets'), to: '/dashboard/components/widgets' },
  { icon: Droplets, label: t('navigation.advancedUi'), to: '/dashboard/components/advanced-ui' },
  { icon: Cpu, label: t('navigation.aiTools'), to: '/dashboard/components/ai-tools' },
  { icon: Hash, label: t('navigation.accordion'), to: '/dashboard/components/accordion' },
  { icon: Image, label: t('navigation.dropdown'), to: '/dashboard/components/dropdown' },
  { icon: List, label: t('navigation.form'), to: '/dashboard/components/form' },
  { icon: Maximize2, label: t('navigation.modal'), to: '/dashboard/components/modal' },
  { icon: Minus, label: t('navigation.select'), to: '/dashboard/components/select' },
  { icon: Plus, label: t('navigation.tabs'), to: '/dashboard/components/tabs' },
  { icon: RotateCcw, label: t('navigation.tooltip'), to: '/dashboard/components/tooltip' },
  { icon: Search, label: t('navigation.interaction'), to: '/dashboard/components/interaction' },
  
  // Communication
  { icon: Mail, label: t('navigation.mail'), to: '/dashboard/mail' },
  
  // Security & Access
  { icon: Shield, label: t('navigation.security'), to: '/dashboard/security' },
  { icon: UserCheck, label: t('navigation.accessControl'), to: '/dashboard/access-control' },
  { icon: Eye, label: t('navigation.auditLogs'), to: '/dashboard/audit-logs' },
  
  // Team & Organization
  { icon: Users, label: t('navigation.team'), to: '/dashboard/team' },
  { icon: Building2, label: t('navigation.organization'), to: '/dashboard/organization' },
  { icon: User, label: t('navigation.profile'), to: '/dashboard/profile' },
  
  // Support & Communication
  { icon: HeadphonesIcon, label: t('navigation.support'), to: '/dashboard/support' },
  { icon: Bell, label: t('navigation.notifications'), to: '/dashboard/notifications' },
  { icon: Calendar, label: t('navigation.calendar'), to: '/dashboard/calendar' },
  
  // Knowledge & Integrations
  { icon: BookOpen, label: t('navigation.knowledgeBase'), to: '/dashboard/knowledge-base' },
  { icon: Plug, label: t('navigation.integrations'), to: '/dashboard/integrations' },
  
  // System & Settings
  { icon: Cog, label: t('navigation.system'), to: '/dashboard/system' },
  { icon: Settings, label: t('navigation.settings'), to: '/dashboard/components/settings' },
  { icon: Palette, label: t('navigation.themeCustomizer'), to: '/dashboard/theme-customizer' },
  { icon: Lock, label: t('navigation.privacy'), to: '/dashboard/privacy' },
  { icon: CreditCard, label: t('navigation.billing'), to: '/dashboard/billing' },
  
  // Authentication
  { icon: LogIn, label: t('navigation.login'), to: '/login' },
  { icon: UserPlus, label: t('navigation.register'), to: '/register' },
  { icon: KeyRound, label: t('navigation.forgotPassword'), to: '/forgot-password' },
  { icon: KeyRound, label: t('navigation.resetPassword'), to: '/reset-password' },
  { icon: LockIcon, label: t('navigation.locked'), to: '/locked' },
  { icon: LockIcon, label: t('navigation.lockedV2'), to: '/locked-v2' },
];

// Group separators for better organization
const menuGroups = [
  { items: menuItems.slice(0, 1), label: t('navigation.main') },
  { items: menuItems.slice(1, 5), label: t('navigation.analytics') },
  { items: menuItems.slice(5, 9), label: t('navigation.aiAutomation') },
  { items: menuItems.slice(9, 13), label: t('navigation.development') },
  { items: menuItems.slice(13, 41), label: t('navigation.uiComponents') },
  { items: menuItems.slice(41, 42), label: t('navigation.communication') },
  { items: menuItems.slice(42, 45), label: t('navigation.security') },
  { items: menuItems.slice(45, 48), label: t('navigation.team') },
  { items: menuItems.slice(48, 51), label: t('navigation.support') },
  { items: menuItems.slice(51, 53), label: t('navigation.knowledge') },
  { items: menuItems.slice(53, 59), label: t('navigation.system') },
  { items: menuItems.slice(59), label: t('navigation.authentication') },
];

const mainMargin = computed(() => {
  if (isMobile.value) return '0';
  return isRTL.value 
    ? (isExpanded.value ? '14rem' : '4rem')
    : (isExpanded.value ? '14rem' : '4rem');
});

onMounted(() => {
  const main = document.querySelector('#main') as HTMLElement | null
  if (main) {
    if (isRTL.value) {
      main.style.marginRight = mainMargin.value
      main.style.marginLeft = '0'
    } else {
      main.style.marginLeft = mainMargin.value
      main.style.marginRight = '0'
    }
  }
});

watch([mainMargin, isRTL], ([val, rtl]) => {
  const main = document.querySelector('#main') as HTMLElement | null
  if (main) {
    if (rtl) {
      main.style.marginRight = val
      main.style.marginLeft = '0'
    } else {
      main.style.marginLeft = val
      main.style.marginRight = '0'
    }
  }
});

const navigate = (to: string): void => {
  router.push(to);
};
</script>

<template>
  <!-- 🧭 Desktop Sidebar -->
  <aside
      v-if="!isMobile"
      class="fixed top-6 z-40 flex flex-col items-center rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(139,92,246,0.2)] h-[calc(100vh-3rem)]"
      :class="[
      isExpanded ? 'w-56' : 'w-16',
      'bg-gradient-to-br from-[#0f0f11]/95 via-[#141417]/95 to-[#0a0a0c]/95',
      isRTL ? 'right-6' : 'left-6'
    ]"
      @mouseenter="setExpanded(true)"
      @mouseleave="setExpanded(false)"
  >
    <!-- Header -->
    <div class="flex items-center w-full p-3 border-b border-white/10" :class="isRTL ? 'flex-row-reverse' : 'justify-between'">
      <span
          class="font-bold text-lg whitespace-nowrap transition-opacity duration-300 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400"
          :class="isExpanded ? 'opacity-100' : 'opacity-0 hidden'"
      >
        {{ t('common.dashboard') }}
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
            :class="[
              !isExpanded && 'mx-auto',
              isRTL && 'flex-row-reverse'
            ]"
            @click="navigate(localePath(item.to))"
        >
          <!-- Active Glow Border -->
          <div
              v-if="route.path === localePath(item.to)"
              class="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-40 blur-md animate-gradient-flow"
          />

          <!-- Icon -->
          <component
              :is="item.icon"
              class="w-5 h-5 shrink-0 z-10 transition-all duration-300"
              :class="route.path === localePath(item.to)
              ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]'
              : 'text-gray-400 group-hover:text-fuchsia-400 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'"
          />

          <!-- Label -->
          <span
              class="z-10 font-medium text-sm transition-opacity duration-300"
              :class="[
              isExpanded ? 'opacity-100' : 'opacity-0 hidden',
              route.path === localePath(item.to) ? 'text-white' : 'text-gray-400'
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
          :class="[
            isExpanded ? 'px-3 py-2' : 'p-3 aspect-square',
            isRTL && 'flex-row-reverse'
          ]"
      >
        <!-- Animated Gradient Background -->
        <span
            class="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 opacity-90 animate-gradient-flow"
        />
        <span class="absolute inset-0 bg-black/50"/>

        <Crown v-if="!isExpanded" class="w-5 h-5 text-white z-10" />
        <template v-else>
          <Crown class="w-4 h-4 text-white z-10" />
          <span class="text-sm font-semibold text-white z-10">{{ t('common.upgrade') }}</span>
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
        route.path === localePath(item.to)
          ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]'
          : 'text-gray-400 hover:text-fuchsia-400 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]'
      ]"
        @click="navigate(localePath(item.to))"
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
