export interface UiMapWidgetProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
}

export const UiMapWidgetDefaults = {
  zoom: 13,
  height: "300px",
};
