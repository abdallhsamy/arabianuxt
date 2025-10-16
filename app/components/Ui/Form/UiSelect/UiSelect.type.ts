export type Option = {
  label: string;
  value: string | number;
};

export const UiSelectVariants = {
  Default: "default",
  Outlined: "outlined",
  Filled: "filled",
} as const;

export type UiSelectVariant =
  (typeof UiSelectVariants)[keyof typeof UiSelectVariants];

export const UiSelectStates = {
  Success: "success",
  Warning: "warning",
  Error: "error",
  None: "none",
} as const;

export type UiSelectState =
  (typeof UiSelectStates)[keyof typeof UiSelectStates];

export const UiSelectParentThemes = {
  Dark: "dark",
  Light: "light",
  Gradient: "gradient",
} as const;

export type UiSelectParentTheme =
  (typeof UiSelectParentThemes)[keyof typeof UiSelectParentThemes];

export const UiSelectSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiSelectSize = (typeof UiSelectSizes)[keyof typeof UiSelectSizes];

export type UiSelectProps = {
  modelValue: string | number | null;
  label?: string;
  placeholder?: string;
  options: Option[];
  variant?: UiSelectVariant;
  state?: UiSelectState;
  searchable?: boolean;
  message?: string;
  disabled?: boolean;
  parentTheme?: UiSelectParentTheme;
  size?: UiSelectSize;
};

export const UiSelectDefaults = {
  variant: UiSelectVariants.Default,
  state: UiSelectStates.None,
  parentTheme: UiSelectParentThemes.Dark,
  disabled: false,
  searchable: false,
  size: UiSelectSizes.Medium,
};
