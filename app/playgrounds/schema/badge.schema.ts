import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const badgeSchema: PlaygroundSchema = {
  component: "Ui/Display/UiBadge/UiBadge.vue",
  title: "Badge",
  props: [
    { key: "label", type: "string", default: "Badge" },
    {
      key: "variant",
      type: "enum",
      options: ["solid", "outline", "soft"],
      default: "soft",
    },
    {
      key: "color",
      type: "enum",
      options: ["gray", "fuchsia", "cyan", "emerald", "amber", "rose"],
      default: "fuchsia",
    },
    { key: "size", type: "enum", options: ["sm", "md"], default: "md" },
  ],
};
