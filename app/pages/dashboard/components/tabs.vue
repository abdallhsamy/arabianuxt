<script setup lang="ts">
import UiTabs from '~/components/Ui/Common/UiTabs.vue'
import { Home, Settings, Bell, User } from 'lucide-vue-next'
import { ref } from 'vue'

const activeTab = ref('overview')
const items = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
]
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Tabs Component Examples</h1>

    <!-- Underline Variant -->
    <UiTabs v-model="activeTab" :items="items" variant="underline" color="fuchsia">
      <template #overview>
        <p class="text-gray-300">This is the overview section content.</p>
      </template>
      <template #settings>
        <p class="text-gray-300">Here you can manage your app settings.</p>
      </template>
      <template #notifications>
        <p class="text-gray-300">Notifications and alerts appear here.</p>
      </template>
      <template #profile>
        <p class="text-gray-300">Profile information and user data.</p>
      </template>
    </UiTabs>

    <!-- Pill Variant -->
    <UiTabs :items="items" variant="pill" color="cyan">
      <template #overview>
        <p>Overview content inside a pill-style tab navigation.</p>
      </template>
      <template #settings>
        <p>Manage configurations and integrations here.</p>
      </template>
      <template #notifications>
        <p>All app notifications and alerts listed here.</p>
      </template>
      <template #profile>
        <p>Edit your personal profile or update info.</p>
      </template>
    </UiTabs>

    <!-- Vertical Layout -->
    <UiTabs :items="items" vertical variant="pill" color="emerald">
      <template #overview>
        <p>Vertical tab layout is great for sidebar panels.</p>
      </template>
      <template #settings>
        <p>Settings section content in vertical orientation.</p>
      </template>
      <template #notifications>
        <p>Vertical mode keeps sections aligned with content.</p>
      </template>
      <template #profile>
        <p>Profile management inside vertical tabs.</p>
      </template>
    </UiTabs>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
