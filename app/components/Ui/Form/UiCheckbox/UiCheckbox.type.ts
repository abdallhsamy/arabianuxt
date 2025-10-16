export const UiCheckboxSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;
export type UiCheckboxSize =
  (typeof UiCheckboxSizes)[keyof typeof UiCheckboxSizes];

export type UiCheckboxProps = {
  modelValue: boolean;
  id?: string;
  label?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  size?: UiCheckboxSize;
};

export const UiCheckboxDefaults = {
  size: UiCheckboxSizes.Medium,
};
