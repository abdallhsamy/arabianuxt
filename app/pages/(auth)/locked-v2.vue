<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Lock, LogIn } from "lucide-vue-next";

const { t } = useI18n();

const password = ref("");
const time = ref(
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
);
const unlock = (): void => alert(t("pages.auth.locked.unlocked"));
onMounted(() =>
  setInterval(
    () =>
      (time.value = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })),
    1000
  )
);
</script>

<template>
  <div
    class="fixed inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,#1f1f25,#0b0b0f)] text-white"
  >
    <div class="text-6xl font-light text-fuchsia-400 mb-6">{{ time }}</div>
    <div
      class="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6"
    >
      <Lock class="w-10 h-10 text-fuchsia-400" />
    </div>
    <div
      class="bg-white/10 backdrop-blur-lg border border-white/10 p-6 rounded-2xl w-80 flex flex-col gap-3 items-center"
    >
      <input
        v-model="password"
        type="password"
        class="input-dark w-full"
        :placeholder="t('pages.auth.locked.enterPassword')"
      />
      <button
        class="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110"
        @click="unlock"
      >
        <LogIn class="w-4 h-4" /> {{ t("pages.auth.locked.unlock") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.input-dark {
  background-color: rgba(25, 27, 33, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
}
</style>
