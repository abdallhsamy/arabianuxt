export const UiJsonInspectorDefaultValues = {
  RootKey: "root",
  Open: true,
} as const;

export const UiJsonInspectorTypeGuards = {
  isObject: (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null && !Array.isArray(v),
  isArray: (v: unknown): v is unknown[] => Array.isArray(v),
} as const;

export type UiJsonInspectorProps = {
  value: unknown;
  rootKey?: string;
};
