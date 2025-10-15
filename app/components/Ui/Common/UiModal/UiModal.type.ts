export const UiModalSizes = {
  Small: "sm",
  Medium: "md",
  Large: "lg",
  ExtraLarge: "xl",
} as const;

export type UiModalSize = (typeof UiModalSizes)[keyof typeof UiModalSizes];

export type UiModalProps = {
  modelValue: boolean;
  title?: string;
  size?: UiModalSize;
  closable?: boolean;
  persistent?: boolean;
  blur?: boolean;
  glass?: boolean;
  scrollLock?: boolean;
};
