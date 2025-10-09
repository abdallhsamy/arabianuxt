<script setup lang="ts">
import UiSelect from '~/components/Ui/Common/UiSelect.vue'
import { ref } from 'vue'

const country = ref(null)
const asyncSelect = ref(null)

const options = [
  { label: 'Saudi Arabia', value: 'sa' },
  { label: 'United Arab Emirates', value: 'ae' },
  { label: 'Egypt', value: 'eg' },
  { label: 'Kuwait', value: 'kw' },
]
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Select Component Examples</h1>

    <div class="grid gap-6 md:grid-cols-2">
      <UiSelect label="Country" v-model="country" :options="options" searchable clearable />
      <UiSelect label="Disabled" :options="options" disabled />
      <UiSelect label="Async Options" v-model="asyncSelect" :options="options" async-options />
      <UiSelect label="Loading" :options="options" loading />
    </div>
  </section>
</template>

<style scoped>
@reference "~/assets/css/main.css";

.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
