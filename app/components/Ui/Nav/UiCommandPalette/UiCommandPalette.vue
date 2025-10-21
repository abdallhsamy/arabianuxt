<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import type {
  UiCommandPaletteProps,
  UiCommandPaletteEmits,
} from "./UiCommandPalette.type";
import { UiCommandPaletteKeyboardKeys } from "./UiCommandPalette.type";

const props = withDefaults(defineProps<UiCommandPaletteProps>(), {
  placeholder: "Type a command…",
});

const emit = defineEmits<UiCommandPaletteEmits>();

const q = ref("");
const idx = ref(0);

const close = (): void => emit("update:modelValue", false);

const filtered = computed(() =>
  props.commands.filter(c =>
    c.title.toLowerCase().includes(q.value.toLowerCase())
  )
);

const onKey = (e: KeyboardEvent): void => {
  if (!props.modelValue) return;
  if (e.key === UiCommandPaletteKeyboardKeys.Escape) close();
  else if (e.key === UiCommandPaletteKeyboardKeys.ArrowDown) {
    idx.value = Math.min(idx.value + 1, filtered.value.length - 1);
  } else if (e.key === UiCommandPaletteKeyboardKeys.ArrowUp) {
    idx.value = Math.max(idx.value - 1, 0);
  } else if (e.key === UiCommandPaletteKeyboardKeys.Enter) {
    filtered.value[idx.value]?.run();
    close();
  }
};

onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <div v-if="props.modelValue" class="fixed inset-0 z-70">
    <div class="absolute inset-0 bg-black/40" @click="close"></div>
    <div class="absolute inset-0 p-4 flex items-start justify-center">
      <div
        class="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl p-3"
      >
        <input
          v-model="q"
          :placeholder="props.placeholder"
          class="w-full bg-transparent outline-none text-gray-100 text-base px-2 py-2 border-b border-white/10"
        />
        <ul class="max-h-80 overflow-auto mt-2">
          <li
            v-for="(c, i) in filtered"
            :key="c.id"
            class="px-3 py-2 rounded-md cursor-pointer"
            :class="i === idx ? 'bg-white/10 text-gray-100' : 'text-gray-300'"
            @mouseenter="idx = i"
            @click="
              c.run();
              close();
            "
          >
            <div class="text-sm">{{ c.title }}</div>
            <div v-if="c.hint" class="text-xs text-gray-500">{{ c.hint }}</div>
          </li>
          <li
            v-if="!filtered.length"
            class="px-3 py-6 text-center text-gray-500"
          >
            No results
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
