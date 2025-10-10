<script setup lang="ts">
import { ref } from 'vue'
import UiAnalyticsCard from '~/components/Ui/Widgets/UiAnalyticsCard.vue'
import UiActivityFeed from '~/components/Ui/Widgets/UiActivityFeed.vue'
import UiMapWidget from '~/components/Ui/Widgets/UiMapWidget.vue'
import UiKanbanBoard from '~/components/Ui/Widgets/UiKanbanBoard.vue'
import UiUserAvatarGroup from '~/components/Ui/Widgets/UiUserAvatarGroup.vue'

const tasks = ref([
  { id: '1', title: 'Design new UI mockups', status: 'todo' },
  { id: '2', title: 'Fix dashboard bugs', status: 'progress' },
  { id: '3', title: 'Deploy release', status: 'done' },
])

const feed = [
  { id: '1', title: 'New user joined', description: 'Ahmed registered', time: '5 min ago', type: 'info' },
  { id: '2', title: 'Payment received', description: '$250 credited', time: '10 min ago', type: 'success' },
  { id: '3', title: 'Server warning', description: 'Memory usage high', time: '1 hr ago', type: 'warning' },
]

const users = [
  { id: '1', name: 'A' },
  { id: '2', name: 'B' },
  { id: '3', name: 'C' },
  { id: '4', name: 'D' },
  { id: '5', name: 'E' },
  { id: '6', name: 'F' },
]
</script>

<template>
  <section class="p-8 space-y-10 text-gray-100">
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UiAnalyticsCard label="Revenue" value="$45K" change="+8%" icon="💰" color="emerald" :progress="80" />
      <UiAnalyticsCard label="Active Users" value="1.2K" change="+4%" icon="👥" color="cyan" :progress="70" />
      <UiAnalyticsCard label="Bounce Rate" value="24%" change="-3%" icon="📉" color="amber" :progress="40" />
      <UiAnalyticsCard label="Errors" value="12" change="+2%" icon="⚠️" color="rose" :progress="20" />
    </div>

    <UiUserAvatarGroup :users="users" :max="5" />

    <UiActivityFeed :items="feed" />

    <UiKanbanBoard v-model="tasks" />

    <UiMapWidget :lat="24.7136" :lng="46.6753" height="300px" />
  </section>
</template>
