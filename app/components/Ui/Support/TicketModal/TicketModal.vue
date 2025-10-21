<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Send, MessageSquare, X } from "lucide-vue-next";
import type {
  TicketModalProps,
  TicketModalEmits,
  TicketModalMessage,
} from "./TicketModal.type";
import {
  TicketModalMessageFrom,
  TicketModalDefaultValues,
} from "./TicketModal.type";

const props = defineProps<TicketModalProps>();

const emit = defineEmits<TicketModalEmits>();

const messages = ref<TicketModalMessage[]>(
  props.initialMessages ?? TicketModalDefaultValues.InitialMessages
);

const input = ref("");

const TICKET_MODAL_AGENT_DELAY = 600;

const close = (): void => emit("update:open", false);

const send = async (): Promise<void> => {
  const v = input.value.trim();
  if (!v) {
    return;
  }
  messages.value.push({
    id: crypto.randomUUID?.() ?? String(Date.now()),
    from: TicketModalMessageFrom.User,
    text: v,
    time: TicketModalDefaultValues.Time,
  });
  input.value = "";
  await nextTick();
  setTimeout(() => {
    messages.value.push({
      id: crypto.randomUUID?.() ?? String(Date.now()),
      from: TicketModalMessageFrom.Agent,
      text: "Thanks! We are looking into it.",
      time: TicketModalDefaultValues.Time,
    });
  }, TICKET_MODAL_AGENT_DELAY);
};
</script>

<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
  >
    <div class="w-full max-w-2xl rounded-2xl overflow-hidden">
      <div
        class="p-[2px] bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_60%,#22D3EE_100%)] animate-rotate-gradient rounded-2xl"
      >
        <div
          class="bg-[rgba(15,17,23,0.96)] border border-white/10 rounded-2xl p-4"
        >
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2 text-white font-semibold">
              <MessageSquare class="w-5 h-5 text-cyan-400" />
              {{ subject }}
              <span class="text-gray-400 text-xs">#{{ ticketId }}</span>
            </div>
            <button class="text-gray-300 hover:text-white" @click="close">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="h-[46vh] overflow-y-auto space-y-3 pr-1">
            <div
              v-for="m in messages"
              :key="m.id"
              class="flex"
              :class="
                m.from === TicketModalMessageFrom.User
                  ? 'justify-end'
                  : 'justify-start'
              "
            >
              <div
                class="rounded-xl px-3 py-2 text-sm max-w-[80%] border"
                :class="
                  m.from === TicketModalMessageFrom.User
                    ? 'bg-gradient-to-r from-indigo-500/30 to-fuchsia-500/30 text-white border-white/10'
                    : 'bg-white/5 text-gray-200 border-white/10'
                "
              >
                {{ m.text }}
              </div>
            </div>
          </div>

          <form class="mt-3 flex gap-2" @submit.prevent="send">
            <input
              v-model="input"
              class="input-dark flex-1"
              placeholder="Reply…"
            />
            <button
              class="px-3 py-2 rounded-xl text-white bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 hover:brightness-110 transition-all"
            >
              <Send class="w-4 h-4" />
            </button>
          </form>
        </div>
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
  animation: rotate-gradient 12s linear infinite;
}

.input-dark {
  background-color: rgba(25, 27, 33, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: white;
  border-radius: 0.75rem;
  padding: 0.6rem 0.9rem;
  transition: all 0.25s ease;
}

.input-dark:focus {
  outline: none;
  border-color: rgba(236, 72, 153, 0.4);
  box-shadow: 0 0 0 2px rgba(236, 72, 153, 0.2);
}
</style>
