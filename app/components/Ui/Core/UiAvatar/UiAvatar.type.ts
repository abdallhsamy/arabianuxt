export const UiAvatarSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
  ExtraLarge: "xl",
} as const;

export type UiAvatarSize = (typeof UiAvatarSizes)[keyof typeof UiAvatarSizes];

export const UiAvatarShapes = {
  Circle: "circle",
  Square: "square",
} as const;

export type UiAvatarShape =
  (typeof UiAvatarShapes)[keyof typeof UiAvatarShapes];

export const UiAvatarStatuses = {
  Online: "online",
  Offline: "offline",
  Busy: "busy",
  Away: "away",
} as const;

export type UiAvatarStatus =
  (typeof UiAvatarStatuses)[keyof typeof UiAvatarStatuses];

export type UiAvatarProps = {
  name?: string;
  src?: string;
  size?: UiAvatarSize;
  shape?: UiAvatarShape;
  status?: UiAvatarStatus;
};

export const UiAvatarDefaults = {
  size: UiAvatarSizes.Small,
  shape: UiAvatarShapes.Circle,
  name: "",
};
