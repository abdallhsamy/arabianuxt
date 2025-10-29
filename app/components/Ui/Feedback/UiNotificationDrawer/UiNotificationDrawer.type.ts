export const UiNotificationDrawerDefaultValues = {
  items: () => [],
} as const;

export const UiNotificationDrawerMessages = {
  Title: "Notifications",
  CloseButton: "Close",
} as const;

export const UiNotificationDrawerDimensions = {
  Width: "w-[28rem]",
  ZIndex: "z-71",
} as const;

export type UiNotificationDrawerNotice = {
  id: string;
  title: string;
  body?: string;
  time?: string;
};

export type UiNotificationDrawerProps = {
  modelValue: boolean;
  items?: UiNotificationDrawerNotice[];
};

export type UiNotificationDrawerEmits = {
  (e: "update:modelValue", v: boolean): void;
};
