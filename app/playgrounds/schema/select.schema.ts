import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const selectSchema: PlaygroundSchema = {
  component: "Ui/Form/UiSelect.vue",
  title: "Select",
  props: [
    { key: "modelValue", type: "string", default: "" },
    { key: "label", type: "string", default: "Select Country" },
    { key: "placeholder", type: "string", default: "Choose..." },
    {
      key: "options",
      type: "string",
      default:
        '[{"label":"Option 1","value":"opt1"},{"label":"Option 2","value":"opt2"},{"label":"Option 3","value":"opt3"}]',
    },
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
    { key: "searchable", type: "boolean", default: true },
    { key: "message", type: "string", default: "" },
    { key: "disabled", type: "boolean" },
    { key: "size", type: "enum", options: ["sm", "md", "lg"], default: "md" },
  ],
};
