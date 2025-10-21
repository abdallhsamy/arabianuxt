<script setup lang="ts">
import { computed } from "vue";
import {
  type UiSwitchProps,
  type UiSwitchEmits,
  UiSwitchDefaults,
} from "./UiSwitch.type";

const props = withDefaults(defineProps<UiSwitchProps>(), UiSwitchDefaults);

const emit = defineEmits<UiSwitchEmits>();

export const UiSwitchSizeClasses = {
  Small: { track: "w-9 h-5", knob: "w-4 h-4", offset: "translate-x-4" },
  Medium: { track: "w-11 h-6", knob: "w-5 h-5", offset: "translate-x-5" },
  Large: { track: "w-14 h-7", knob: "w-6 h-6", offset: "translate-x-7" },
} as const;

const s = computed(
  () => UiSwitchSizeClasses[props.size as keyof typeof UiSwitchSizeClasses]
);

const toggle = () => {
  if (props.disabled) return;
  const val = !props.modelValue;
  emit("update:modelValue", val);
  emit("change", val);
};
</script>

<template>
  <div
    class="inline-flex items-center gap-3 select-none"
    :class="props.disabled ? 'opacity-50' : ''"
  >
    <button
      type="button"
      :id="props.id"
      role="switch"
      :aria-checked="props.modelValue"
      :aria-disabled="props.disabled"
      @click="toggle"
      class="relative rounded-full border border-white/15 backdrop-blur-xl transition-all focus-visible:ring-2 ring-fuchsia-500/40"
      :class="[
        s.track,
        modelValue
          ? 'bg-gradient-to-r from-fuchsia-500/60 to-cyan-500/60'
          : 'bg-white/10',
      ]"
    >
      <span
        class="absolute top-1/2 -translate-y-1/2 left-1 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform"
        :class="[s.knob, modelValue ? s.offset : '']"
      />
    </button>
    <label v-if="label" :for="id" class="text-gray-200 text-sm">
      {{ label }}
    </label>
  </div>
</template>
