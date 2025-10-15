import type { Component } from "vue";

export const UiDropdownTriggers = {
  Click: "click",
  Hover: "hover",
} as const;
export type UiDropdownTrigger =
  (typeof UiDropdownTriggers)[keyof typeof UiDropdownTriggers];

export const UiDropdownAligns = {
  Left: "left",
  Right: "right",
} as const;
export type UiDropdownAlign =
  (typeof UiDropdownAligns)[keyof typeof UiDropdownAligns];

export const UiDropdownPositions = {
  Top: "top",
  Bottom: "bottom",
} as const;
export type UiDropdownPosition =
  (typeof UiDropdownPositions)[keyof typeof UiDropdownPositions];

export const UiDropdownColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Rose: "rose",
  Indigo: "indigo",
} as const;
export type UiDropdownColor =
  (typeof UiDropdownColors)[keyof typeof UiDropdownColors];

interface BaseDropdownItem {
  id: string;
  icon?: Component;
  shortcut?: string;
  disabled?: boolean;
  color?: string;
}

export type DropdownItem =
  | (BaseDropdownItem & {
      divider: true;
      label?: never;
    })
  | (BaseDropdownItem & {
      divider?: false;
      label: string;
    });

export interface UiDropdownProps {
  label?: string;
  icon?: Component;
  items: DropdownItem[];
  trigger?: UiDropdownTrigger;
  align?: UiDropdownAlign;
  position?: UiDropdownPosition;
  glow?: boolean;
  glass?: boolean;
  color?: UiDropdownColor;
}
