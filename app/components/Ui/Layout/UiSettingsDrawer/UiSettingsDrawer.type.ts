export const UiSettingsThemes = {
  Light: "light",
  Dark: "dark",
  Fancy: "fancy",
} as const;

export type UiSettingsTheme =
  (typeof UiSettingsThemes)[keyof typeof UiSettingsThemes];

export const UiSettingsDensity = {
  Comfortable: "comfortable",
  Compact: "compact",
} as const;

export type UiSettingsDensityValue =
  (typeof UiSettingsDensity)[keyof typeof UiSettingsDensity];

export const UiSettingsMotion = {
  Auto: "auto",
  Reduced: "reduced",
} as const;

export type UiSettingsMotionValue =
  (typeof UiSettingsMotion)[keyof typeof UiSettingsMotion];

export const UI_SETTINGS_LS_KEY = "app:settings" as const;

export type Settings = {
  theme: UiSettingsTheme;
  density: UiSettingsDensityValue;
  motion: UiSettingsMotionValue;
  glass: number; // 0..1
  rtl: boolean;
};

export type UiSettingsDrawerProps = {
  modelValue: boolean;
};

export type UiSettingsDrawerEmits = {
  (e: "update:modelValue", v: boolean): void;
  (e: "update:settings", v: Settings): void;
};
