<script setup lang="ts">
import { computed } from "vue";

export interface UiAvatarProps {
  name?: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "square";
  status?: "online" | "offline" | "busy" | "away";
}

const props = withDefaults(defineProps<UiAvatarProps>(), {
  size: "md",
  shape: "circle",
  name: "",
});

const initials = computed(() =>
  props.name
    ? props.name
        .split(" ")
        .map(n => n[0]?.toUpperCase())
        .join("")
        .slice(0, 2)
    : "?"
);

const sizeClass = computed(
  () =>
    ({
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-14 h-14 text-base",
      xl: "w-20 h-20 text-lg",
    })[props.size]
);

const shapeClass = computed(() =>
  props.shape === "circle" ? "rounded-full" : "rounded-xl"
);

const statusColor = computed(
  () =>
    ({
      online: "bg-emerald-500",
      offline: "bg-gray-500",
      busy: "bg-rose-500",
      away: "bg-amber-500",
    })[props.status ?? "offline"]
);
</script>

<template>
  <div class="relative inline-block">
    <div
      class="flex items-center justify-center bg-white/10 text-gray-200 font-medium overflow-hidden border border-white/10"
      :class="[sizeClass, shapeClass]"
    >
      <img
        v-if="src"
        :src="src"
        alt=""
        class="w-full h-full object-cover"
        :class="shapeClass"
      />
      <span v-else>{{ initials }}</span>
    </div>
    <span
      v-if="status"
      class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black"
      :class="statusColor"
    />
  </div>
</template>
