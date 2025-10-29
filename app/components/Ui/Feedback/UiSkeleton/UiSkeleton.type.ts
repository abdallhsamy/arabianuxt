export const UiSkeletonVariants = {
  Text: "text",
  Circle: "circle",
  Rect: "rect",
  Avatar: "avatar",
  Card: "card",
  Button: "button",
} as const;

export type UiSkeletonVariant =
  (typeof UiSkeletonVariants)[keyof typeof UiSkeletonVariants];

export const UiSkeletonAnimations = {
  Shimmer: "shimmer",
  Pulse: "pulse",
  None: false,
} as const;

export type UiSkeletonAnimation =
  (typeof UiSkeletonAnimations)[keyof typeof UiSkeletonAnimations];

export const UiSkeletonIntensities = {
  Subtle: "subtle",
  Medium: "medium",
  Strong: "strong",
} as const;

export type UiSkeletonIntensity =
  (typeof UiSkeletonIntensities)[keyof typeof UiSkeletonIntensities];

export const UiSkeletonDefaultValues = {
  variant: "text",
  width: "100%",
  radius: undefined,
  animation: "shimmer",
  speed: undefined,
  lines: 1,
  intensity: "medium",
} as const;

export const UiSkeletonIntensityAlphas = {
  Subtle: 0.05,
  Medium: 0.1,
  Strong: 0.2,
} as const;

export type UiSkeletonProps = {
  variant?: UiSkeletonVariant;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  animation?: UiSkeletonAnimation;
  speed?: number | string;
  lines?: number;
  intensity?: UiSkeletonIntensity;
};
