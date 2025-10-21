export const UiSwitchSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiSwitchSize = (typeof UiSwitchSizes)[keyof typeof UiSwitchSizes];

export const UiSwitchDefaults = {
  size: UiSwitchSizes.Medium,
};

export type UiSwitchProps = {
  modelValue: boolean;
  id?: string;
  label?: string;
  disabled?: boolean;
  size?: UiSwitchSize;
};

export type UiSwitchEmits = {
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean): void;
};
