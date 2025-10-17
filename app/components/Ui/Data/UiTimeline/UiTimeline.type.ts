export interface TimelineEvent {
  title: string;
  description?: string;
  time?: string;
  color?: string;
}

export type UiTimelineProps = {
  events: TimelineEvent[];
};
