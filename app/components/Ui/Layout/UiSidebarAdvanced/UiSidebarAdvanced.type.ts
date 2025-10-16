import type { Component } from "vue";

export type NavItem = {
  label: string;
  icon?: Component;
  to?: string;
  badge?: string | number;
  children?: NavItem[];
};

export type UiSidebarAdvancedProps = {
  items: NavItem[];
  expanded?: boolean;
};

export const UiSidebarAdvancedDefaults = {
  items: () => [],
  expanded: true,
};
