<script setup lang="ts">
import { ref, computed, nextTick } from "vue";
import { Smile, Paperclip, Send } from "lucide-vue-next";
import { useChatUserStore } from "~/store/chatUserStore";
import { useChatMessagesStore } from "~/store/chatMessagesStore";

const userStore = useChatUserStore();
const msgStore = useChatMessagesStore();

const open = ref(false);
const selectedUser = ref<string | null>(null);
const input = ref("");
const files = ref<File[]>([]);

const messages = computed(() =>
  selectedUser.value ? msgStore.byUser(selectedUser.value, userStore.me.id) : []
);

const otherUsers = computed(() =>
  userStore.users.filter(u => u.id !== userStore.me.id)
);

const unreadCount = computed(
  () =>
    msgStore.messages.filter(m => m.to === userStore.me.id && !m.read).length
);

const send = async (): Promise<void> => {
  const text = input.value.trim();
  if (!text || !selectedUser.value) return;
  msgStore.sendMessage(userStore.me.id, selectedUser.value, text);
  input.value = "";
  files.value = [];
  await nextTick();
  msgStore.autoReply(userStore.me.id, selectedUser.value);
};
</script>

<template>
  <!-- Floating Button -->
  <button
    class="fixed z-50 bottom-18 sm:bottom-4 ltr:right-4 rtl:left-4 w-12 h-12 p-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white shadow-lg hover:scale-105 transition"
    @click="open = !open"
  >
    <span class="absolute top-0 left-0 right-0 m-auto translate-y-1/2">
      💬
    </span>
    <span
      v-if="unreadCount"
      class="absolute -top-1 -right-1 bg-rose-500 text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-semibold"
    >
      {{ unreadCount }}
    </span>
  </button>

  <!-- Chat Panel -->
  <transition name="fade">
    <div
      v-if="open"
      class="fixed bottom-34 sm:bottom-20 ltr:right-6 rtl:left-6 w-[380px] max-w-[calc(100%-48px)] max-h-[580px] bg-black/80 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2"
      >
        <h3 class="font-semibold text-sm text-gray-100">
          {{ selectedUser ? "Chat" : "Messages" }}
        </h3>
        <button @click="open = false" class="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <!-- User list -->
      <div v-if="!selectedUser" class="flex-1 overflow-y-auto">
        <div
          v-for="u in otherUsers"
          :key="u.id"
          class="flex items-center gap-3 px-3 py-2 hover:bg-white/10 cursor-pointer"
          @click="selectedUser = u.id"
        >
          <img :src="u.avatar" class="w-9 h-9 rounded-full" />
          <div class="flex-1">
            <div class="text-gray-100 text-sm font-medium">{{ u.name }}</div>
            <div
              class="text-[11px]"
              :class="u.online ? 'text-emerald-400' : 'text-gray-500'"
            >
              {{ u.online ? "Online" : "Offline" }}
            </div>
          </div>
        </div>
      </div>

      <!-- Conversation -->
      <div v-else class="flex-1 flex flex-col">
        <!-- Back -->
        <div
          class="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2"
        >
          <button
            @click="selectedUser = null"
            class="text-gray-400 hover:text-white"
          >
            ←
          </button>
          <img
            :src="userStore.users.find(u => u.id === selectedUser)?.avatar"
            class="w-7 h-7 rounded-full"
          />
          <div class="flex-1 text-sm text-gray-200 font-medium">
            {{ userStore.users.find(u => u.id === selectedUser)?.name }}
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-3 space-y-3">
          <div
            v-for="m in messages"
            :key="m.id"
            class="max-w-[85%]"
            :class="m.from === userStore.me.id ? 'ml-auto text-right' : ''"
          >
            <div
              class="px-3 py-2 rounded-xl border border-white/10"
              :class="
                m.from === userStore.me.id ? 'bg-fuchsia-600/20' : 'bg-white/5'
              "
            >
              {{ m.text }}
            </div>
            <div class="text-[10px] text-gray-500 mt-1">
              {{ new Date(m.time).toLocaleTimeString() }}
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="border-t border-white/10 p-2">
          <div class="flex items-center gap-2">
            <button
              class="text-sm px-2 py-1 bg-white/10 text-gray-100 rounded hover:bg-white/15"
              @click="input += '🙂'"
            >
              <Smile class="w-4 h-4" />
            </button>

            <label
              class="text-sm px-2 py-1 bg-white/10 text-gray-100 rounded hover:bg-white/15 cursor-pointer"
            >
              <Paperclip class="w-4 h-4" />
              <input
                type="file"
                class="hidden"
                multiple
                @change="
                  files = Array.from(
                    ($event.target as HTMLInputElement).files || []
                  )
                "
              />
            </label>

            <input
              v-model="input"
              placeholder="Type a message..."
              class="flex-1 bg-transparent outline-none text-sm text-gray-100 px-2"
              @keyup.enter="send"
            />

            <button
              class="p-2 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white rounded hover:opacity-90 transition"
              @click="send"
            >
              <Send class="w-4 h-4" />
            </button>
          </div>

          <div v-if="files.length" class="mt-1 text-xs text-gray-400">
            {{ files.length }} file(s) selected
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
