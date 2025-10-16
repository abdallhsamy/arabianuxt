import type { Component } from "vue";

export const UiBadgeColors = {
  Gray: "gray",
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Amber: "amber",
  Rose: "rose",
  Indigo: "indigo",
} as const;

export type UiBadgeColor = (typeof UiBadgeColors)[keyof typeof UiBadgeColors];

export const UiBadgeVariants = {
  Solid: "solid",
  Outline: "outline",
  Soft: "soft",
  Glass: "glass",
} as const;

export type UiBadgeVariant =
  (typeof UiBadgeVariants)[keyof typeof UiBadgeVariants];

export const UiBadgeSizes = {
  Small: "sm",
  Medium: "md",
} as const;

export type UiBadgeSize = (typeof UiBadgeSizes)[keyof typeof UiBadgeSizes];

export type UiBadgeProps = {
  label?: string;
  color?: UiBadgeColor;
  variant?: UiBadgeVariant;
  size?: UiBadgeSize;
  dot?: boolean;
  glow?: boolean;
  icon?: Component;
};

export const UiBadgeDefaults = {
  color: UiBadgeColors.Fuchsia,
  variant: UiBadgeVariants.Soft,
  size: UiBadgeSizes.Medium,
};
