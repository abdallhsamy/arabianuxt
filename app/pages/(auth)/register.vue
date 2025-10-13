<script setup lang="ts">
import { ref } from 'vue'
import { Eye, EyeOff, UserPlus } from 'lucide-vue-next'
import { useRouter } from '#imports'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

definePageMeta({ layout: 'auth' })

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirm = ref(false)
const isLoading = ref(false)

const handleRegister = async (): Promise<void> => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) return
  if (password.value !== confirmPassword.value) {
    alert(t('pages.auth.register.passwordsDoNotMatch'))
    return
  }
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000)) // simulate API
  isLoading.value = false
  router.push('/dashboard')
}
</script>

<template>
  <div
      class="group relative rounded-3xl p-[2px] bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_40%,#22D3EE_80%,#8B5CF6_100%)] animate-rotate-gradient"
  >
    <div
        class="relative z-10 rounded-3xl bg-[rgba(15,17,23,0.92)] backdrop-blur-2xl border border-white/10 p-10 shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.25)]"
    >
      <h1
          class="text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 mb-6"
      >
        {{ t('pages.auth.register.title') }}
      </h1>
      <p class="text-center text-sm text-[var(--text-secondary)] mb-8">
        {{ t('pages.auth.register.subtitle') }}
      </p>

      <form @submit.prevent="handleRegister" class="space-y-6">
        <!-- Full Name -->
        <div>
          <label class="text-sm text-[var(--text-secondary)] mb-1 block">{{ t('pages.auth.register.fullName') }}</label>
          <input
              v-model="name"
              type="text"
              :placeholder="t('pages.auth.register.namePlaceholder')"
              class="input-dark w-full focus:ring-2 focus:ring-fuchsia-500/50"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="text-sm text-[var(--text-secondary)] mb-1 block">{{ t('pages.auth.register.email') }}</label>
          <input
              v-model="email"
              type="email"
              placeholder="your@email.com"
              class="input-dark w-full focus:ring-2 focus:ring-fuchsia-500/50"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm text-[var(--text-secondary)] mb-1 block">{{ t('pages.auth.register.password') }}</label>
          <div class="relative">
            <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="t('pages.auth.register.passwordPlaceholder')"
                class="input-dark w-full pr-10 focus:ring-2 focus:ring-fuchsia-500/50"
            />
            <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <component :is="showPassword ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="text-sm text-[var(--text-secondary)] mb-1 block">{{ t('pages.auth.register.confirmPassword') }}</label>
          <div class="relative">
            <input
                v-model="confirmPassword"
                :type="showConfirm ? 'text' : 'password'"
                :placeholder="t('pages.auth.register.passwordPlaceholder')"
                class="input-dark w-full pr-10 focus:ring-2 focus:ring-fuchsia-500/50"
            />
            <button
                type="button"
                @click="showConfirm = !showConfirm"
                class="absolute ltr:right-3 rtl:left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <component :is="showConfirm ? EyeOff : Eye" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
            type="submit"
            :disabled="isLoading"
            class="relative w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-2"
        >
          <span v-if="!isLoading">{{ t('pages.auth.register.signUpButton') }}</span>
          <span v-else class="animate-pulse">{{ t('pages.auth.register.creatingAccount') }}</span>
          <UserPlus class="w-5 h-5" />
        </button>

        <!-- Already have account -->
        <p class="text-center text-sm text-[var(--text-secondary)] mt-4">
          {{ t('pages.auth.register.haveAccount') }}
          <NuxtLinkLocale to="/login" class="text-fuchsia-400 hover:text-cyan-400 font-medium">
            {{ t('pages.auth.register.signIn') }}
          </NuxtLinkLocale>
        </p>
      </form>
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
