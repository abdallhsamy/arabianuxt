import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const tagInputSchema: PlaygroundSchema = {
  component: "Ui/Form/UiTagInput/UiTagInput.vue",
  title: "Tag Input",
  props: [
    { key: "modelValue", type: "string", default: '["tag1", "tag2"]' },
    { key: "placeholder", type: "string", default: "Add tags..." },
    { key: "separator", type: "string", default: "," },
    { key: "maxTags", type: "number", default: 10 },
    { key: "allowDuplicates", type: "boolean" },
    { key: "disabled", type: "boolean" },
    { key: "size", type: "enum", options: ["sm", "md", "lg"], default: "md" },
    {
      key: "variant",
      type: "enum",
      options: ["default", "outlined", "filled"],
      default: "default",
    },
  ],
};
