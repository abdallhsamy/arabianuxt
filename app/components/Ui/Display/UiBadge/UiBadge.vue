<script setup lang="ts">
import {
  UiBadgeColors,
  UiBadgeDefaults,
  type UiBadgeProps,
  UiBadgeSizes,
} from "./UiBadge.type";

const props = withDefaults(defineProps<UiBadgeProps>(), UiBadgeDefaults);

const colorMap = {
  [UiBadgeColors.Gray]:
    "from-gray-600 to-gray-500 text-gray-100 border-gray-600",
  [UiBadgeColors.Fuchsia]:
    "from-fuchsia-600 to-pink-500 text-fuchsia-100 border-fuchsia-600",
  [UiBadgeColors.Cyan]:
    "from-cyan-600 to-teal-500 text-cyan-100 border-cyan-600",
  [UiBadgeColors.Emerald]:
    "from-emerald-600 to-green-500 text-emerald-100 border-emerald-600",
  [UiBadgeColors.Amber]:
    "from-amber-600 to-orange-500 text-amber-100 border-amber-600",
  [UiBadgeColors.Rose]:
    "from-rose-600 to-pink-500 text-rose-100 border-rose-600",
  [UiBadgeColors.Indigo]:
    "from-indigo-600 to-blue-500 text-indigo-100 border-indigo-600",
};
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full text-xs font-medium select-none"
    :class="[
      props.size === UiBadgeSizes.Small ? 'px-2 py-0.5' : 'px-3 py-1',
      props.dot ? 'w-2 h-2 p-0' : '',
      props.glow ? 'shadow-lg' : '',
      props.variant === 'solid'
        ? `bg-gradient-to-r ${colorMap[props.color] || colorMap.fuchsia}`
        : props.variant === 'outline'
          ? `border ${(colorMap[props.color] || colorMap.fuchsia).split(' ')[2]}`
          : props.variant === 'glass'
            ? `bg-${props.color}-500/10 backdrop-blur-sm border border-${props.color}-500/20 text-${props.color}-300`
            : `bg-${props.color}-500/20 text-${props.color}-300`,
    ]"
  >
    <component
      v-if="props.icon && !props.dot"
      :is="props.icon"
      class="w-3 h-3 me-1"
    />
    <span v-if="!props.dot">{{ props.label }}</span>
  </span>
</template>
