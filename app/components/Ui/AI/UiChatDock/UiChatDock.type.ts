export const UiChatDockMessageRoles = {
  User: "user",
  Assistant: "assistant",
} as const;

export type UiChatDockMessageRole =
  (typeof UiChatDockMessageRoles)[keyof typeof UiChatDockMessageRoles];

export interface UiChatDockMessage {
  id: string;
  role: UiChatDockMessageRole;
  content: string;
}
