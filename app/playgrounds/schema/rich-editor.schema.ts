import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const richEditorSchema: PlaygroundSchema = {
  component: "Ui/Editor/UiRichEditor.vue",
  title: "Rich Editor",
  props: [
    {
      key: "modelValue",
      type: "string",
      default: "<p>Start typing your content here...</p>",
    },
    { key: "placeholder", type: "string", default: "Write something..." },
    { key: "height", type: "string", default: "300px" },
    { key: "readonly", type: "boolean" },
    { key: "showToolbar", type: "boolean", default: true },
    {
      key: "toolbarItems",
      type: "string",
      default: '["bold","italic","underline","link","list","quote"]',
    },
  ],
};
