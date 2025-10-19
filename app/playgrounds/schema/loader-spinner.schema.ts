import type { PlaygroundSchema } from "~/components/Ui/Playground/UiPlayground.type";

export const loaderSpinnerSchema: PlaygroundSchema = {
  component: "Ui/Display/UiLoaderSpinner/UiLoaderSpinner.vue",
  title: "Loader Spinner",
  props: [
    { key: "size", type: "number", default: 28 },
    { key: "color", type: "string", default: "#A855F7" },
  ],
};
