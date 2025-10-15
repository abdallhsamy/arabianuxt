import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const modalSchema: PlaygroundSchema = {
  component: "Ui/Common/UiModal/UiModal.vue",
  title: "UiModal",
  props: [
    { key: "title", type: "string", default: "UiModal Title" },
    {
      key: "size",
      type: "enum",
      options: ["sm", "md", "lg", "xl"],
      default: "md",
    },
    { key: "closable", type: "boolean", default: true },
    { key: "persistent", type: "boolean", default: false },
    { key: "glass", type: "boolean", default: true },
    { key: "blur", type: "boolean", default: true },
    { key: "scrollLock", type: "boolean", default: true },
  ],
};
