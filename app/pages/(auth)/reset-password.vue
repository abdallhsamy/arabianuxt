<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff, KeyRound, CheckCircle2 } from 'lucide-vue-next'
import { useRouter } from '#imports'

definePageMeta({
  layout: 'auth',
})

const { t } = useI18n()

const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const isLoading = ref(false)
const success = ref(false)

const handleReset = async (): Promise<void> => {
  if (!password.value || !confirmPassword.value) return
  if (password.value !== confirmPassword.value) {
    alert(t('pages.auth.resetPassword.passwordsDoNotMatch'))
    return
  }
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000)) // simulate API call
  isLoading.value = false
  success.value = true
  setTimeout(() => router.push('/login'), 1500)
}
</script>

<template>
  <div
      class="group relative rounded-3xl p-[2px] bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_40%,#22D3EE_80%,#8B5CF6_100%)] animate-rotate-gradient"
  >
    <div
        class="relative z-10 rounded-3xl bg-[rgba(15,17,23,0.92)] backdrop-blur-2xl border border-white/10 p-10 shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.25)]"
    >
      <!-- ✨ Success State -->
      <template v-if="success">
        <div class="flex flex-col items-center justify-center text-center py-10">
          <div class="p-3 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 mb-4">
            <CheckCircle2 class="w-10 h-10 text-white" />
          </div>
          <h2
              class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 mb-2"
          >
            {{ t('pages.auth.resetPassword.successTitle') }}
          </h2>
          <p class="text-sm text-[var(--text-secondary)] max-w-xs mx-auto">
            {{ t('pages.auth.resetPassword.successMessage') }}
          </p>
        </div>
      </template>

      <!-- 🔐 Reset Password Form -->
      <template v-else>
        <h1
            class="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 mb-6"
        >
          {{ t('pages.auth.resetPassword.title') }}
        </h1>
        <p class="text-center text-sm text-[var(--text-secondary)] mb-8">
          {{ t('pages.auth.resetPassword.description') }}
        </p>

        <form @submit.prevent="handleReset" class="space-y-6">
          <!-- New Password -->
          <div>
            <label class="text-sm text-[var(--text-secondary)] mb-1 block">
              {{ t('pages.auth.resetPassword.newPassword') }}
            </label>
            <div class="relative">
              <input
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  :placeholder="t('pages.auth.resetPassword.passwordPlaceholder')"
                  class="input-dark w-full pr-10 focus:ring-2 focus:ring-fuchsia-500/50"
              />
              <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="text-sm text-[var(--text-secondary)] mb-1 block">
              {{ t('pages.auth.resetPassword.confirmPassword') }}
            </label>
            <div class="relative">
              <input
                  v-model="confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  :placeholder="t('pages.auth.resetPassword.passwordPlaceholder')"
                  class="input-dark w-full pr-10 focus:ring-2 focus:ring-fuchsia-500/50"
              />
              <button
                  type="button"
                  @click="showConfirm = !showConfirm"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <component :is="showConfirm ? EyeOff : Eye" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <!-- Submit -->
          <button
              type="submit"
              :disabled="isLoading"
              class="relative w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-2"
          >
            <span v-if="!isLoading">{{ t('pages.auth.resetPassword.resetPassword') }}</span>
            <span v-else class="animate-pulse">{{ t('pages.auth.resetPassword.updating') }}</span>
            <KeyRound class="w-5 h-5" />
          </button>
        </form>
      </template>
    </div>
  </div>
</template>

<style scoped>
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes rotate-gradient {
  to { --angle: 360deg; }
}
.animate-rotate-gradient {
  background-size: 200% 200%;
  animation: rotate-gradient 10s linear infinite;
}
.input-dark {
  background-color: rgba(25,27,33,0.95);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-primary);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.25s ease;
}
.input-dark:focus {
  outline: none;
  border-color: rgba(236,72,153,0.4);
  box-shadow: 0 0 0 2px rgba(236,72,153,0.2);
}
</style>
