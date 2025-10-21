export const UiFileUploadAdvancedDefaultValues = {
  Progress: 0,
} as const;

export type UiFileUploadAdvancedUploadedFile = {
  id: string;
  name: string;
  size: number;
  progress: number;
  preview?: string;
};

export type UiFileUploadAdvancedEmits = {
  (e: "files", files: File[]): void;
};
