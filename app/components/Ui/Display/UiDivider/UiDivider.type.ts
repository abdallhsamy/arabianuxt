export const UiDividerOrientations = {
  Horizontal: "horizontal",
  Vertical: "vertical",
} as const;

export type UiDividerOrientation =
  (typeof UiDividerOrientations)[keyof typeof UiDividerOrientations];

export type UiDividerProps = {
  label?: string;
  orientation?: UiDividerOrientation;
  gradient?: boolean;
};

export const UiDividerDefaults = {
  orientation: UiDividerOrientations.Horizontal,
  gradient: true,
};
