<script setup lang="ts">
import { ref } from "vue";
import { Lock, Unlock } from "lucide-vue-next";
import { useRouter } from "#imports";

definePageMeta({ layout: "auth" });

const { t } = useI18n();

const router = useRouter();
const password = ref("");
const isUnlocking = ref(false);
const unlocked = ref(false);

const unlock = async () => {
  if (!password.value) return;
  isUnlocking.value = true;
  await new Promise(r => setTimeout(r, 800));
  isUnlocking.value = false;
  unlocked.value = true;
  setTimeout(() => router.push("/dashboard"), 1200);
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen relative bg-[rgba(15,17,23,0.95)] backdrop-blur-2xl text-center"
  >
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.2),transparent_60%)] -z-10"
    ></div>

    <div
      class="rounded-3xl p-[2px] bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#EC4899_50%,#8B5CF6_100%)] animate-rotate-gradient"
    >
      <div
        class="rounded-3xl bg-[rgba(15,17,23,0.9)] backdrop-blur-xl border border-white/10 p-10 min-w-[320px]"
      >
        <component
          :is="unlocked ? Unlock : Lock"
          class="w-12 h-12 mx-auto mb-6"
          :class="unlocked ? 'text-cyan-400' : 'text-fuchsia-400'"
        />

        <h2 v-if="!unlocked" class="text-2xl font-semibold text-white mb-4">
          {{ t("pages.auth.locked.screenLocked") }}
        </h2>

        <p v-if="!unlocked" class="text-sm text-[var(--text-secondary)] mb-6">
          {{ t("pages.auth.locked.enterPasswordToUnlock") }}
        </p>

        <template v-if="!unlocked" class="space-y-4">
          <input
            v-model="password"
            type="password"
            :placeholder="t('pages.auth.locked.passwordPlaceholder')"
            class="input-dark w-full mb-5"
          />
          <button
            @click="unlock"
            :disabled="isUnlocking"
            class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-2"
          >
            {{
              isUnlocking
                ? t("pages.auth.locked.unlocking")
                : t("pages.auth.locked.unlock")
            }}
          </button>
        </template>

        <h2
          v-else
          class="text-2xl font-semibold text-cyan-400 mt-4 animate-pulse"
        >
          {{ t("pages.auth.locked.unlockedSuccess") }}
        </h2>
      </div>
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
