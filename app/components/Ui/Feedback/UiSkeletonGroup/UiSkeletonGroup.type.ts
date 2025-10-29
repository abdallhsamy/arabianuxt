export const UiSkeletonGroupDefaultValues = {
  fadeDuration: 350,
} as const;

export type UiSkeletonGroupProps = {
  loading: boolean;
  fadeDuration?: number;
};

export type UiSkeletonGroupEmits = {
  (e: "loaded"): void;
};
