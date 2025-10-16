export type SortDir = "asc" | "desc";
export type FieldAccessor<T> = (row: T) => unknown;

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  accessor?: keyof T | FieldAccessor<T>;
  sortable?: boolean;
  searchable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  hidden?: boolean;
  class?: string;
  filter?: {
    type: "text" | "select" | "range";
    options?: Array<{ label: string; value: string | number | boolean }>;
  };
}

export interface UiTableProps<T = Record<string, unknown>> {
  rows: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  defaultSort?: { key: string; dir: SortDir } | null;
  multiSort?: boolean;
  serverMode?: boolean;
  page?: number;
  pageSize?: number;
  total?: number;
  pageSizes?: number[];
  searchable?: boolean;
  searchPlaceholder?: string;
  debounceMs?: number;
  selectable?: boolean;
  rowKey?: (row: T) => string | number;
  dense?: boolean;
  rounded?: boolean;
  stickyHeader?: boolean;
}

export type UiTableEmits = {
  (e: "update:page", v: number): void;
  (e: "update:pageSize", v: number): void;
  (e: "selection-change", v: Array<string | number>): void;
  (e: "sort-change", v: { key: string; dir: SortDir }[]): void;
  (e: "filter-change", v: Record<string, string | number | boolean>): void;
  (e: "column-order-change", v: string[]): void;
  (e: "column-width-change", v: Record<string, number>): void;
  (e: "export"): void;
  (e: "search", v: string): void;
};

export const UiTableDefaults = {
  rows: () => [],
  columns: () => [],
  loading: false,
  defaultSort: null,
  multiSort: false,
  serverMode: false,
  page: 1,
  pageSize: 10,
  total: 0,
  pageSizes: () => [10, 25, 50, 100],
  searchable: true,
  searchPlaceholder: "Search…",
  debounceMs: 200,
  selectable: true,
  rowKey: (r: Record<string, unknown>) =>
    (r as { id?: string | number }).id ?? JSON.stringify(r),
  dense: false,
  rounded: true,
  stickyHeader: true,
};
