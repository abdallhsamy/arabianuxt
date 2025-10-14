export const UiInputVariants = {
  Default: "default",
  Outlined: "outlined",
  Filled: "filled",
} as const;

export const UiInputStates = {
  Success: "success",
  Warning: "warning",
  Error: "error",
  None: "none",
} as const;

export const UiInputParentThemes = {
  Dark: "dark",
  Light: "light",
  Gradient: "gradient",
} as const;

export const UiInputParentSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiInputVariant =
  (typeof UiInputVariants)[keyof typeof UiInputVariants];

export type UiInputState = (typeof UiInputStates)[keyof typeof UiInputStates];

export type UiInputParentTheme =
  (typeof UiInputParentThemes)[keyof typeof UiInputParentThemes];

export type UiInputParentSize =
  (typeof UiInputParentSizes)[keyof typeof UiInputParentSizes];

export type UiInputProps = {
  modelValue: string;
  type?: string;
  label?: string;
  placeholder?: string;
  variant?: UiInputVariant;
  state?: UiInputState;
  message?: string;
  errorMessage?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  passwordToggle?: boolean;
  parentTheme?: UiInputParentTheme;
  size?: UiInputParentSize;
};
