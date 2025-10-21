export const UiCommandPaletteKeyboardKeys = {
  Escape: "Escape",
  ArrowDown: "ArrowDown",
  ArrowUp: "ArrowUp",
  Enter: "Enter",
} as const;

export type Command = {
  id: string;
  title: string;
  hint?: string;
  run: () => void;
};

export type UiCommandPaletteProps = {
  modelValue: boolean;
  commands: Command[];
  placeholder?: string;
};

export type UiCommandPaletteEmits = {
  (e: "update:modelValue", v: boolean): void;
};
