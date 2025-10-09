<script setup lang="ts">
import UiInput from '~/components/Ui/Common/UiInput.vue'
import { Search, Mail, Lock } from 'lucide-vue-next'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const search = ref('')
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Input Component Examples</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <UiInput label="Email" type="email" v-model="email" placeholder="you@example.com" :icon="Mail" hint="We'll never share your email." />
      <UiInput label="Password" type="password" v-model="password" placeholder="Enter password" clearable />
      <UiInput label="Search" type="search" v-model="search" placeholder="Search..." :icon="Search" />
      <UiInput label="Disabled" disabled placeholder="Disabled input" />
      <UiInput label="Error Example" error="Invalid input" placeholder="Error field" />
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
