import type { Component } from "vue";

export interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: Component;
}

export type UiBreadcrumbProps = {
  items: BreadcrumbItem[];
};
