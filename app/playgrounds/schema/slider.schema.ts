import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const sliderSchema: PlaygroundSchema = {
  component: "Ui/Form/UiSlider/UiSlider.vue",
  title: "Slider",
  props: [
    { key: "modelValue", type: "number", default: 50 },
    { key: "min", type: "number", default: 0 },
    { key: "max", type: "number", default: 100 },
    { key: "step", type: "number", default: 1 },
    { key: "label", type: "string", default: "Slider Label" },
    { key: "disabled", type: "boolean" },
    { key: "showValue", type: "boolean", default: true },
    {
      key: "color",
      type: "enum",
      options: ["primary", "secondary", "success", "warning", "danger"],
      default: "primary",
    },
  ],
};
