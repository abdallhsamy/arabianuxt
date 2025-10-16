export const ToastTypes = {
  Info: "info",
  Success: "success",
  Warning: "warning",
  Error: "error",
} as const;

export type ToastType = (typeof ToastTypes)[keyof typeof ToastTypes];

export interface Toast {
  id: string;
  type?: ToastType;
  text: string;
  duration?: number;
}
