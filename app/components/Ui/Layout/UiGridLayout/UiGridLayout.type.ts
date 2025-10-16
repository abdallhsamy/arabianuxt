export const UiGridLayoutGaps = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
  ExtraLarge: "xl",
} as const;

export type UiGridLayoutGap =
  (typeof UiGridLayoutGaps)[keyof typeof UiGridLayoutGaps];

export type UiGridLayoutCols = 1 | 2 | 3 | 4 | 5 | 6;

export type UiGridLayoutProps = {
  cols?: UiGridLayoutCols;
  gap?: UiGridLayoutGap;
  responsive?: boolean;
};

export const UiGridLayoutDefaults = {
  cols: 3 as UiGridLayoutCols,
  gap: UiGridLayoutGaps.Medium,
  responsive: true,
};
