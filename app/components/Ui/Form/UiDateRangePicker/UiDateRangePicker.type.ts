export const UiDateRangePickerDefaultValues = {
  ShowHijri: false,
  DefaultDays: 7,
} as const;

export type UiDateRangePickerRangeValue = {
  start: string;
  end: string;
};
