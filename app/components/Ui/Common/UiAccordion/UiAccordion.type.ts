import type { Component } from "vue";

export const UiAccordionOrientations = {
  Vertical: "vertical",
  Horizontal: "horizontal",
} as const;

export type UiAccordionOrientation =
  (typeof UiAccordionOrientations)[keyof typeof UiAccordionOrientations];

export const UiAccordionColors = {
  Fuchsia: "fuchsia",
  Cyan: "cyan",
  Emerald: "emerald",
  Rose: "rose",
  Indigo: "indigo",
  Amber: "amber",
} as const;

export type UiAccordionColor =
  (typeof UiAccordionColors)[keyof typeof UiAccordionColors];

export interface AccordionItem {
  id: string;
  title: string;
  content: string | (() => string);
  icon?: Component;
  disabled?: boolean;
}

export type UiAccordionProps = {
  items: AccordionItem[];
  multiple?: boolean;
  orientation?: UiAccordionOrientation;
  color?: UiAccordionColor;
  glow?: boolean;
  glass?: boolean;
  hover?: boolean;
};
