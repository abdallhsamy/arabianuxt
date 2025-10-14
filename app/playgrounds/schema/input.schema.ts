import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const inputSchema: PlaygroundSchema = {
  component: "Ui/Form/UiInput/UiInput.vue",
  title: "Input",
  props: [
    { key: "modelValue", type: "string", default: "Sample text" },
    {
      key: "type",
      type: "enum",
      options: ["text", "email", "password", "number", "tel", "url"],
      default: "text",
    },
    { key: "label", type: "string", default: "Input Label" },
    { key: "placeholder", type: "string", default: "Enter text..." },
    {
      key: "variant",
      type: "enum",
      options: ["default", "outlined", "filled"],
      default: "default",
    },
    {
      key: "state",
      type: "enum",
      options: ["success", "warning", "error", "none"],
      default: "none",
    },
    { key: "message", type: "string", default: "" },
    { key: "size", type: "enum", options: ["sm", "md", "lg"], default: "md" },
    { key: "disabled", type: "boolean" },
    { key: "readonly", type: "boolean" },
    { key: "clearable", type: "boolean" },
    { key: "passwordToggle", type: "boolean" },
  ],
};
