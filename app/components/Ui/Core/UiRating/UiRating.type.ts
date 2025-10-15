export const UiRatingIcons = {
  Star: "star",
  Emoji: "emoji",
  Heart: "heart",
} as const;
export type UiRatingIcon = (typeof UiRatingIcons)[keyof typeof UiRatingIcons];

export type UiRatingProps = {
  modelValue?: number;
  max?: number;
  icon?: UiRatingIcon;
  readonly?: boolean;
};

export const UiRatingIconShapes: Record<UiRatingIcon, [string, string]> = {
  [UiRatingIcons.Star]: ["☆", "★"],
  [UiRatingIcons.Emoji]: ["😐", "😍"],
  [UiRatingIcons.Heart]: ["♡", "❤️"],
};
