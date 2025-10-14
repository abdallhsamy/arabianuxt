<script setup lang="ts">
import UiTextarea from '~/components/Ui/Form/UiTextarea.vue'
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()

const bio = ref('')
const notes = ref('Initial text here...')
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t('pages.componentTextarea.title') }}</h1>

    <!-- Default -->
    <UiTextarea
        v-model="bio"
        :label="t('pages.componentTextarea.labels.yourBio')"
        :placeholder="t('pages.componentTextarea.placeholders.tellUsAboutYourself')"
        :max-length="160"
        :parent-theme="'dark'"
    />

    <!-- Gradient theme -->
    <UiTextarea
        v-model="notes"
        :label="t('pages.componentTextarea.labels.notes')"
        :placeholder="t('pages.componentTextarea.placeholders.writeSomething')"
        variant="filled"
        :parent-theme="'gradient'"
        :message="t('pages.componentTextarea.messages.autosizing')"
    />

    <!-- Error state -->
    <UiTextarea
        v-model="bio"
        :label="t('pages.componentTextarea.labels.feedback')"
        :placeholder="t('pages.componentTextarea.placeholders.typeFeedback')"
        state="error"
        :message="t('pages.componentTextarea.messages.exceededLimit')"
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
