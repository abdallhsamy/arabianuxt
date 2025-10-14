<script setup lang="ts">
import { ref } from 'vue'
import { LogIn } from 'lucide-vue-next'
import {useRouter, useToaster} from '#imports'
import { useI18n } from 'vue-i18n'
import {useAuthStore} from "~/store/authStore";
import {authApi} from "~/api/endpoints/auth.endpoint";
import {toTypedSchema} from "@vee-validate/zod";
import {getLoginSchema} from "~/api/schemas/auth.schema";
import {useField, useForm} from "vee-validate";
import {useRequest} from "alova/client";
import UiInput from "~/components/Ui/Form/UiInput.vue";

const { t } = useI18n()
const authStore = useAuthStore()
const localePath = useLocalePath();
const toaster = useToaster()
definePageMeta({ layout: 'auth' })

const router = useRouter()
const isLoading = ref(false)

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: toTypedSchema(getLoginSchema()),
  initialValues: {
    email: '',
    password: '',
  }
})

const {value: emailField, setValue: setEmailValue, errorMessage: emailError, setErrors: setEmailError} = useField<string>('email')
const {value: passwordField, setValue: setPasswordValue, errorMessage: passwordError, setErrors: setPasswordError} = useField<string>('password')

const {send, loading, onSuccess, onError} = useRequest(authApi.login, {immediate: false})

const onSubmit = handleSubmit(()=> {
  setEmailError('')
  setPasswordError('')
  send({
    email: emailField.value,
    password: passwordField.value,
  })
});

onSuccess((event) => {
  authStore.login(event.data.data);
  router.push(localePath('/dashboard'))
})

onError((event) => {
  const err = event.error
  const res = err.response?.data || err.data
  if (!res) {
    toaster.error(t('toasts.unexpectedError'))
    return
  }

  if (res.errors) {
    if (res.errors.email?.length) {
      setEmailError(res.errors.email[0])
    }

    if (res.errors.password?.length) {
      setPasswordError(res.errors.password[0])
    }

    toaster.error(res.errors.password[0] || res.errors.email[0] || res.message)
  } else if (res.message) {
    toaster.error(res.message)

  } else {
    toaster.error(t('toasts.unknownError'))
  }
})

const autoFillForm = () => {
  setEmailValue("admin@example.com")
  setPasswordValue("password")
}
</script>

<template>
  <Transition name="page" mode="out-in">
    <div
        key="login"
        class="group relative rounded-3xl p-[2px] bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_40%,#22D3EE_80%,#8B5CF6_100%)] animate-rotate-gradient"
    >
      <div
          class="relative z-10 rounded-3xl bg-[rgba(15,17,23,0.92)] backdrop-blur-2xl border border-white/10 p-10 shadow-[0_0_40px_rgba(139,92,246,0.15)] transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.25)]"
      >
        <h1
            class="text-center text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400 mb-6"
        >
          {{ t('pages.auth.login.title') }}
        </h1>
        <p class="text-center text-sm text-[var(--text-secondary)] mb-8">
          {{ t('pages.auth.login.subtitle') }}
        </p>

        <form @submit.prevent="onSubmit" class="space-y-6">
          <div>
            <UiInput
                :label="t('pages.auth.login.email')"
                type="email"
                v-model="emailField"
                placeholder="your@mail.com"
                :error-message="emailError"
            />
          </div>

          <div>
            <UiInput
                :label="t('pages.auth.login.password')"
                type="password"
                v-model="passwordField"
                :placeholder="t('pages.auth.login.passwordPlaceholder')"
                :error-message="passwordError"
                password-toggle
            />
          </div>

          <!-- Forgot password -->
          <div class="text-right">
            <NuxtLinkLocale
                to="'/forgot-password'"
                class="text-sm text-fuchsia-400 hover:text-cyan-400 transition-colors"
            >
              {{ t('pages.auth.login.forgotPassword') }}
            </NuxtLinkLocale>
          </div>

          <button
              type="submit"
              :disabled="loading || isSubmitting"
              class="cursor-pointer relative w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-2"
          >
            <span v-if="!isLoading || !isSubmitting">{{ t('pages.auth.login.loginButton') }}</span>
            <span v-else class="animate-pulse">{{ t('pages.auth.login.authenticating') }}</span>
            <LogIn class="w-5 h-5" />
          </button>

          <p class="text-center text-sm text-[var(--text-secondary)] mt-4">
            {{ t('pages.auth.login.noAccount') }}
            <NuxtLinkLocale to="/register" class="text-fuchsia-400 hover:text-cyan-400 font-medium">
              {{ t('pages.auth.login.createOne') }}
            </NuxtLinkLocale>
          </p>
        </form>

        <p class="text-center text-sm text-[var(--text-secondary)]">
          <button
              @click="autoFillForm"
              class="text-fuchsia-400 hover:text-cyan-400 font-medium cursor-pointer">
            {{ t('pages.auth.login.autoFillCredentials') }}
          </button>
        </p>
      </div>
    </div>
  </Transition>
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
