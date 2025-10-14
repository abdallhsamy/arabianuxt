import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const confirmDialogSchema: PlaygroundSchema = {
  component: "Ui/Feedback/UiConfirmDialog.vue",
  title: "Confirm Dialog",
  props: [
    { key: "title", type: "string", default: "Confirm Action" },
    {
      key: "message",
      type: "string",
      default: "Are you sure you want to proceed with this action?",
    },
    { key: "confirmText", type: "string", default: "Confirm" },
    { key: "cancelText", type: "string", default: "Cancel" },
    {
      key: "variant",
      type: "enum",
      options: ["default", "danger", "warning"],
      default: "default",
    },
    { key: "size", type: "enum", options: ["sm", "md", "lg"], default: "md" },
    { key: "closable", type: "boolean", default: true },
  ],
};
