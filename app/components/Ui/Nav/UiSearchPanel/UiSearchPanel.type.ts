export interface SearchItem {
  id: string;
  title: string;
  category?: string;
}

export type UiSearchPanelProps = {
  modelValue: boolean;
  items: SearchItem[];
};

export type UiSearchPanelEmits = {
  (e: "update:modelValue", v: boolean): void;
};
