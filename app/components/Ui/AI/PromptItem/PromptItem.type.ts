export type PromptItemProps = {
  id: string;
  title: string;
  text: string;
  tags?: string[];
};

export type PromptItemEmits = {
  (e: "use", id: string): void;
  (e: "copy", id: string): void;
  (e: "delete", id: string): void;
};
