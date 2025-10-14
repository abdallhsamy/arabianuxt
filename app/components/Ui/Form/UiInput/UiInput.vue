<script setup lang="ts">
import { ref, computed } from "vue";
import {
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
} from "lucide-vue-next";
import {
  UiInputParentSizes,
  UiInputParentThemes,
  type UiInputProps,
  UiInputStates,
  UiInputVariants,
} from "./UiInput.type";

const props = withDefaults(defineProps<UiInputProps>(), {
  type: "text",
  variant: UiInputVariants.Default,
  state: UiInputStates.None,
  parentTheme: UiInputParentThemes.Dark,
  size: UiInputParentSizes.Medium,
  disabled: false,
  readonly: false,
  clearable: false,
  passwordToggle: false,
});

const emit = defineEmits(["update:modelValue", "clear"]);
const inputRef = ref<HTMLInputElement>();
const showPassword = ref(false);
const isFocused = ref(false);

const inputType = computed(() =>
  props.passwordToggle ? (showPassword.value ? "text" : "password") : props.type
);

const s = computed(
  () =>
    ({
      [UiInputParentSizes.Small]: { h: "h-10", font: "text-sm" },
      [UiInputParentSizes.Medium]: { h: "h-11", font: "text-sm" },
      [UiInputParentSizes.Large]: { h: "h-12", font: "text-base" },
    })[props.size]
);

const borderClass = computed(() => {
  switch (computedState.value) {
    case UiInputStates.Success:
      return "border-emerald-400 focus:ring-emerald-500/40";
    case UiInputStates.Warning:
      return "border-amber-400 focus:ring-amber-500/40";
    case UiInputStates.Error:
      return "border-rose-400 focus:ring-rose-500/40";
    default:
      return "border-white/10 focus:ring-fuchsia-500/40";
  }
});

const stateIcon = computed(() => {
  switch (computedState.value) {
    case UiInputStates.Success:
      return CheckCircle2;
    case UiInputStates.Warning:
      return AlertTriangle;
    case UiInputStates.Error:
      return AlertOctagon;
    default:
      return null;
  }
});

// Clear function removed as it was unused
const shouldFloat = computed(() => isFocused.value || !!props.modelValue);

// Computed state that prioritizes error state when errorMessage is provided
const computedState = computed(() => {
  if (props.errorMessage) return UiInputStates.Error;
  return props.state;
});

// Computed message that shows errorMessage when state is error
const computedMessage = computed(() => {
  if (props.errorMessage) return props.errorMessage;
  return props.message;
});
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <div
      class="relative flex items-center rounded-xl backdrop-blur-xl transition-all border focus-within:ring-2"
      :class="[
        s.h,
        borderClass,
        props.variant === UiInputVariants.Default && 'bg-white/5',
        props.variant === UiInputVariants.Outlined && 'bg-transparent',
        props.variant === UiInputVariants.Filled && 'bg-white/10',
        props.disabled && 'opacity-50 pointer-events-none',
      ]"
    >
      <!-- Floating label -->
      <label
        v-if="props.label"
        class="absolute ltr:left-3 rtl:right-3 transition-all duration-300 pointer-events-none select-none"
        :class="[
          shouldFloat
            ? [
                '-top-2 translate-y-0 text-xs font-medium px-2 rounded-md border backdrop-blur-md',
                props.parentTheme === UiInputParentThemes.Gradient
                  ? 'bg-gradient-to-r from-fuchsia-500/40 to-cyan-500/40 border-transparent text-white'
                  : props.parentTheme === UiInputParentThemes.Light
                    ? 'bg-black/70 border-white/20 text-white'
                    : 'bg-gray-900/85 border-white/15 text-fuchsia-300',
              ]
            : ['top-1/2 -translate-y-1/2 text-gray-400', s.font],
        ]"
      >
        {{ props.label }}
      </label>

      <input
        ref="inputRef"
        :type="inputType"
        :disabled="props.disabled"
        :readonly="props.readonly"
        class="flex-1 bg-transparent outline-none px-3 text-gray-100 truncate"
        :class="[s.font]"
        :placeholder="shouldFloat ? props.placeholder : ''"
        :value="props.modelValue"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />

      <button
        v-if="props.passwordToggle"
        type="button"
        class="text-gray-400 hover:text-gray-200 px-2"
        @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
      </button>

      <component
        v-if="stateIcon"
        :is="stateIcon"
        class="w-4 h-4 me-3"
        :class="{
          'text-emerald-400': computedState === UiInputStates.Success,
          'text-amber-400': computedState === UiInputStates.Warning,
          'text-rose-400': computedState === UiInputStates.Error,
        }"
      />
    </div>

    <p
      v-if="computedMessage"
      class="text-xs mt-0.5"
      :class="{
        'text-emerald-400': computedState === UiInputStates.Success,
        'text-amber-400': computedState === UiInputStates.Warning,
        'text-rose-400': computedState === UiInputStates.Error,
        'text-gray-400': computedState === UiInputStates.None,
      }"
    >
      {{ computedMessage }}
    </p>
  </div>
</template>
