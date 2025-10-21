<script setup lang="ts">
import { ref } from "vue";
import type { UiTagInputProps, UiTagInputEmits } from "./UiTagInput.type";

const props = withDefaults(defineProps<UiTagInputProps>(), {
  placeholder: "Add tag…",
});

const emit = defineEmits<UiTagInputEmits>();

const text = ref("");

const add = (): void => {
  const v = text.value.trim();
  if (!v) return;
  const set = Array.from(new Set([...props.modelValue, v]));
  emit("update:modelValue", set);
  text.value = "";
};

const remove = (tag: string): void =>
  emit(
    "update:modelValue",
    props.modelValue.filter(t => t !== tag)
  );
</script>

<template>
  <div
    class="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-2 flex items-center gap-2 flex-wrap"
  >
    <span
      v-for="t in modelValue"
      :key="t"
      class="text-xs rounded-md border border-white/10 bg-white/10 px-2 py-0.5 text-gray-100"
    >
      {{ t }}
      <button class="ms-1 opacity-70 hover:opacity-100" @click="remove(t)">
        ×
      </button>
    </span>
    <input
      v-model="text"
      :placeholder="placeholder"
      class="flex-1 bg-transparent outline-none text-gray-100"
      @keydown.enter.prevent="add"
    />
  </div>
</template>
