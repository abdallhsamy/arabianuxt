import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const ratingSchema: PlaygroundSchema = {
  component: "Ui/Core/UiRating.vue",
  title: "Rating",
  props: [
    { key: "modelValue", type: "number", default: 3 },
    { key: "max", type: "number", default: 5 },
    {
      key: "icon",
      type: "enum",
      options: ["star", "emoji", "heart"],
      default: "star",
    },
    { key: "readonly", type: "boolean" },
  ],
};
