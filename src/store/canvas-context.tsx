import { createContext, useState } from "react";

export interface inputItem {
  value: number | string;
  label: string;
  type: string;
  inputMin?: any;
  inputMax?: any;
  inputStep?: any;
  updateValue: (val: string | number) => void;
}

export interface simpleProperty {
  value: boolean;
  updateValue: (val: boolean) => void;
}

export interface AppContext {
  // [inputElementName: string]: object;
  inputText: inputItem;
  fontSize: inputItem;
  fontWeight: inputItem;
  fontStyleItalic: simpleProperty;
  iconScale: inputItem;
  iconShadowAngle: inputItem;
}

const CanvasContext = createContext<AppContext>({
  inputText: {
    value: "Testing",
    label: "Input text",
    type: "text",
    updateValue: (val) => {},
  },
  fontSize: {
    value: "12",
    label: "Text input",
    type: "range",
    inputMin: 20,
    inputMax: 70,
    inputStep: 1,
    updateValue: (val) => {},
  },
  fontWeight: {
    value: 300,
    label: "Font weight",
    type: "range",
    inputMin: 100,
    inputMax: 900,
    inputStep: 100,
    updateValue: (val) => {},
  },
  fontStyleItalic: {
    value: false,
    updateValue: (val) => {},
  },
  iconScale: {
    value: 1,
    label: "Icon scale",
    type: "range",
    inputMin: 1,
    inputMax: 100,
    inputStep: 1,
    updateValue: (val) => {},
  },
  iconShadowAngle: {
    value: 45,
    label: "Icon Shadow Angle",
    type: "range",
    inputMin: 0,
    inputMax: 360,
    inputStep: 1,
    updateValue: (val) => {},
  },
});

export const CanvasContextProvider: React.FC = ({ children }) => {
  const [inputText, changeInputText] = useState("Testing");
  const [fontSize, setFontSize] = useState(45);
  const [fontWeight, setFontWeight] = useState(300);
  const [fontStyle, setFontStyle] = useState(false);
  const [iconScale, setIconScale] = useState(80);
  const [iconShadowAngle, setIconShadowAngle] = useState(45);

  function changeInputTextHandler(val: any): void {
    changeInputText(val);
  }

  function changeFontSizeHandler(val: any): void {
    setFontSize(val);
  }

  function changeFontWeightHandler(val: any): void {
    setFontWeight(val);
  }

  function changeFontStyleItalic(val: boolean): void {
    setFontStyle(val);
  }

  function changeIconScale(val: any): void {
    setIconScale(val);
  }

  function changeIconShadowAngle(val: any): void {
    setIconShadowAngle(val);
  }

  const context = {
    inputText: {
      value: inputText,
      label: "Text input",
      type: "text",
      updateValue: changeInputTextHandler,
    },
    fontSize: {
      value: fontSize,
      label: "Font size",
      type: "range",
      inputMin: 20,
      inputMax: 70,
      inputStep: 1,
      updateValue: changeFontSizeHandler,
    },
    fontWeight: {
      value: fontWeight,
      label: "Font weight",
      type: "range",
      inputMin: 100,
      inputMax: 900,
      inputStep: 100,
      updateValue: changeFontWeightHandler,
    },
    fontStyleItalic: {
      value: fontStyle,
      updateValue: changeFontStyleItalic,
    },
    iconScale: {
      value: iconScale,
      label: "Icon scale",
      type: "range",
      inputMin: 1,
      inputMax: 100,
      inputStep: 1,
      updateValue: changeIconScale,
    },
    iconShadowAngle: {
      value: iconShadowAngle,
      label: "Icon Shadow Angle",
      type: "range",
      inputMin: 0,
      inputMax: 360,
      inputStep: 1,
      updateValue: changeIconShadowAngle,
    },
  };

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
};

export default CanvasContext;
