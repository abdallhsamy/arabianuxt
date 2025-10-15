import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const alertSchema: PlaygroundSchema = {
  component: "Ui/Common/UiAlert/UiAlert.vue",
  title: "Alert",
  props: [
    {
      key: "type",
      type: "enum",
      options: ["info", "success", "warning", "error"],
      default: "info",
    },
    { key: "title", type: "string", default: "Alert Title" },
    {
      key: "message",
      type: "string",
      default: "Alert message content goes here.",
    },
    { key: "dismissible", type: "boolean", default: true },
    { key: "autoClose", type: "boolean", default: false },
    { key: "duration", type: "number", default: 4000 },
  ],
};
