export const UiSelectMultiSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiSelectMultiSize =
  (typeof UiSelectMultiSizes)[keyof typeof UiSelectMultiSizes];

export const UiSelectMultiDefaultValues = {
  searchable: true,
  disabled: false,
  size: UiSelectMultiSizes.Medium,
} as const;

export type UiSelectMultiOption = {
  label: string;
  value: string | number;
};

export type UiSelectMultiProps = {
  modelValue: Array<string | number> | null | undefined;
  options: UiSelectMultiOption[];
  label?: string;
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  size?: UiSelectMultiSize;
};

export type UiSelectMultiEmits = {
  (e: "update:modelValue", v: Array<string | number>): void;
};
