import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const tooltipSchema: PlaygroundSchema = {
  component: "Ui/Common/UiTooltip.vue",
  title: "Tooltip",
  props: [
    { key: "text", type: "string", default: "Tooltip text" },
    {
      key: "position",
      type: "enum",
      options: ["top", "right", "bottom", "left"],
      default: "top",
    },
    {
      key: "trigger",
      type: "enum",
      options: ["hover", "click", "focus"],
      default: "hover",
    },
    { key: "delay", type: "number", default: 150 },
    { key: "arrow", type: "boolean", default: true },
    {
      key: "color",
      type: "enum",
      options: ["fuchsia", "cyan", "emerald", "rose", "amber", "indigo"],
      default: "fuchsia",
    },
    { key: "glow", type: "boolean", default: true },
  ],
};
