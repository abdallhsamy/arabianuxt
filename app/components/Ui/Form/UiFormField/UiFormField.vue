<script setup lang="ts">
import {
  type UiFormFieldProps,
  type UiFormFieldState,
  UiFormFieldStates,
} from "./UiFormField.type";
import {
  UiFormFieldDefaultValues,
  UiFormFieldRequiredIndicator,
} from "./UiFormField.type";

withDefaults(defineProps<UiFormFieldProps>(), UiFormFieldDefaultValues);

const UiFormFieldLabelClasses = {
  Error: "text-rose-400",
  Success: "text-emerald-400",
  Default: "text-gray-300",
} as const;

const UiFormFieldMessageClasses = {
  Error: "text-rose-400",
  Warning: "text-amber-400",
  Success: "text-emerald-400",
  None: "text-gray-400",
} as const;

const getLabelClass = (state: UiFormFieldState): string => {
  switch (state) {
    case UiFormFieldStates.Error:
      return UiFormFieldLabelClasses.Error;
    case UiFormFieldStates.Success:
      return UiFormFieldLabelClasses.Success;
    default:
      return UiFormFieldLabelClasses.Default;
  }
};

const getMessageClass = (state: UiFormFieldState): string => {
  switch (state) {
    case UiFormFieldStates.Error:
      return UiFormFieldMessageClasses.Error;
    case UiFormFieldStates.Warning:
      return UiFormFieldMessageClasses.Warning;
    case UiFormFieldStates.Success:
      return UiFormFieldMessageClasses.Success;
    default:
      return UiFormFieldMessageClasses.None;
  }
};
</script>

<template>
  <div
    class="w-full"
    :class="inline ? 'flex items-center gap-3' : 'flex flex-col gap-1.5'"
  >
    <!-- Label (external; inputs with floating labels can ignore) -->
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium"
      :class="getLabelClass(state)"
    >
      {{ label }}
      <span v-if="required" class="text-rose-400">
        {{ UiFormFieldRequiredIndicator }}
      </span>
    </label>

    <!-- Control -->
    <div>
      <slot />
    </div>

    <!-- Message -->
    <p v-if="message" class="text-xs" :class="getMessageClass(state)">
      {{ message }}
    </p>
  </div>
</template>
