import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const tabsSchema: PlaygroundSchema = {
  component: "Ui/Common/UiTabs.vue",
  title: "Tabs",
  props: [
    { key: "modelValue", type: "string", default: "tab1" },
    {
      key: "items",
      type: "string",
      default:
        '[{"id":"tab1","label":"Tab 1"},{"id":"tab2","label":"Tab 2"},{"id":"tab3","label":"Tab 3"}]',
    },
    {
      key: "variant",
      type: "enum",
      options: ["underline", "pill"],
      default: "underline",
    },
    { key: "vertical", type: "boolean", default: false },
    {
      key: "color",
      type: "enum",
      options: ["fuchsia", "cyan", "emerald", "rose", "indigo"],
      default: "fuchsia",
    },
    { key: "glow", type: "boolean", default: true },
  ],
};
