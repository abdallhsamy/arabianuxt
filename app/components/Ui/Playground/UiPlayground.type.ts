export type PlaygroundSchema = {
  component: string;
  title: string;
  props: {
    key: string;
    type: "string" | "boolean" | "enum" | "number";
    label?: string;
    options?: string[];
    default?: string | boolean | number;
  }[];
};
