export interface UiCommandPaletteCommand {
  id: string;
  label: string;
  group?: string;
  action: () => void;
}

export type UiCommandPaletteProps = {
  commands: UiCommandPaletteCommand[];
};
