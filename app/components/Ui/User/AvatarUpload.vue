<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{ (e: "change", file: File | null): void }>();

const preview = ref<string | null>(null);
const onSelect = (e: Event): void => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  preview.value = URL.createObjectURL(file);
  emit("change", file);
};
</script>

<template>
  <div class="flex flex-col items-center">
    <div
      class="relative w-28 h-28 rounded-full overflow-hidden border-4 border-fuchsia-500/40"
    >
      <img
        v-if="preview"
        :src="preview"
        alt="Avatar"
        class="w-full h-full object-cover"
      />
      <div
        v-else
        class="w-full h-full bg-white/10 flex items-center justify-center text-gray-400"
      >
        No Image
      </div>
      <label
        class="absolute bottom-0 right-0 bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white text-xs px-2 py-1 rounded-full cursor-pointer"
      >
        Upload
        <input type="file" accept="image/*" class="hidden" @change="onSelect" />
      </label>
    </div>
  </div>
</template>
