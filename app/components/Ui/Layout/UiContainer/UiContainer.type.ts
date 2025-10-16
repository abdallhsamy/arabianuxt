export const UiContainerMaxes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
  ExtraLarge: "xl",
  Full: "full",
} as const;
export type UiContainerMax =
  (typeof UiContainerMaxes)[keyof typeof UiContainerMaxes];

export type UiContainerProps = {
  max?: UiContainerMax;
  padded?: boolean;
};

export const UiContainerDefaults = {
  max: UiContainerMaxes.ExtraLarge,
  padded: true,
};
