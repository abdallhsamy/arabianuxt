export const UiSliderDefaultValues = {
  min: 0,
  max: 100,
  step: 1,
  showValue: true,
  disabled: false,
} as const;

export const UiSliderPercentageLimits = {
  Min: 0,
  Max: 100,
} as const;

export type UiSliderProps = {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  disabled?: boolean;
};

export type UiSliderEmits = {
  (e: "update:modelValue", value: number): void;
  (e: "change", value: number): void;
};
