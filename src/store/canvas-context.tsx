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
  borderRadius: inputItem;
  horizontalPositionText: inputItem;
  verticalPositionText: inputItem;
  horizontalPositionIcon: inputItem;
  verticalPositionIcon: inputItem;
  panelHeight: inputItem;
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
  borderRadius: {
    value: 0,
    label: "Border Radius (%)",
    type: "range",
    inputMin: 0,
    inputMax: 120,
    inputStep: 1,
    updateValue: (val) => {},
  },
  panelHeight: {
    value: 85,
    label: "Panel Height",
    type: "range",
    inputMin: 60,
    inputMax: 85,
    inputStep: 1,
    updateValue: (val) => {},
  },
  horizontalPositionText: {
    value: 0,
    label: "Horizontal Position",
    type: "range",
    inputMin: -10,
    inputMax: 150,
    inputStep: 1,
    updateValue: (val) => {},
  },
  verticalPositionText: {
    value: 0,
    label: "Vertical Position",
    type: "range",
    inputMin: -40,
    inputMax: 40,
    inputStep: 1,
    updateValue: (val) => {},
  },
  horizontalPositionIcon: {
    value: 0,
    label: "Horizontal Position Offset",
    type: "range",
    inputMin: -50,
    inputMax: 50,
    inputStep: 1,
    updateValue: (val) => {},
  },
  verticalPositionIcon: {
    value: 0,
    label: "Vertical Position Offset",
    type: "range",
    inputMin: -50,
    inputMax: 50,
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
  const [borderRadius, setBorderRadius] = useState(0);
  const [horizontalPositionText, setHorizontalPositionText] = useState(0);
  const [verticalPositionText, setVerticalPositionText] = useState(0);
  const [horizontalPositionIcon, setHorizontalPositionIcon] = useState(-20);
  const [verticalPositionIcon, setVerticalPositionIcon] = useState(0);
  const [panelHeight, setPanelHeight] = useState(85);

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

  function changeBorderRadius(val: any): void {
    setBorderRadius(val);
  }

  function changePanelHeight(val: any): void {
    setPanelHeight(val);
  }

  function changeHorizontalPositionText(val: any): void {
    setHorizontalPositionText(val);
  }

  function changeVerticalPositionText(val: any): void {
    setVerticalPositionText(val);
  }

  function changeHorizontalPositionIcon(val: any): void {
    setHorizontalPositionIcon(val);
  }

  function changeVerticalPositionIcon(val: any): void {
    setVerticalPositionIcon(val);
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
    borderRadius: {
      value: borderRadius,
      label: "Border Radius (%)",
      type: "range",
      inputMin: 0,
      inputMax: 120,
      inputStep: 1,
      updateValue: changeBorderRadius,
    },
    panelHeight: {
      value: panelHeight,
      label: "Panel Height",
      type: "range",
      inputMin: 60,
      inputMax: 85,
      inputStep: 1,
      updateValue: changePanelHeight,
    },
    horizontalPositionText: {
      value: horizontalPositionText,
      label: "Horizontal Position",
      type: "range",
      inputMin: -10,
      inputMax: 150,
      inputStep: 1,
      updateValue: changeHorizontalPositionText,
    },
    verticalPositionText: {
      value: verticalPositionText,
      label: "Vertical Position",
      type: "range",
      inputMin: -40,
      inputMax: 40,
      inputStep: 1,
      updateValue: changeVerticalPositionText,
    },
    horizontalPositionIcon: {
      value: horizontalPositionIcon,
      label: "Horizontal Position Offset",
      type: "range",
      inputMin: -50,
      inputMax: 50,
      inputStep: 1,
      updateValue: changeHorizontalPositionIcon,
    },
    verticalPositionIcon: {
      value: verticalPositionIcon,
      label: "Vertical Position Offset",
      type: "range",
      inputMin: -50,
      inputMax: 50,
      inputStep: 1,
      updateValue: changeVerticalPositionIcon,
    },
  };

  return (
    <CanvasContext.Provider value={context}>{children}</CanvasContext.Provider>
  );
};

export default CanvasContext;
