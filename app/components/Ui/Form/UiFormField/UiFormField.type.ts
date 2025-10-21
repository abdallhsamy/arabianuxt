export const UiFormFieldStates = {
  None: "none",
  Success: "success",
  Warning: "warning",
  Error: "error",
} as const;

export type UiFormFieldState =
  (typeof UiFormFieldStates)[keyof typeof UiFormFieldStates];

export const UiFormFieldSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiFormFieldSize =
  (typeof UiFormFieldSizes)[keyof typeof UiFormFieldSizes];

export const UiFormFieldParentThemes = {
  Dark: "dark",
  Light: "light",
  Gradient: "gradient",
} as const;

export type UiFormFieldParentTheme =
  (typeof UiFormFieldParentThemes)[keyof typeof UiFormFieldParentThemes];

export const UiFormFieldDefaultValues = {
  state: UiFormFieldStates.None,
  size: UiFormFieldSizes.Medium,
  parentTheme: UiFormFieldParentThemes.Dark,
  inline: false,
} as const;

export const UiFormFieldRequiredIndicator = "*" as const;

export type UiFormFieldProps = {
  id?: string;
  label?: string;
  message?: string;
  required?: boolean;
  state?: UiFormFieldState;
  size?: UiFormFieldSize;
  parentTheme?: UiFormFieldParentTheme;
  inline?: boolean;
};
