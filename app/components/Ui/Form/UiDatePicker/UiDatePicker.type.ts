export const UiDatePickerSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiDatePickerSize =
  (typeof UiDatePickerSizes)[keyof typeof UiDatePickerSizes];

export const UiDatePickerDefaultValues = {
  ModelValue: null,
  Size: UiDatePickerSizes.Medium,
  Disabled: false,
  SupportHijri: true,
} as const;

export type UiDatePickerCell = {
  date: Date;
  inMonth: boolean;
  label: number;
};

export type UiDatePickerProps = {
  modelValue: Date | null;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: UiDatePickerSize;
  supportHijri?: boolean;
};

export type UiDatePickerEmits = {
  (e: "update:modelValue", v: Date | null): void;
  (e: "update:hijri", v: string | null): void;
};
