import type { Component } from "vue";

export const UiButtonVariants = {
  Primary: "primary",
  Secondary: "secondary",
  Danger: "danger",
  Success: "success",
  Outline: "outline",
  Glass: "glass",
} as const;

export type UiButtonVariant =
  (typeof UiButtonVariants)[keyof typeof UiButtonVariants];

export const UiButtonSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
} as const;

export type UiButtonSize = (typeof UiButtonSizes)[keyof typeof UiButtonSizes];

export const UiButtonIconPositions = {
  Left: "left",
  Right: "right",
} as const;

export type UiButtonIconPosition =
  (typeof UiButtonIconPositions)[keyof typeof UiButtonIconPositions];

export type UiButtonProps = {
  label?: string;
  icon?: Component;
  variant?: UiButtonVariant;
  size?: UiButtonSize;
  loading?: boolean;
  disabled?: boolean;
  full?: boolean;
  iconOnly?: boolean;
  toggleable?: boolean;
  modelValue?: boolean;
  iconPosition?: UiButtonIconPosition;
  ariaLabel?: string;
};
