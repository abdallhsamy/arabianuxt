<script setup lang="ts">
import { ref, computed } from "vue";
import moment from "moment-hijri";
import type { UiDateRangePickerRangeValue } from "./UiDateRangePicker.type";
import { UiDateRangePickerDefaultValues } from "./UiDateRangePicker.type";

const UiDateRangePickerFormats = {
  Hijri: "iYYYY/iMM/iDD",
  Gregorian: "YYYY-MM-DD",
} as const;

const UI_DATE_RANGE_PICKER_SEPARATOR = " → ";

const modelValue = defineModel<UiDateRangePickerRangeValue | null>();

const showHijri = ref<boolean>(UiDateRangePickerDefaultValues.ShowHijri);

const formatted = computed(() => {
  if (!modelValue.value) {
    return "Select range";
  }

  const f = showHijri.value
    ? UiDateRangePickerFormats.Hijri
    : UiDateRangePickerFormats.Gregorian;
  return `${moment(modelValue.value.start).format(f)}${UI_DATE_RANGE_PICKER_SEPARATOR}${moment(modelValue.value.end).format(f)}`;
});

const pick = (): void => {
  const today = moment();
  modelValue.value = {
    start: today.format(),
    end: today
      .clone()
      .add(UiDateRangePickerDefaultValues.DefaultDays, "days")
      .format(),
  };
};
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      class="flex items-center justify-between bg-white/5 border border-white/10 px-4 py-2 rounded-xl"
    >
      <span class="text-gray-300">{{ formatted }}</span>
      <div class="flex items-center gap-2">
        <button
          class="text-xs text-fuchsia-400 underline"
          @click="showHijri = !showHijri"
        >
          {{ showHijri ? "Gregorian" : "Hijri" }}
        </button>
        <button
          class="px-2 py-1 bg-gradient-to-r from-fuchsia-600 to-cyan-600 text-white text-xs rounded-md"
          @click="pick"
        >
          Pick Range
        </button>
      </div>
    </div>
  </div>
</template>
