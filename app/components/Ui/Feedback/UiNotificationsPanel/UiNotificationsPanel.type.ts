export type UiNotificationsPanelNotice = {
  id: string;
  title: string;
  body?: string;
  time?: string;
  read?: boolean;
};

export type UiNotificationsPanelProps = {
  modelValue: boolean;
  items: UiNotificationsPanelNotice[];
  title?: string;
};

export type UiNotificationsPanelEmits = {
  (e: "update:modelValue", v: boolean): void;
  (e: "select", v: UiNotificationsPanelNotice): void;
  (e: "mark-all-read"): void;
  (e: "clear-all"): void;
};
