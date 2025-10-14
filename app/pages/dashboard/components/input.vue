<script setup lang="ts">
import UiInput from '~/components/Ui/Form/UiInput.vue'
import { Copy, Mail, Lock } from 'lucide-vue-next'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

const { t } = useI18n()
const email = ref('')
const password = ref('')
const otp = ref('')
</script>

<template>
  <section class="space-y-10">
    <h1 class="page-title">{{ t('pages.componentInput.title') }}</h1>

    <!-- Default Input -->
    <UiInput
        v-model="email"
        :label="t('pages.componentInput.labels.email')"
        :placeholder="t('pages.componentInput.placeholders.enterEmail')"
        :icon="Mail"
        :message="t('pages.componentInput.messages.neverShareEmail')"
    />

    <!-- Password Input -->
    <UiInput
        v-model="password"
        :label="t('pages.componentInput.labels.password')"
        type="password"
        :placeholder="t('pages.componentInput.placeholders.enterPassword')"
        password-toggle
        :icon="Lock"
    />

    <!-- Success -->
    <UiInput
        v-model="email"
        :label="t('pages.componentInput.labels.validEmail')"
        placeholder="example@domain.com"
        state="success"
        :message="t('pages.componentInput.messages.looksGood')"
    />

    <!-- Warning -->
    <UiInput
        v-model="email"
        :label="t('pages.componentInput.labels.unverifiedEmail')"
        state="warning"
        :message="t('pages.componentInput.messages.verifyEmail')"
    />

    <!-- Error -->
    <UiInput
        v-model="email"
        :label="t('pages.componentInput.labels.invalidEmail')"
        state="error"
        :message="t('pages.componentInput.messages.enterValidEmail')"
    />

    <!-- Outlined Variant -->
    <UiInput
        v-model="email"
        :label="t('pages.componentInput.labels.outlinedInput')"
        variant="outlined"
        :placeholder="t('pages.componentInput.placeholders.focusBorderHighlight')"
    />

    <!-- Filled Variant -->
    <UiInput
        v-model="email"
        :label="t('pages.componentInput.labels.filledInput')"
        variant="filled"
        :placeholder="t('pages.componentInput.placeholders.smoothGlassFill')"
    />

    <h1 class="page-title">Input with Prefix & Suffix Slots</h1>

    <!-- Email Input with Prefix Icon -->
    <UiInput
        v-model="email"
        :label="t('pages.componentInput.labels.emailAddress')"
        placeholder="user@example.com"
        :parent-theme="'dark'"
    >
      <template #prefix>
        <Mail class="w-4 h-4" />
      </template>
      <template #suffix>
        <Copy class="w-4 h-4 cursor-pointer hover:text-fuchsia-400" />
      </template>
    </UiInput>

    <!-- OTP Input with Suffix Action -->
    <UiInput
        v-model="otp"
        :label="t('pages.componentInput.labels.verificationCode')"
        :placeholder="t('pages.componentInput.placeholders.dots')"
        :parent-theme="'gradient'"
    >
      <template #suffix>
        <button
            class="text-xs text-fuchsia-400 hover:text-fuchsia-300 font-medium"
            @click="alert(t('pages.componentInput.messages.codeResent'))"
        >
          {{ t('pages.componentInput.actions.resend') }}
        </button>
      </template>
    </UiInput>

    <!-- Password Input with Prefix Icon -->
    <UiInput
        v-model="email"
        type="password"
        :label="t('pages.componentInput.labels.password')"
        password-toggle
        :parent-theme="'dark'"
    >
      <template #prefix>
        <Lock class="w-4 h-4" />
      </template>
    </UiInput>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
.page-title {
  @apply text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400;
}
</style>
