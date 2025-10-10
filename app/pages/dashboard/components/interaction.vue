<script setup lang="ts">
import { ref } from 'vue'
import UiFileUploadAdvanced from '~/components/Ui/Form/UiFileUploadAdvanced.vue'
import UiDateRangePicker from '~/components/Ui/Form/UiDateRangePicker.vue'
import UiSearchPanel from '~/components/Ui/Nav/UiSearchPanel.vue'
import UiChatDock from '~/components/Ui/Assist/UiChatDock.vue'
import UiTooltip from '~/components/Ui/Feedback/UiTooltip.vue'

const searchOpen = ref(false)
const items = [
  { id: '1', title: 'Dashboard Overview', category: 'Pages' },
  { id: '2', title: 'Settings Panel', category: 'Pages' },
  { id: '3', title: 'Revenue Report', category: 'Analytics' },
]
</script>

<template>
  <section class="p-8 text-gray-100 space-y-6">
    <h1 class="text-2xl font-bold">✨ Interaction Components Demo</h1>

    <div class="grid md:grid-cols-2 gap-6">
      <UiFileUploadAdvanced />
      <UiDateRangePicker />
    </div>

    <button
        class="px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white"
        @click="searchOpen = true"
    >
      Open Search
    </button>

    <UiTooltip text="Hover tooltip example"><span class="underline cursor-help">Hover me</span></UiTooltip>

    <UiSearchPanel v-model="searchOpen" :items="items" />
    <UiChatDock />
  </section>
</template>
