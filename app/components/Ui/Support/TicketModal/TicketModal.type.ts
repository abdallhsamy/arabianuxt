export const TicketModalMessageFrom = {
  User: "user",
  Agent: "agent",
} as const;

export type TicketModalMessageFromType =
  (typeof TicketModalMessageFrom)[keyof typeof TicketModalMessageFrom];

export type TicketModalMessage = {
  id: string;
  from: TicketModalMessageFromType;
  text: string;
  time: string;
};

export type TicketModalProps = {
  open: boolean;
  ticketId: string;
  subject: string;
  initialMessages?: TicketModalMessage[];
};

export type TicketModalEmits = {
  (e: "update:open", v: boolean): void;
};

export const TicketModalDefaultValues = {
  InitialMessages: Array<TicketModalMessage>(),
  Time: "now",
} as const;
