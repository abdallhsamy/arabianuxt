export const UiPromptHistoryRoles = {
  User: "user",
  Assistant: "assistant",
} as const;

export type UiPromptHistoryRole =
  (typeof UiPromptHistoryRoles)[keyof typeof UiPromptHistoryRoles];

export const UiPromptHistoryStorageKey = "ui_prompt_history" as const;

export type UiPromptHistoryPrompt = {
  id: string;
  role: UiPromptHistoryRole;
  content: string;
  ts: number;
};
