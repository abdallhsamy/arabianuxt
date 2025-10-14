<script setup lang="ts">
import { computed, ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

export interface UiInputProps {
  modelValue: string;
  type?: "text" | "password" | "search" | "email" | "number";
  label?: string;
  placeholder?: string;
  error?: string;
  hint?: string;
  icon?: any;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
}

const props = withDefaults(defineProps<UiInputProps>(), {
  type: "text",
  modelValue: "",
});

const emit = defineEmits(["update:modelValue", "clear"]);

const showPassword = ref(false);
const inputType = computed(() =>
  props.type === "password"
    ? showPassword.value
      ? "text"
      : "password"
    : props.type
);
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" class="text-sm text-gray-300 font-medium">{{
      label
    }}</label>

    <div
      class="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/5 text-gray-200 focus-within:ring-2 focus-within:ring-fuchsia-500/40 backdrop-blur-lg"
      :class="{
        'opacity-50': disabled,
        'ring-rose-500/40 border-rose-500/20': error,
      }"
    >
      <component v-if="icon" :is="icon" class="w-4 h-4 text-gray-400" />
      <input
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="flex-1 bg-transparent outline-none placeholder:text-gray-500"
        @input="
          emit(
            'update:modelValue',
            ($event.target as HTMLInputElement)?.value || ''
          )
        "
      />
      <!-- Password Toggle -->
      <button
        v-if="props.type === 'password'"
        type="button"
        class="text-gray-400 hover:text-white"
        @click="showPassword = !showPassword"
      >
        <component :is="showPassword ? EyeOff : Eye" class="w-4 h-4" />
      </button>

      <!-- Clear Button -->
      <button
        v-if="clearable && modelValue"
        type="button"
        class="text-gray-400 hover:text-white"
        @click="(emit('update:modelValue', ''), emit('clear'))"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <p v-if="error" class="text-rose-400 text-xs">{{ error }}</p>
    <p v-else-if="hint" class="text-gray-400 text-xs">{{ hint }}</p>
  </div>
</template>
