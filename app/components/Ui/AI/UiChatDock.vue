<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const isOpen = ref(false);
const input = ref("");
const messages = ref<Message[]>([
  {
    id: "1",
    role: "assistant",
    content: t("components.aiChatDock.welcomeMessage"),
  },
]);

const toggle = () => (isOpen.value = !isOpen.value);

const send = () => {
  if (!input.value.trim()) return;
  messages.value.push({
    id: crypto.randomUUID(),
    role: "user",
    content: input.value,
  });
  const userText = input.value;
  input.value = "";
  nextTick(() => {
    messages.value.push({
      id: crypto.randomUUID(),
      role: "assistant",
      content: t("components.aiChatDock.responsePrefix", { message: userText }),
    });
  });
};
</script>

<template>
  <div>
    <button
      class="fixed bottom-5 right-5 z-50 p-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-xl hover:scale-105 transition"
      @click="toggle"
    >
      💬
    </button>

    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed bottom-20 right-5 w-80 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
      >
        <header
          class="px-4 py-2 text-gray-100 font-semibold bg-gradient-to-r from-fuchsia-600/20 to-cyan-600/10"
        >
          {{ t("components.aiChatDock.title") }}
        </header>

        <div class="flex-1 p-3 space-y-2 overflow-y-auto max-h-96">
          <div
            v-for="m in messages"
            :key="m.id"
            class="px-3 py-2 rounded-lg max-w-[85%]"
            :class="
              m.role === 'user'
                ? 'bg-fuchsia-600/30 self-end text-right ml-auto'
                : 'bg-white/10 text-gray-100'
            "
          >
            {{ m.content }}
          </div>
        </div>

        <div class="border-t border-white/10 flex items-center p-2">
          <input
            v-model="input"
            type="text"
            :placeholder="t('components.aiChatDock.placeholder')"
            class="flex-1 bg-transparent text-gray-100 text-sm outline-none px-2"
            @keydown.enter="send"
          />
          <button
            class="px-3 text-fuchsia-400 hover:text-fuchsia-300"
            @click="send"
          >
            ↩
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
