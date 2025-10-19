import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const emptyStateSchema: PlaygroundSchema = {
  component: "Ui/Display/UiEmptyState/UiEmptyState.vue",
  title: "Empty State",
  props: [
    { key: "title", type: "string", default: "No data found" },
    {
      key: "description",
      type: "string",
      default: "There are no items to display at the moment.",
    },
    { key: "icon", type: "string", default: "inbox" },
    { key: "actionLabel", type: "string", default: "Add Item" },
  ],
};
