export const UiTextareaVariants = {
  Default: "default",
  Outlined: "outlined",
  Filled: "filled",
} as const;

export type UiTextareaVariant =
  (typeof UiTextareaVariants)[keyof typeof UiTextareaVariants];

export const UiTextareaStates = {
  Success: "success",
  Warning: "warning",
  Error: "error",
  None: "none",
} as const;

export type UiTextareaState =
  (typeof UiTextareaStates)[keyof typeof UiTextareaStates];

export const UiTextareaParentThemes = {
  Dark: "dark",
  Light: "light",
  Gradient: "gradient",
} as const;

export type UiTextareaParentTheme =
  (typeof UiTextareaParentThemes)[keyof typeof UiTextareaParentThemes];

export const UiTextareaSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiTextareaSize =
  (typeof UiTextareaSizes)[keyof typeof UiTextareaSizes];

export const UiTextareaResize = {
  None: "none",
  Vertical: "vertical",
  Horizontal: "horizontal",
  Both: "both",
} as const;

export type UiTextareaResizeOption =
  (typeof UiTextareaResize)[keyof typeof UiTextareaResize];

export type UiTextareaProps = {
  modelValue: string;
  label?: string;
  placeholder?: string;
  variant?: UiTextareaVariant;
  state?: UiTextareaState;
  message?: string;
  maxLength?: number;
  autoResize?: boolean;
  rows?: number;
  disabled?: boolean;
  readonly?: boolean;
  parentTheme?: UiTextareaParentTheme;
  size?: UiTextareaSize;
  resize?: UiTextareaResizeOption;
};

export const UiTextareaDefaults = {
  variant: UiTextareaVariants.Default,
  state: UiTextareaStates.None,
  parentTheme: UiTextareaParentThemes.Dark,
  rows: 3,
  autoResize: true,
  disabled: false,
  readonly: false,
  size: UiTextareaSizes.Medium,
  resize: UiTextareaResize.Vertical, // ✅ user can resize vertically by default
};
