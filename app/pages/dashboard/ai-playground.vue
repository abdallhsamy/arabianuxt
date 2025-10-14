<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const { t } = useI18n();

const models = ["gpt-4o-mini", "gpt-4o", "llama-3.1-70b", "mistral-large"];
const model = ref(models[0]);
const temperature = ref(0.7);
const system = ref("You are a concise assistant.");
const userInput = ref("");
const output = ref("");
const loading = ref(false);

const run = async (): Promise<void> => {
  const prompt = userInput.value.trim();
  if (!prompt) return;
  loading.value = true;
  output.value = "";
  // Simulate API
  setTimeout(() => {
    output.value = `🔮 Model: ${model.value}\n\nTemp: ${temperature.value}\n\nSystem: ${system.value}\n\n---\nResponse to: "${prompt}"\n\nThis is a mock response.`;
    loading.value = false;
  }, 700);
};
</script>

<template>
  <section class="space-y-6">
    <h1
      class="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-indigo-400 to-cyan-400"
    >
      {{ t("pages.aiPlayground.title") }}
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Controls -->
      <div
        class="lg:col-span-1 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#22D3EE_55%,#EC4899_100%)] animate-rotate-gradient"
      >
        <div
          class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-5 space-y-4"
        >
          <div>
            <label class="text-xs text-gray-400">{{
              t("pages.aiPlayground.model")
            }}</label>
            <select v-model="model" class="input-dark w-full mt-1">
              <option v-for="m in models" :key="m">{{ m }}</option>
            </select>
          </div>

          <div>
            <label class="text-xs text-gray-400"
              >{{ t("pages.aiPlayground.temperature") }}
              {{ temperature }}</label
            >
            <input
              v-model.number="temperature"
              type="range"
              min="0"
              max="1"
              step="0.1"
              class="w-full"
            />
          </div>

          <div>
            <label class="text-xs text-gray-400">{{
              t("pages.aiPlayground.systemPrompt")
            }}</label>
            <textarea
              v-model="system"
              class="input-dark w-full min-h-[90px] mt-1"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Chat Area -->
      <div
        class="lg:col-span-2 p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#22D3EE_0%,#8B5CF6_55%,#EC4899_100%)] animate-rotate-gradient"
      >
        <div
          class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-5"
        >
          <textarea
            v-model="userInput"
            class="input-dark w-full min-h-[120px]"
            :placeholder="t('pages.aiPlayground.promptPlaceholder')"
          ></textarea>
          <div class="mt-3 flex items-center justify-between">
            <span class="text-xs text-gray-400"
              >{{ t("pages.aiPlayground.tokensApprox") }}
              {{ Math.ceil(userInput.length / 4) }}</span
            >
            <button
              @click="run"
              class="px-5 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 font-semibold"
            >
              {{
                loading
                  ? t("pages.aiPlayground.running")
                  : t("pages.aiPlayground.run")
              }}
            </button>
          </div>

          <div class="mt-4">
            <label class="text-xs text-gray-400">{{
              t("pages.aiPlayground.output")
            }}</label>
            <pre
              class="bg-black/30 text-gray-200 p-3 rounded-xl text-sm whitespace-pre-wrap min-h-[140px]"
              >{{ output }}</pre
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.input-dark {
  background-color: rgba(25, 27, 33, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  border-radius: 0.75rem;
  padding: 0.6rem 0.9rem;
}
.input-dark:focus {
  outline: none;
  border-color: rgba(236, 72, 153, 0.4);
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
}
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
  animation: rotate-gradient 12s linear infinite;
}
</style>
