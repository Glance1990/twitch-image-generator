import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface InputElementProps {
  inputElementName: InputElementTypes;
}

export enum InputElementTypes {
  inputText = "inputText",
  fontSize = "fontSize",
  fontWeight = "fontWeight",
}
