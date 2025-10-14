<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

// Layout & Nav
import UiSidebarAdvanced from '~/components/Ui/Layout/UiSidebarAdvanced.vue'
import UiTopbar from '~/components/Ui/Layout/UiTopbar.vue'

// Stats
import UiStatsCard from '~/components/Ui/Stats/UiStatsCard.vue'
import UiWidgetContainer from '~/components/Ui/Stats/UiWidgetContainer.vue'

// Charts
import UiChartLine from '~/components/Ui/Charts/UiChartLine.vue'
import UiChartBar from '~/components/Ui/Charts/UiChartBar.vue'
import UiChartDonut from '~/components/Ui/Charts/UiChartDonut.vue'

// Forms
import UiFileUpload from '~/components/Ui/Form/UiFileUpload.vue'
import UiSelectAsync from '~/components/Ui/Form/UiSelectAsync.vue'
import UiTagInput from '~/components/Ui/Form/UiTagInput.vue'

// Feedback
import UiToastAdvanced from '~/components/Ui/Feedback/UiToastAdvanced.vue'
import UiNotificationDrawer from '~/components/Ui/Feedback/UiNotificationDrawer.vue'
import UiCommandPalette from '~/components/Ui/Nav/UiCommandPalette.vue'

import UiBreadcrumb from '~/components/Ui/Nav/UiBreadcrumb.vue'
import UiPagination from '~/components/Ui/Nav/UiPagination.vue'
import UiProgressBar from '~/components/Ui/Data/UiProgressBar.vue'
import UiTimeline from '~/components/Ui/Data/UiTimeline.vue'
import UiConfirmDialog from '~/components/Ui/Feedback/UiConfirmDialog.vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()
const currentPage = ref(1)
const confirmOpen = ref(false)
const events = [
  { title: t('pages.dashboard.events.userRegistered'), description: t('pages.dashboard.events.newUserJoined'), time: '2 min ago' },
  { title: t('pages.dashboard.events.serverDeployed'), description: t('pages.dashboard.events.versionReleased'), time: '10 min ago' },
  { title: t('pages.dashboard.events.paymentReceived'), description: t('pages.dashboard.events.stripeTransaction'), time: '30 min ago' },
]

// -------------------------------------------------------------------
// Sidebar menu items
// -------------------------------------------------------------------
const sidebarItems = [
  { label: t('pages.dashboard.sidebar.overview'), to: '/dashboard' },
  {
    label: t('navigation.analytics'),
    children: [
      { label: t('pages.dashboard.sidebar.traffic'), to: '#' },
      { label: t('pages.dashboard.sidebar.revenue'), to: '#' },
      { label: t('pages.dashboard.sidebar.conversions'), to: '#' },
    ],
  },
  { label: t('navigation.settings'), to: '#' },
]

// -------------------------------------------------------------------
// Stats + charts demo data
// -------------------------------------------------------------------
const stats = [
  { label: t('pages.dashboard.stats.revenue'), value: '$12.4K', delta: 12.3, hint: 'vs last month' },
  { label: t('pages.dashboard.stats.users'), value: '4,832', delta: 3.7, hint: 'new signups' },
  { label: t('pages.dashboard.stats.conversion'), value: '2.9%', delta: -0.4, hint: 'weekly change' },
]

// -------------------------------------------------------------------
// Toasts + notifications + command palette
// -------------------------------------------------------------------
const toastRef = ref<InstanceType<typeof UiToastAdvanced> | null>(null)
const notifications = ref([{ id: '1', title: t('pages.dashboard.events.serverDeployed'), time: '2m ago' }])
const showDrawer = ref(false)
const showCmd = ref(false)

// -------------------------------------------------------------------
// Async Select + TagInput demo bindings
// -------------------------------------------------------------------
const asyncValue = ref<string | number | null>(null)
const tagsValue = ref<string[]>(['Vue', 'Nuxt', 'Tailwind'])

// Async fetcher (simulates backend)
const asyncFetcher = async (q: string) => {
  await new Promise((r) => setTimeout(r, 600))
  return ['Apple', 'Banana', 'Mango', 'Orange']
      .filter((x) => x.toLowerCase().includes(q.toLowerCase()))
      .map((x) => ({ label: x, value: x }))
}

// Toast demo
// onMounted(() => {
//   toastRef.value?.push({ text: 'Welcome back 👋', type: 'success' })
// })

// Command palette demo commands
const commands = [
  {
    id: 'open',
    title: t('pages.dashboard.commands.openNotificationDrawer'),
    run: () => (showDrawer.value = true),
  },
  {
    id: 'toast',
    title: t('pages.dashboard.commands.showToast'),
    run: () => toastRef.value?.push({ text: t('pages.dashboard.commands.actionExecuted'), type: 'info' }),
  },
]
const statistics = [
  { label: t('pages.dashboard.stats.revenue'), value: '$124,000', change: '+12%' },
  { label: t('pages.dashboard.stats.activeUsers'), value: '8,213', change: '+3.8%' },
  { label: t('pages.dashboard.stats.transactions'), value: '42,567', change: '+6.1%' },
  { label: t('pages.dashboard.stats.errors'), value: '24', change: '-1.2%' },
];
</script>

<template>
  <section class="space-y-10">
    <!-- Header -->
    <header class="relative">
      <h1 class="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.3)]">
        {{ t('pages.dashboard.title') }}
      </h1>
      <p class="text-[var(--text-secondary)] mt-2">
        {{ t('pages.dashboard.subtitle') }}
      </p>
    </header>

    <!-- Gradient Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
          v-for="item in statistics"
          :key="item.label"
          class="relative group overflow-hidden rounded-2xl p-[2px] transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]"
      >
        <!-- 🌀 Gradient Border -->
        <div
            class="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_25%,#22D3EE_50%,#8B5CF6_100%)] animate-rotate-gradient opacity-60"
        ></div>

        <!-- Inner Card -->
        <div
            class="relative rounded-2xl bg-[rgba(15,17,23,0.85)] backdrop-blur-xl border border-white/10 p-5 flex flex-col justify-between h-full transition-all duration-300 group-hover:border-fuchsia-500/50 group-hover:shadow-[inset_0_1px_8px_rgba(255,255,255,0.05)]"
        >
          <p class="text-[var(--text-secondary)] text-sm">
            {{ item.label }}
          </p>
          <h2 class="text-2xl font-bold text-white mt-1">
            {{ item.value }}
          </h2>
          <span
              class="text-xs mt-2"
              :class="item.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'"
          >
            {{ item.change }}
          </span>

          <!-- Reflection Layer -->
          <div
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          >
            <div
                class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl blur-lg"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!--  <UiSidebarAdvanced :items="sidebarItems" />-->
    <!--  <UiTopbar @search="console.log('Search:', $event)" />-->

    <!-- Main content -->
    <main class="text-gray-100 space-y-8">
      <!-- Stats Cards -->
      <div class="grid sm:grid-cols-3 gap-4">
        <UiStatsCard
            v-for="(s, i) in stats"
            :key="i"
            :label="s.label"
            :value="s.value"
            :delta="s.delta"
            :hint="s.hint"
        />
      </div>

      <!-- Charts -->
      <div class="grid md:grid-cols-3 gap-6">
        <UiWidgetContainer :title="t('pages.dashboard.charts.lineChart')">
          <UiChartLine
              :labels="['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
              :dataset="[12, 9, 14, 10, 16, 8, 11]"
          />
        </UiWidgetContainer>

        <UiWidgetContainer :title="t('pages.dashboard.charts.barChart')">
          <UiChartBar
              :labels="['Q1', 'Q2', 'Q3', 'Q4']"
              :datasets="[{ label: 'Sales', data: [3, 6, 4, 8], color: '#06b6d4' }]"
          />
        </UiWidgetContainer>

        <UiWidgetContainer :title="t('pages.dashboard.charts.salesDistribution')">
          <UiChartDonut
              :labels="['A', 'B', 'C']"
              :dataset="[40, 35, 25]"
          />
        </UiWidgetContainer>
      </div>

      <!-- Form Widgets -->
      <div class="grid md:grid-cols-3 gap-6">
        <UiWidgetContainer :title="t('pages.dashboard.forms.uploadFiles')">
          <UiFileUpload
              @files="(f) => toastRef.value?.push({ text: `Uploaded ${f.length} files`, type: 'info' })"
          />
        </UiWidgetContainer>

        <UiWidgetContainer :title="t('pages.dashboard.forms.asyncSelect')">
          <UiSelectAsync v-model="asyncValue" :fetcher="asyncFetcher" />
        </UiWidgetContainer>

        <UiWidgetContainer :title="t('pages.dashboard.forms.tags')">
          <UiTagInput v-model="tagsValue" />
        </UiWidgetContainer>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-3">
        <button
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-90 transition"
            @click="showDrawer = true"
        >
          {{ t('pages.dashboard.actions.openNotifications') }}
        </button>

        <button
            class="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-200 hover:bg-white/10 transition"
            @click="showCmd = true"
        >
          {{ t('pages.dashboard.actions.openCommandPalette') }}
        </button>
      </div>
    </main>

    <!-- Feedback Components -->
    <UiToastAdvanced ref="toastRef" />
    <UiNotificationDrawer v-model="showDrawer" :items="notifications" />
    <UiCommandPalette v-model="showCmd" :commands="commands" />

    <UiBreadcrumb :items="[
      { label: t('pages.dashboard.breadcrumb.dashboard'), to: '/dashboard' },
      { label: t('pages.dashboard.breadcrumb.components'), to: '#' },
      { label: t('pages.dashboard.breadcrumb.demo') }
    ]" />

    <UiProgressBar :value="72" />
    <UiTimeline :events="events" />
    <UiPagination
        v-model:page="currentPage"
        :total="70" :per-page="10"
    />

    <button
        class="mt-6 px-4 py-2 rounded bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white hover:opacity-90"
        @click="confirmOpen = true"
    >
      {{ t('pages.dashboard.actions.showConfirmDialog') }}
    </button>

    <UiConfirmDialog
        v-model="confirmOpen"
        :title="t('pages.dashboard.confirmDialog.title')"
        :message="t('pages.dashboard.confirmDialog.message')"
        @confirm="console.log('Deleted!')"
    />
  </section>

</template>

<style scoped>
/* 🎡 Animated gradient rotation */
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes rotate-gradient {
  to {
    --angle: 360deg;
  }
}

.animate-rotate-gradient {
  animation: rotate-gradient 8s linear infinite;
}

main {
  min-height: 100vh;
  background: radial-gradient(at 30% 40%, rgba(139, 92, 246, 0.1), transparent 70%),
  radial-gradient(at 70% 80%, rgba(6, 182, 212, 0.1), transparent 70%);
}
</style>

