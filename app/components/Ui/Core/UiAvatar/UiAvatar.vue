<script setup lang="ts">
import { computed } from "vue";
import {
  UiAvatarDefaults,
  type UiAvatarProps,
  UiAvatarShapes,
  UiAvatarSizes,
  UiAvatarStatuses,
} from "./UiAvatar.type";

const props = withDefaults(defineProps<UiAvatarProps>(), UiAvatarDefaults);

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
      [UiAvatarSizes.Small]: "w-8 h-8 text-xs",
      [UiAvatarSizes.Medium]: "w-10 h-10 text-sm",
      [UiAvatarSizes.Large]: "w-14 h-14 text-base",
      [UiAvatarSizes.ExtraLarge]: "w-20 h-20 text-lg",
    })[props.size]
);

const shapeClass = computed(() =>
  props.shape === UiAvatarShapes.Circle ? "rounded-full" : "rounded-xl"
);

const statusColor = computed(
  () =>
    ({
      [UiAvatarStatuses.Online]: "bg-emerald-500",
      [UiAvatarStatuses.Offline]: "bg-gray-500",
      [UiAvatarStatuses.Busy]: "bg-rose-500",
      [UiAvatarStatuses.Away]: "bg-amber-500",
    })[props.status ?? UiAvatarStatuses.Offline]
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
      class="absolute bottom-0 ltr:right-0 rtl:left-0 w-3 h-3 rounded-full border-2 border-black"
      :class="statusColor"
    />
  </div>
</template>
