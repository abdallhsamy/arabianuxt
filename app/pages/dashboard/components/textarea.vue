<script setup lang="ts">
import UiTextarea from '~/components/Ui/Form/UiTextarea.vue'
import { ref } from 'vue'

const bio = ref('')
const notes = ref('Initial text here...')
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">Textarea Component Examples</h1>

    <!-- Default -->
    <UiTextarea
        v-model="bio"
        label="Your Bio"
        placeholder="Tell us about yourself..."
        max-length="160"
        :parent-theme="'dark'"
    />

    <!-- Gradient theme -->
    <UiTextarea
        v-model="notes"
        label="Notes"
        placeholder="Write something here..."
        variant="filled"
        :parent-theme="'gradient'"
        message="Autosizing & adaptive styling"
    />

    <!-- Error state -->
    <UiTextarea
        v-model="bio"
        label="Feedback"
        placeholder="Type your feedback..."
        state="error"
        message="Exceeded character limit"
        :max-length="10"
    />
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
