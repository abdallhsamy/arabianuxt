<script setup lang="ts">
import { ref } from "vue";
import { Mail, CheckCircle2 } from "lucide-vue-next";

definePageMeta({ layout: "auth" });

const { t } = useI18n();

const email = ref("");
const isLoading = ref(false);
const success = ref(false);

const handleSubmit = async (): Promise<void> => {
  if (!email.value) return;
  isLoading.value = true;
  await new Promise(r => setTimeout(r, 1200)); // simulate API call
  isLoading.value = false;
  success.value = true;
};
</script>

<template>
  <div
    class="group relative rounded-3xl p-[2px] bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_40%,#EC4899_80%,#22D3EE_100%)] animate-rotate-gradient"
  >
    <div
      class="relative z-10 rounded-3xl bg-[rgba(15,17,23,0.92)] backdrop-blur-2xl border border-white/10 p-10 shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(236,72,153,0.25)]"
    >
      <template v-if="!success">
        <h1
          class="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 mb-6"
        >
          {{ t("pages.auth.forgotPassword.title") }}
        </h1>
        <p class="text-center text-sm text-[var(--text-secondary)] mb-8">
          {{ t("pages.auth.forgotPassword.description") }}
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label class="text-sm text-[var(--text-secondary)] mb-1 block">
              {{ t("pages.auth.forgotPassword.emailAddress") }}
            </label>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="input-dark w-full focus:ring-2 focus:ring-fuchsia-500/50"
              required
            />
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="relative w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-400 hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-2"
          >
            <span v-if="!isLoading">{{
              t("pages.auth.forgotPassword.sendResetLink")
            }}</span>
            <span v-else class="animate-pulse">{{
              t("pages.auth.forgotPassword.sending")
            }}</span>
            <Mail class="w-5 h-5" />
          </button>

          <p class="text-center text-sm text-[var(--text-secondary)] mt-4">
            {{ t("pages.auth.forgotPassword.rememberPassword") }}
            <NuxtLinkLocale
              to="/login"
              class="text-fuchsia-400 hover:text-cyan-400 font-medium"
            >
              {{ t("pages.auth.forgotPassword.signIn") }}
            </NuxtLinkLocale>
          </p>
        </form>
      </template>

      <!-- ✅ Success State -->
      <template v-else>
        <div
          class="flex flex-col items-center justify-center text-center py-12"
        >
          <div
            class="p-3 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-indigo-500 mb-4"
          >
            <CheckCircle2 class="w-10 h-10 text-white" />
          </div>
          <h2
            class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-indigo-400 mb-2"
          >
            {{ t("pages.auth.forgotPassword.successTitle") }}
          </h2>
          <p class="text-sm text-[var(--text-secondary)] max-w-xs mx-auto">
            {{ t("pages.auth.forgotPassword.successMessage", { email }) }}
          </p>
          <NuxtLinkLocale
            to="/login"
            class="mt-8 inline-block rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 py-2.5 px-6 hover:brightness-110 transition-all"
          >
            {{ t("pages.auth.forgotPassword.backToLogin") }}
          </NuxtLinkLocale>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@keyframes rotate-gradient {
  to {
    --angle: 360deg;
  }
}
.animate-rotate-gradient {
  background-size: 200% 200%;
  animation: rotate-gradient 10s linear infinite;
}
.input-dark {
  background-color: rgba(25, 27, 33, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-primary);
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  transition: all 0.25s ease;
}
.input-dark:focus {
  outline: none;
  border-color: rgba(236, 72, 153, 0.4);
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
}
</style>
