export const UiRadioSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiRadioSize = (typeof UiRadioSizes)[keyof typeof UiRadioSizes];

export type UiRadioProps = {
  modelValue: string | number | null;
  value: string | number;
  name?: string;
  id?: string;
  label?: string;
  disabled?: boolean;
  size?: UiRadioSize;
};

export const UiRadioDefaults = {
  size: UiRadioSizes.Medium,
};
