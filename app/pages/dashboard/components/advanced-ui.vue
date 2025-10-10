<script setup lang="ts">
import UiAvatar from '~/components/Ui/Core/UiAvatar.vue'
import UiBadgeStatus from '~/components/Ui/Core/UiBadgeStatus.vue'
import UiRating from '~/components/Ui/Core/UiRating.vue'
import UiGridLayout from '~/components/Ui/Layout/UiGridLayout.vue'
import UiSectionHeader from '~/components/Ui/Layout/UiSectionHeader.vue'
import UiContainer from '~/components/Ui/Layout/UiContainer.vue'
import UiDiffSideBySide from '~/components/Ui/Dev/UiDiffSideBySide.vue'
import UiPromptHistory from '~/components/Ui/Dev/UiPromptHistory.vue'
import UiAgentCard from '~/components/Ui/Dev/UiAgentCard.vue'
import UiApiConsole from '~/components/Ui/Dev/UiApiConsole.vue'

import { ref } from 'vue'

const rating = ref(4)

const users = [
  { name: 'Abdallah Samy', src: 'https://i.pravatar.cc/120?img=1', status: 'online' },
  { name: 'Layla Karim', src: 'https://i.pravatar.cc/120?img=3', status: 'away' },
  { name: 'Ali Hassan', src: 'https://i.pravatar.cc/120?img=4', status: 'busy' },
  { name: 'Guest User', status: 'offline' },
]

const agents = [
  {
    name: 'Atlas',
    description: 'General-purpose LLM assistant optimized for software queries.',
    avatar: 'https://i.pravatar.cc/120?img=10',
    model: 'gpt-5',
    active: true,
  },
  {
    name: 'Noura',
    description: 'Arabic fintech expert agent for compliance-by-design guidance.',
    avatar: 'https://i.pravatar.cc/120?img=11',
    model: 'murabaha-3.2',
  },
]

const diffLeft = `export const add = (a, b) => a + b
export const multiply = (a, b) => a * b
console.log('Done')`

const diffRight = `export const add = (a, b) => a + b
export const multiply = (a, b) => a * b
export const divide = (a, b) => a / b
console.log('Updated')`
</script>

<template>
  <UiContainer max="xl" class="space-y-10 text-gray-100">
    <UiSectionHeader
        title="Advanced UI Components"
        subtitle="Interactive and data-rich examples"
        icon="i-lucide-layout-dashboard"
    >
      <template #actions>
        <UiBadgeStatus label="Demo Mode" color="info" />
      </template>
    </UiSectionHeader>

    <!-- 🧍 Avatars -->
    <UiSectionHeader title="Avatars & Badges" subtitle="User presence and status" />
    <UiGridLayout :cols="4">
      <div v-for="u in users" :key="u.name" class="flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/5">
        <UiAvatar :name="u.name" :src="u.src" :status="u.status" size="lg" />
        <div class="text-sm font-medium text-gray-300">{{ u.name }}</div>
        <UiBadgeStatus
            :label="u.status"
            :color="u.status === 'online' ? 'success' : u.status === 'busy' ? 'error' : u.status === 'away' ? 'warning' : 'default'"
        />
      </div>
    </UiGridLayout>

    <!-- ⭐ Rating -->
    <UiSectionHeader title="Rating Component" subtitle="Interactive rating input" />
    <div class="flex flex-col items-center gap-2">
      <UiRating v-model="rating" icon="star" />
      <span class="text-gray-400 text-sm">Current rating: {{ rating }}/5</span>
    </div>

    <!-- 🧱 Grid Layout -->
    <UiSectionHeader title="Grid Layout Showcase" subtitle="Automatic responsive columns" />
    <UiGridLayout :cols="3" gap="lg">
      <div v-for="n in 6" :key="n" class="rounded-xl bg-gradient-to-br from-fuchsia-900/30 to-cyan-900/20 border border-white/10 p-6 text-center">
        <h4 class="font-semibold text-gray-100">Card {{ n }}</h4>
        <p class="text-sm text-gray-400">Dynamic grid item</p>
      </div>
    </UiGridLayout>

    <!-- 🤖 Agents -->
    <UiSectionHeader title="AI Agents" subtitle="Registered AI personalities" />
    <UiGridLayout :cols="2" gap="lg">
      <UiAgentCard
          v-for="a in agents"
          :key="a.name"
          :name="a.name"
          :description="a.description"
          :avatar="a.avatar"
          :model="a.model"
          :active="a.active"
      />
    </UiGridLayout>

    <!-- 🧠 Prompt History -->
    <UiSectionHeader title="Prompt History" subtitle="Stored conversation context" />
    <UiPromptHistory />

    <!-- 🔍 Diff Side-by-Side -->
    <UiSectionHeader title="Diff Side-by-Side" subtitle="Compare code revisions" />
    <UiDiffSideBySide :left="diffLeft" :right="diffRight" />

    <!-- 🧪 API Console -->
    <UiSectionHeader title="API Console" subtitle="Mock REST interaction demo" />
    <UiApiConsole />
  </UiContainer>
</template>

<style scoped>
.i-lucide-layout-dashboard {
  display: inline-block;
  width: 1.25rem;
  height: 1.25rem;
  background: linear-gradient(to right, #f0abfc, #22d3ee);
  -webkit-mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h7v9H3V3zM14 3h7v5h-7V3zM14 12h7v9h-7v-9zM3 16h7v5H3v-5z"/></svg>') center/contain no-repeat;
  mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3h7v9H3V3zM14 3h7v5h-7V3zM14 12h7v9h-7v-9zM3 16h7v5H3v-5z"/></svg>') center/contain no-repeat;
}
</style>
