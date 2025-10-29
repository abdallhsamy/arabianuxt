export const UiFileUploadDefaultValues = {
  accept: "",
  multiple: true,
  maxSizeMb: 10,
} as const;

export const UiFileUploadBytesPerMB = 1024 * 1024;

export type UiFileUploadProps = {
  accept?: string;
  multiple?: boolean;
  maxSizeMb?: number;
};

export type UiFileUploadEmits = {
  (e: "files", v: File[]): void;
  (e: "error", v: string): void;
};
