export const UiTabsVariants = {
  Underline: "underline",
  Pill: "pill",
} as const;

export type UiTabsVariant =
  (typeof UiTabsVariants)[keyof typeof UiTabsVariants];

export const UiTabsColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Rose: "rose",
  Indigo: "indigo",
} as const;

export type UiTabsColor = (typeof UiTabsColors)[keyof typeof UiTabsColors];

export interface TabItem {
  id: string;
  label: string;
  icon?: any;
  disabled?: boolean;
}

export type UiTabsProps = {
  modelValue?: string;
  items: TabItem[];
  variant?: UiTabsVariant;
  vertical?: boolean;
  color?: UiTabsColor;
  glow?: boolean;
};
