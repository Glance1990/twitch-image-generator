export interface ButtonProps {
  title: string;
  icon?: ButtonIcons;
  className: string;
  activeTab: string;
  clickHandler: (title: string) => void;
}

export enum ButtonIcons {
  settings = "GiSettingsKnobs",
  brush = "GiPaintBrush",
  wand = "GiMagickTrick",
  position = "GiPositionMarker",
}
