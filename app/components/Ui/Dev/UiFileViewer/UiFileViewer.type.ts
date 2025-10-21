export const UiFileViewerKinds = {
  Auto: "auto",
  Text: "text",
  Code: "code",
  Image: "image",
  Pdf: "pdf",
  Json: "json",
} as const;

export type UiFileViewerKind =
  (typeof UiFileViewerKinds)[keyof typeof UiFileViewerKinds];

export const UiFileViewerImageExtensions = /\.(png|jpg|jpeg|gif|webp|svg)$/i;

export const UiFileViewerPdfExtensions = /\.(pdf)$/i;

export const UiFileViewerDefaultValues = {
  Kind: "auto",
  Src: "",
  Code: "",
  Lang: "plaintext",
  Filename: "file.txt",
  DownloadFilename: "download.txt",
} as const;

export const UiFileViewerMimeTypes = {
  Json: "application/json",
  Text: "text/plain",
} as const;

export type UiFileViewerProps = {
  kind?: UiFileViewerKind;
  src?: string; // for image/pdf
  code?: string; // for text/code
  lang?: string; // for code highlight hint
  json?: unknown; // for JSON
  filename?: string;
};
