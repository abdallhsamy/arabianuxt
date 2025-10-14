<script setup lang="ts">
defineProps<{
  n: { id: string; text: string; type: string; read: boolean; time: string };
}>();
</script>

<template>
  <div
    class="flex justify-between items-start p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
    :class="!n.read ? 'ring-1 ring-fuchsia-500/30' : ''"
  >
    <div>
      <p class="text-white text-sm">{{ n.text }}</p>
      <p class="text-xs text-gray-400 mt-1">{{ n.time }}</p>
    </div>
    <span
      class="text-xs px-2 py-1 rounded-full capitalize"
      :class="
        n.type === 'system'
          ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-300/30'
          : n.type === 'billing'
            ? 'bg-amber-400/10 text-amber-300 border border-amber-300/30'
            : 'bg-rose-500/10 text-rose-400 border border-rose-400/30'
      "
      >{{ n.type }}</span
    >
  </div>
</template>
