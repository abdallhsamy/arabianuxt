<script setup lang="ts">
import UiSelect from '~/components/Ui/Form/UiSelect.vue'
import { ref } from 'vue'

const country = ref('')
const color = ref('')

const countries = [
  { label: 'Saudi Arabia', value: 'sa' },
  { label: 'United Arab Emirates', value: 'ae' },
  { label: 'Kuwait', value: 'kw' },
  { label: 'Qatar', value: 'qa' },
  { label: 'Egypt', value: 'eg' },
]
const colors = [
  { label: 'Fuchsia', value: 'fuchsia' },
  { label: 'Emerald', value: 'emerald' },
  { label: 'Cyan', value: 'cyan' },
  { label: 'Rose', value: 'rose' },
]
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Select Component Examples</h1>

    <!-- Simple select -->
    <UiSelect
        v-model="country"
        label="Country"
        :options="countries"
        placeholder="Select your country"
    />

    <!-- Searchable -->
    <UiSelect
        v-model="color"
        label="Favorite Color"
        :options="colors"
        searchable
        :parent-theme="'gradient'"
        message="Choose your theme color"
    />

    <!-- Error state -->
    <UiSelect
        v-model="country"
        label="Required Field"
        :options="countries"
        state="error"
        message="This field is required."
    />
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
