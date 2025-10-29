export const UiDiffViewerLineTypes = {
  Context: "ctx",
  Add: "add",
  Delete: "del",
} as const;

export type UiDiffViewerLineType =
  (typeof UiDiffViewerLineTypes)[keyof typeof UiDiffViewerLineTypes];

export const UiDiffViewerDefaultValues = {
  before: "",
  after: "",
  showLineNumbers: true,
} as const;

export const UiDiffViewerDiffSymbols = {
  Add: "+",
  Delete: "-",
  Context: " ",
} as const;

export type DiffLine = {
  type: UiDiffViewerLineType;
  text: string;
  a?: number;
  b?: number;
};

export type UiDiffViewerProps = {
  before?: string;
  after?: string;
  showLineNumbers?: boolean;
};
