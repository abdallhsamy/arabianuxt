<script setup lang="ts">
import type {
  UiNotificationDrawerProps,
  UiNotificationDrawerEmits,
} from "./UiNotificationDrawer.type";
import { UiNotificationDrawerDefaultValues } from "./UiNotificationDrawer.type";

const props = withDefaults(
  defineProps<UiNotificationDrawerProps>(),
  UiNotificationDrawerDefaultValues
);

const emit = defineEmits<UiNotificationDrawerEmits>();

const close = (): void => emit("update:modelValue", false);
</script>

<template>
  <div v-if="props.modelValue" class="fixed inset-0 z-71">
    <div class="absolute inset-0 bg-black/40" @click="close"></div>
    <aside
      class="absolute right-0 top-0 h-full w-[28rem] bg-black/70 backdrop-blur-xl border-l border-white/10 p-4"
    >
      <header class="flex items-center justify-between mb-2">
        <h3 class="text-gray-100 font-semibold">Notifications</h3>
        <button
          class="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-gray-200"
          @click="close"
        >
          Close
        </button>
      </header>
      <ul class="space-y-2">
        <li
          v-for="n in props.items"
          :key="n.id"
          class="rounded-xl border border-white/10 bg-white/5 p-3"
        >
          <div class="text-gray-100 font-medium">{{ n.title }}</div>
          <div v-if="n.body" class="text-xs text-gray-400 mt-1">
            {{ n.body }}
          </div>
          <div v-if="n.time" class="text-[11px] text-gray-500 mt-1">
            {{ n.time }}
          </div>
        </li>
      </ul>
    </aside>
  </div>
</template>
