import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const themeSwitcherSchema: PlaygroundSchema = {
  component: "Ui/Layout/UiThemeSwitcher.vue",
  title: "Theme Switcher",
  props: [
    { key: "modelValue", type: "string", default: "dark" },
    { key: "variants", type: "string", default: '["light","dark","auto"]' },
    { key: "size", type: "enum", options: ["sm", "md", "lg"], default: "md" },
    { key: "showLabel", type: "boolean", default: true },
    { key: "iconOnly", type: "boolean" },
  ],
};
