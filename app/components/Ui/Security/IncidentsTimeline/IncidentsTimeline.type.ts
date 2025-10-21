import type { Component } from "vue";

export const IncidentsTimelineSeverities = {
  Critical: "critical",
  Warning: "warning",
  Info: "info",
} as const;

export type IncidentsTimelineSeverity =
  (typeof IncidentsTimelineSeverities)[keyof typeof IncidentsTimelineSeverities];

export const IncidentsTimelineDefaultValues = {
  IsLive: true,
  MaxIncidents: 20,
  IntervalDelay: 3000,
  InitialIncidents: 6,
} as const;

export type IncidentsTimelineIncident = {
  id: string;
  time: string;
  message: string;
  ip: string;
  location: string;
  severity: IncidentsTimelineSeverity;
  icon: Component;
};

export type IncidentsTimelineProps = {
  isLive?: boolean;
};
