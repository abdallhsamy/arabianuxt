export type DataTableHeader = {
  key: string;
  label: string;
  class?: string;
};
export type DataTableProps = {
  headers: Array<DataTableHeader>;
  rows: Array<Record<string, unknown>>;
  rowKey?: string;
};
