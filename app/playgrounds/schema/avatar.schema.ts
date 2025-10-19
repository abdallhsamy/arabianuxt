import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const avatarSchema: PlaygroundSchema = {
  component: "Ui/Core/UiAvatar/UiAvatar.vue",
  title: "Avatar",
  props: [
    { key: "name", type: "string", default: "John Doe" },
    {
      key: "src",
      type: "string",
      default:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    {
      key: "size",
      type: "enum",
      options: ["sm", "md", "lg", "xl"],
      default: "md",
    },
    {
      key: "shape",
      type: "enum",
      options: ["circle", "square"],
      default: "circle",
    },
    {
      key: "status",
      type: "enum",
      options: ["online", "offline", "busy", "away"],
      default: "online",
    },
  ],
};
