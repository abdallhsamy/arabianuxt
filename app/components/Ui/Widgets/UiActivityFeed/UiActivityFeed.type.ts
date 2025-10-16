export const FeedItemsTypes = {
  Success: "success",
  Info: "info",
  Warning: "warning",
  Error: "error",
} as const;

export type FeedItemsType =
  (typeof FeedItemsTypes)[keyof typeof FeedItemsTypes];

export interface FeedItem {
  id: string;
  title: string;
  description?: string;
  time: string;
  type?: FeedItemsType;
}

export type UiActivityFeedProps = {
  items: FeedItem[];
};
