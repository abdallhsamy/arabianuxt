export const UiToastTypes = {
  Success: "success",
  Error: "error",
  Warning: "warning",
  Info: "info",
  Custom: "custom",
} as const;
export type UiToastType = (typeof UiToastTypes)[keyof typeof UiToastTypes];

export const UiToastPositions = {
  TopLeft: "top-left",
  TopRight: "top-right",
  BottomLeft: "bottom-left",
  BottomRight: "bottom-right",
} as const;
export type UiToastPosition =
  (typeof UiToastPositions)[keyof typeof UiToastPositions];

export type UiToast = {
  id?: string;
  title: string;
  message?: string;
  type?: UiToastType;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
  groupKey?: string;
};

export type UiToasterProps = {
  position?: UiToastPosition;
};
