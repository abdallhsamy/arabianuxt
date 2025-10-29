import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const chartAreaSchema: PlaygroundSchema = {
  component: "Ui/Charts/UiChartArea/UiChartArea.vue",
  title: "Area Chart",
  props: [
    {
      key: "labels",
      type: "string",
      default: '["Jan", "Feb", "Mar", "Apr", "May", "Jun"]',
    },
    {
      key: "datasets",
      type: "string",
      default:
        '[{"label":"Sales","data":[12,19,3,5,2,3],"color":"#a855f7"},{"label":"Revenue","data":[2,3,20,5,1,4],"color":"#06b6d4"}]',
    },
  ],
};
