import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const accordionSchema: PlaygroundSchema = {
  component: "Ui/Common/UiAccordion.vue",
  title: "Accordion",
  props: [
    {
      key: "items",
      type: "string",
      default:
        '[{"id":"item1","title":"Section 1","content":"Content for section 1"},{"id":"item2","title":"Section 2","content":"Content for section 2"},{"id":"item3","title":"Section 3","content":"Content for section 3"}]',
    },
    { key: "multiple", type: "boolean", default: false },
    {
      key: "orientation",
      type: "enum",
      options: ["vertical", "horizontal"],
      default: "vertical",
    },
    {
      key: "color",
      type: "enum",
      options: ["fuchsia", "cyan", "emerald", "rose", "indigo", "amber"],
      default: "fuchsia",
    },
    { key: "glow", type: "boolean", default: true },
    { key: "glass", type: "boolean", default: true },
    { key: "hover", type: "boolean", default: true },
  ],
};
