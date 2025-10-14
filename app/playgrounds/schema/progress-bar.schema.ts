import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const progressBarSchema: PlaygroundSchema = {
  component: "Ui/Data/UiProgressBar.vue",
  title: "Progress Bar",
  props: [
    { key: "value", type: "number", default: 65 },
    { key: "max", type: "number", default: 100 },
    { key: "color", type: "string", default: "from-fuchsia-600 to-cyan-600" },
    { key: "showLabel", type: "boolean", default: true },
  ],
};
