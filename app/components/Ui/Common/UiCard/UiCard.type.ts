export const UiCardVariants = {
  Glass: "glass",
  Solid: "solid",
  Gradient: "gradient",
  Outlined: "outlined",
} as const;

export type UiCardVariant =
  (typeof UiCardVariants)[keyof typeof UiCardVariants];

export const UiCardPaddings = {
  None: "none",
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiCardPadding =
  (typeof UiCardPaddings)[keyof typeof UiCardPaddings];

export const UiCardColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Rose: "rose",
  Indigo: "indigo",
  Amber: "amber",
} as const;

export type UiCardColor = (typeof UiCardColors)[keyof typeof UiCardColors];

export type UiCardProps = {
  title?: string;
  subtitle?: string;
  variant?: UiCardVariant;
  hoverable?: boolean;
  elevated?: boolean;
  padding?: UiCardPadding;
  color?: UiCardColor;
  rounded?: boolean;
  footer?: boolean;
};
