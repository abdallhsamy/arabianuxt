import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const chartPieSchema: PlaygroundSchema = {
  component: "Ui/Charts/UiChartPie.vue",
  title: "Pie Chart",
  props: [
    {
      key: "labels",
      type: "string",
      default: '["Desktop", "Mobile", "Tablet"]',
    },
    { key: "values", type: "string", default: "[65, 25, 10]" },
    {
      key: "colors",
      type: "string",
      default: '["#a855f7", "#06b6d4", "#10b981"]',
    },
  ],
};
