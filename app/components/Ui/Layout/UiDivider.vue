<script setup lang="ts">
export interface UiDividerProps {
  label?: string;
  orientation?: "horizontal" | "vertical";
  gradient?: boolean;
}

const props = withDefaults(defineProps<UiDividerProps>(), {
  orientation: "horizontal",
  gradient: true,
});
</script>

<template>
  <div
    v-if="props.orientation === 'horizontal'"
    class="relative flex items-center w-full my-4"
  >
    <div
      class="flex-1 h-px"
      :class="
        props.gradient
          ? 'bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent'
          : 'bg-white/10'
      "
    />
    <span v-if="props.label" class="px-3 text-sm text-gray-400 font-medium">
      {{ props.label }}
    </span>
    <div
      class="flex-1 h-px"
      :class="
        props.gradient
          ? 'bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent'
          : 'bg-white/10'
      "
    />
  </div>

  <div
    v-else
    class="w-px h-full"
    :class="
      props.gradient
        ? 'bg-gradient-to-b from-transparent via-fuchsia-500/40 to-transparent'
        : 'bg-white/10'
    "
  />
</template>
