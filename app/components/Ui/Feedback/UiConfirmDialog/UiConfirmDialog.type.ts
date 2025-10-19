export type UiConfirmDialogProps = {
  modelValue: boolean;
  title?: string;
  message?: string;
};

export type UiConfirmDialogEmits = {
  (e: "update:modelValue", v: boolean): void;
  (e: "confirm"): void;
};
