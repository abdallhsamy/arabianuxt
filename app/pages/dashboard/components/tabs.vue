<script setup lang="ts">
import UiTabs from '~/components/Ui/Common/UiTabs.vue'
import { Home, Settings, Bell, User } from 'lucide-vue-next'
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

const activeTab = ref('overview')
const items = [
  { id: 'overview', label: t('pages.componentTabs.labels.overview'), icon: Home },
  { id: 'settings', label: t('pages.componentTabs.labels.settings'), icon: Settings },
  { id: 'notifications', label: t('pages.componentTabs.labels.notifications'), icon: Bell },
  { id: 'profile', label: t('pages.componentTabs.labels.profile'), icon: User },
]
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t('pages.componentTabs.title') }}</h1>

    <!-- Underline Variant -->
    <UiTabs v-model="activeTab" :items="items" variant="underline" color="fuchsia">
      <template #overview>
        <p class="text-gray-300">{{ t('pages.componentTabs.content.overview') }}</p>
      </template>
      <template #settings>
        <p class="text-gray-300">{{ t('pages.componentTabs.content.settings') }}</p>
      </template>
      <template #notifications>
        <p class="text-gray-300">{{ t('pages.componentTabs.content.notifications') }}</p>
      </template>
      <template #profile>
        <p class="text-gray-300">{{ t('pages.componentTabs.content.profile') }}</p>
      </template>
    </UiTabs>

    <!-- Pill Variant -->
    <UiTabs :items="items" variant="pill" color="cyan">
      <template #overview>
        <p>{{ t('pages.componentTabs.contentPill.overview') }}</p>
      </template>
      <template #settings>
        <p>{{ t('pages.componentTabs.contentPill.settings') }}</p>
      </template>
      <template #notifications>
        <p>{{ t('pages.componentTabs.contentPill.notifications') }}</p>
      </template>
      <template #profile>
        <p>{{ t('pages.componentTabs.contentPill.profile') }}</p>
      </template>
    </UiTabs>

    <!-- Vertical Layout -->
    <UiTabs :items="items" vertical variant="pill" color="emerald">
      <template #overview>
        <p>{{ t('pages.componentTabs.contentVertical.overview') }}</p>
      </template>
      <template #settings>
        <p>{{ t('pages.componentTabs.contentVertical.settings') }}</p>
      </template>
      <template #notifications>
        <p>{{ t('pages.componentTabs.contentVertical.notifications') }}</p>
      </template>
      <template #profile>
        <p>{{ t('pages.componentTabs.contentVertical.profile') }}</p>
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
