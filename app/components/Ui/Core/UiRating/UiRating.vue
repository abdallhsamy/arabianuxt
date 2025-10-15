<script setup lang="ts">
import { ref } from "vue";
import { UiRatingIconShapes, type UiRatingProps } from "./UiRating.type";

const props = withDefaults(defineProps<UiRatingProps>(), {
  modelValue: 0,
  max: 5,
  icon: "star",
  readonly: false,
});

const emit = defineEmits<{ (e: "update:modelValue", v: number): void }>();

const hover = ref<number | null>(null);

const set = (i: number) => {
  if (props.readonly) return;
  emit("update:modelValue", i);
};
</script>

<template>
  <div class="flex gap-1 text-2xl select-none">
    <span
      v-for="i in props.max"
      :key="i"
      class="cursor-pointer transition-transform"
      :class="{
        'scale-110': hover === i,
        'opacity-60': i > (hover ?? props.modelValue),
      }"
      @mouseenter="hover = i"
      @mouseleave="hover = null"
      @click="set(i)"
    >
      {{
        i <= (hover ?? props.modelValue)
          ? UiRatingIconShapes[icon][1]
          : UiRatingIconShapes[icon][0]
      }}
    </span>
  </div>
</template>
