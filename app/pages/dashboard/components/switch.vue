<script setup lang="ts">
import UiSwitch from '~/components/Ui/Common/UiSwitch.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

const notifications = ref(true)
const power = ref(false)
const theme = ref(true)
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t('pages.componentSwitch.title') }}</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <UiSwitch :label="t('pages.componentSwitch.enableNotifications')" v-model="notifications" color="fuchsia" :description="t('pages.componentSwitch.receiveAlerts')" />
      <UiSwitch :label="t('pages.componentSwitch.power')" v-model="power" color="emerald" icon />
      <UiSwitch :label="t('pages.componentSwitch.darkMode')" v-model="theme" color="cyan" outlined />
      <UiSwitch :label="t('pages.componentSwitch.disabledExample')" :model-value="false" disabled />
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
