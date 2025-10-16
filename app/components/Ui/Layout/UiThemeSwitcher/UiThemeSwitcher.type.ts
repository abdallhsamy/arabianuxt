export const UiThemes = {
  Light: "light",
  Dark: "dark",
  Fancy: "fancy",
} as const;

export type UiTheme = (typeof UiThemes)[keyof typeof UiThemes];

export const UI_THEME_SWITCHER_LS_KEY = "app:theme";

export type UiThemeSwitcherProps = {
  modelValue?: UiTheme;
  showLabel?: boolean;
};

export const UiThemeSwitcherDefaults = {
  showLabel: false,
};

export type UiThemeSwitcherEmits = {
  (e: "update:modelValue", v: UiTheme): void;
  (e: "change", v: UiTheme): void;
};
