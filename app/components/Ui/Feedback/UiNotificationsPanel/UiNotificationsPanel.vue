<script setup lang="ts">
import { computed } from "vue";
import type {
  UiNotificationsPanelProps,
  UiNotificationsPanelEmits,
} from "./UiNotificationsPanel.type";

const props = defineProps<UiNotificationsPanelProps>();

const emit = defineEmits<UiNotificationsPanelEmits>();

const close = (): void => emit("update:modelValue", false);

const unreadCount = computed<number>(
  () => props.items.filter(i => !i.read).length
);
</script>

<template>
  <div v-if="props.modelValue" class="fixed inset-0 z-80">
    <div class="absolute inset-0 bg-black/45" @click="close"></div>

    <aside
      class="absolute right-0 top-0 h-full w-[28rem] max-w-[90vw] bg-black/70 backdrop-blur-xl border-l border-white/10 shadow-2xl flex flex-col"
      role="dialog"
      aria-modal="true"
      :aria-label="props.title || 'Notifications'"
    >
      <header class="p-4 border-b border-white/10 flex items-center gap-2">
        <h3 class="text-gray-100 font-semibold flex-1">
          {{ props.title || "Notifications" }}
          <span v-if="unreadCount" class="text-xs text-amber-300 ms-2"
            >({{ unreadCount }} new)</span
          >
        </h3>
        <button
          class="text-xs rounded-md border border-white/10 bg-white/5 px-2 py-1 text-gray-200 hover:bg-white/10"
          @click="$emit('mark-all-read')"
        >
          Mark all read
        </button>
        <button
          class="text-xs rounded-md border border-rose-500/30 bg-rose-500/10 px-2 py-1 text-rose-100 hover:bg-rose-500/15"
          @click="$emit('clear-all')"
        >
          Clear
        </button>
        <button
          class="ms-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-gray-200"
          @click="close"
        >
          ✕
        </button>
      </header>

      <ul class="p-3 space-y-2 overflow-y-auto flex-1">
        <li
          v-for="n in props.items"
          :key="n.id"
          class="rounded-xl border border-white/10 bg-white/5 p-3 cursor-pointer hover:bg-white/10"
          :class="n.read ? 'opacity-80' : ''"
          @click="$emit('select', n)"
        >
          <div class="flex items-start justify-between">
            <div class="text-gray-100 font-medium pr-2">{{ n.title }}</div>
            <div v-if="n.time" class="text-[11px] text-gray-500">
              {{ n.time }}
            </div>
          </div>
          <div v-if="n.body" class="text-sm text-gray-300 mt-1">
            {{ n.body }}
          </div>
        </li>

        <li v-if="!props.items.length" class="text-center text-gray-400 py-10">
          No notifications
        </li>
      </ul>
    </aside>
  </div>
</template>
