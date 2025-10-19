export const KanbanTaskStatus = {
  Todo: "todo",
  Progress: "progress",
  Done: "done",
} as const;

export type KanbanTaskStatusType =
  (typeof KanbanTaskStatus)[keyof typeof KanbanTaskStatus];

export interface KanbanTask {
  id: string;
  title: string;
  status: KanbanTaskStatusType;
}

export type UiKanbanBoardProps = {
  modelValue: KanbanTask[];
};

export type UiKanbanBoardEmits = {
  (e: "update:modelValue", v: KanbanTask[]): void;
};
