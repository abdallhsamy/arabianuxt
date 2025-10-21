export type UiTagInputProps = {
  modelValue: string[];
  placeholder?: string;
};

export type UiTagInputEmits = {
  (e: "update:modelValue", v: string[]): void;
};
