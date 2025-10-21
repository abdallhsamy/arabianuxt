export const UiApiConsoleHttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type UiApiConsoleHttpMethod =
  (typeof UiApiConsoleHttpMethods)[keyof typeof UiApiConsoleHttpMethods];

export const UiApiConsoleDefaultValues = {
  Method: UiApiConsoleHttpMethods.GET,
  Url: "",
  Body: "",
  Response: "",
  Status: "",
} as const;

export const UiApiConsoleStatuses = {
  Loading: "loading",
  Success: "success",
  Error: "error",
} as const;

export type UiApiConsoleStatus =
  (typeof UiApiConsoleStatuses)[keyof typeof UiApiConsoleStatuses];

export const UiApiConsoleMessages = {
  Title: "🧪 API Console",
  SendButton: "Send",
  UrlPlaceholder: "https://api.example.com/endpoint",
  BodyPlaceholder: "{ 'key': 'value' }",
  LoadingText: "⏳ Sending request...",
  SuccessPrefix: "✅",
  ErrorText: "❌ Request failed",
  NoResponseText: "No response yet.",
  MockResponsePrefix: "Mock response for",
} as const;

export const UiApiConsoleDelays = {
  MockDelay: 1000,
} as const;

export type UiApiConsoleApiRequest = {
  url: string;
  method: string;
  body: string;
  response: string;
  status: string;
};
