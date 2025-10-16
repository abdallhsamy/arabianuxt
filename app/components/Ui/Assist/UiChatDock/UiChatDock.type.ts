export const AssistChatMessageFrom = {
  User: "user",
  AI: "ai",
} as const;

export type AssistChatMessageFromType =
  (typeof AssistChatMessageFrom)[keyof typeof AssistChatMessageFrom];

export interface AssistChatMessage {
  from: AssistChatMessageFromType;
  text: string;
}
