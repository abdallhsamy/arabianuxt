<script setup lang="ts">
import { computed } from "vue";
import {
  UiRadioDefaults,
  type UiRadioProps,
  UiRadioSizes,
} from "./UiRadio.type";

const props = withDefaults(defineProps<UiRadioProps>(), UiRadioDefaults);
const emit = defineEmits(["update:modelValue", "change"]);

const s = computed(
  () =>
    ({
      [UiRadioSizes.Small]: { dot: "w-2 h-2", box: "w-4 h-4", font: "text-sm" },
      [UiRadioSizes.Medium]: {
        dot: "w-2.5 h-2.5",
        box: "w-5 h-5",
        font: "text-sm",
      },
      [UiRadioSizes.Large]: {
        dot: "w-3 h-3",
        box: "w-6 h-6",
        font: "text-base",
      },
    })[props.size]
);

const checked = computed(() => props.modelValue === props.value);

const select = () => {
  if (props.disabled) return;
  emit("update:modelValue", props.value);
  emit("change", props.value);
};
</script>

<template>
  <button
    type="button"
    :id="props.id"
    :name="props.name"
    role="radio"
    :aria-checked="checked"
    :aria-disabled="props.disabled"
    @click="select"
    class="inline-flex items-center gap-2 select-none"
    :class="props.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'"
  >
    <span
      class="rounded-full border border-white/15 backdrop-blur-xl bg-white/5 flex items-center justify-center transition-all focus-visible:ring-2 ring-fuchsia-500/40"
      :class="[
        s.box,
        checked
          ? 'border-transparent bg-gradient-to-br from-fuchsia-500/80 to-cyan-500/70 shadow-[0_0_10px_rgba(236,72,153,0.3)]'
          : '',
      ]"
    >
      <span v-if="checked" class="rounded-full bg-white" :class="s.dot" />
    </span>
    <span :class="['text-gray-200', s.font]" v-if="props.label">
      {{ props.label }}
    </span>
  </button>
</template>
