import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const fileUploadSchema: PlaygroundSchema = {
  component: "Ui/Form/UiFileUpload/UiFileUpload.vue",
  title: "File Upload",
  props: [
    { key: "accept", type: "string", default: "image/*" },
    { key: "multiple", type: "boolean" },
    { key: "maxSize", type: "number", default: 5242880 },
    { key: "maxFiles", type: "number", default: 1 },
    { key: "label", type: "string", default: "Upload Files" },
    {
      key: "description",
      type: "string",
      default: "Drag and drop files here or click to browse",
    },
    { key: "disabled", type: "boolean" },
    { key: "showPreview", type: "boolean", default: true },
    {
      key: "variant",
      type: "enum",
      options: ["default", "outlined", "dashed"],
      default: "default",
    },
  ],
};
