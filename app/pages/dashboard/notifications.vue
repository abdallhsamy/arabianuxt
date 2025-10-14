<script setup lang="ts">
import { ref, computed } from 'vue'
import NotificationItem from "~/components/Ui/User/NotificationItem.vue";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

type Notification = { id: string; type: 'system'|'billing'|'security'; text: string; read: boolean; time: string }

const filter = ref<'all'|'system'|'billing'|'security'>('all')
const notification = ref<Notification[]>([
  { id: 'n1', type: 'system', text: 'New dashboard update v1.4 deployed.', read: false, time: '2m ago' },
  { id: 'n2', type: 'billing', text: 'Invoice INV-2025-0042 paid.', read: true, time: '1d ago' },
  { id: 'n3', type: 'security', text: 'New device login detected.', read: false, time: '5h ago' },
])

const filtered = computed(() => filter.value === 'all' ? notification.value : notification.value.filter(n => n.type === filter.value))
const markAll = (): void => notification.value.forEach(n => n.read = true)
</script>

<template>
  <section class="space-y-8">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400">{{ t('pages.notifications.title') }}</h1>
      <button class="text-sm text-cyan-300 hover:text-white" @click="markAll">{{ t('pages.notifications.markAllAsRead') }}</button>
    </div>

    <div class="flex gap-3 text-sm">
      <button v-for="type in ['all','system','billing','security']" :key="type" class="px-3 py-1.5 rounded-xl capitalize"
              :class="type===filter ? 'bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white' : 'bg-white/10 text-gray-300 hover:bg-white/15'"
              @click="filter=type as any">{{ t(`pages.notifications.filters.${type}`) }}</button>
    </div>

    <div class="space-y-3">
      <NotificationItem v-for="n in filtered" :key="n.id" :n="n" />
      <p v-if="!filtered.length" class="text-gray-400 text-sm text-center py-6">{{ t('pages.notifications.noNotifications') }}</p>
    </div>
  </section>
</template>
