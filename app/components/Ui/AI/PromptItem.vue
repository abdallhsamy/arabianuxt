<script setup lang="ts">
const props = defineProps<{
  id: string;
  title: string;
  text: string;
  tags?: string[];
}>();

const emit = defineEmits<{
  (e: "use", id: string): void;
  (e: "copy", id: string): void;
  (e: "delete", id: string): void;
}>();

const onCopy = (): void => {
  navigator.clipboard.writeText(props.text);
  emit("copy", props.id);
};
</script>

<template>
  <div
    class="p-[2px] rounded-2xl bg-[conic-gradient(from_var(--angle),#8B5CF6_0%,#EC4899_55%,#22D3EE_100%)] animate-rotate-gradient"
  >
    <div
      class="rounded-2xl bg-[rgba(15,17,23,0.94)] border border-white/10 p-4"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h4 class="text-white font-semibold truncate">{{ title }}</h4>
          <p class="text-xs text-gray-400 line-clamp-2 mt-1">{{ text }}</p>
        </div>
        <div class="shrink-0 flex gap-2">
          <button
            class="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs"
            @click="$emit('use', id)"
          >
            Use
          </button>
          <button
            class="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs"
            @click="onCopy"
          >
            Copy
          </button>
          <button
            class="px-2 py-1 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 text-xs border border-rose-400/20"
            @click="$emit('delete', id)"
          >
            Delete
          </button>
        </div>
      </div>
      <div v-if="props.tags?.length" class="mt-3">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="t in props.tags"
            :key="t"
            class="text-[11px] px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-300/20"
          >
            {{ t }}
          </span>
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
</style>
