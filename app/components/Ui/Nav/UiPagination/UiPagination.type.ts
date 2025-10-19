export interface UiPaginationProps {
  page: number;
  total: number;
  perPage: number;
}

export type UiPaginationEmits = {
  (e: "update:page", v: number): void;
};
