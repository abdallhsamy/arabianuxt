export const UiLogConsoleLogLevels = {
  Debug: "debug",
  Info: "info",
  Warn: "warn",
  Error: "error",
} as const;

export type UiLogConsoleLogLevel =
  (typeof UiLogConsoleLogLevels)[keyof typeof UiLogConsoleLogLevels];

export const UiLogConsoleDefaultValues = {
  AutoScroll: true,
  ModelValue: () => [],
} as const;

export type UiLogConsoleLogItem = {
  id: string;
  ts: number;
  level: UiLogConsoleLogLevel;
  message: string;
};

export type UiLogConsoleProps = {
  modelValue?: UiLogConsoleLogItem[];
  autoScroll?: boolean;
};

export type UiLogConsoleEmits = {
  (e: "update:modelValue", v: UiLogConsoleLogItem[]): void;
};
