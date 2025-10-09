<script setup lang="ts">
import UiSwitch from '~/components/Ui/Common/UiSwitch.vue'
import { ref } from 'vue'

const notifications = ref(true)
const power = ref(false)
const theme = ref(true)
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Switch Component Examples</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <UiSwitch label="Enable Notifications" v-model="notifications" color="fuchsia" description="Receive alerts instantly" />
      <UiSwitch label="Power" v-model="power" color="emerald" icon />
      <UiSwitch label="Dark Mode" v-model="theme" color="cyan" outlined />
      <UiSwitch label="Disabled Example" disabled />
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
