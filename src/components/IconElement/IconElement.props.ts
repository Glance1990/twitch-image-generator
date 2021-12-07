import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface IconElementProps {
  title: string;
}

export enum ButtonIcons {
  settings = "GiSettingsKnobs",
  brush = "GiPaintBrush",
  wand = "GiMagickTrick",
  position = "GiPositionMarker",
}
