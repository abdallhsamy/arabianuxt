export const UiSelectAsyncDefaultValues = {
  placeholder: "Search…",
} as const;

export type UiSelectAsyncOption = {
  label: string;
  value: string | number;
};

export type UiSelectAsyncProps = {
  modelValue: string | number | null;
  fetcher: (q: string) => Promise<UiSelectAsyncOption[]>;
  placeholder?: string;
};

export type UiSelectAsyncEmits = {
  (e: "update:modelValue", v: string | number | null): void;
};
