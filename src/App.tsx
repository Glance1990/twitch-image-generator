import "./App.css";
import { useRef, useEffect, useState, useContext } from "react";

// Components
import InputElement from "./components/InputElement/InputElement";
import Tab from "./components/Tab/Tab";

// Store
import CanvasContext from "./store/canvas-context";
import Button from "./components/Button/Button";

// Canvas draw methods
import { drawIcon, drawText, saveCanvasImage } from "./canvasMethods";

// Types
import { InputElementTypes } from "./components/InputElement/InputElement.props";
import { ButtonIcons } from "./components/Button/Button.props";

// Styles
import Styling from "./App.styles.js";

import WebFont from "webfontloader";

interface AppProps {
  className: string;
}

function App({ className }: AppProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const CanvasCtx = useContext(CanvasContext);

  const fontStyle = CanvasCtx.fontStyleItalic.value ? "italic" : "";
  const fontWeight = String(CanvasCtx.fontWeight.value);
  const fontSize = CanvasCtx.fontSize.value + "px";
  const text = String(CanvasCtx.inputText.value);
  const iconScale = Number(CanvasCtx.iconScale.value);
  const iconShadowAngle = Number(CanvasCtx.iconShadowAngle.value);

  const [imgSrc, setImageSrc] = useState("");

  // Save image
  const saveImage = () => {
    if (canvasRef.current) {
      saveCanvasImage(canvasRef.current, setImageSrc);
    }
  };

  const [iconDisabled, setIconState] = useState(false);
  const [shadowState, setIconShadowState] = useState(true);

  // draw icon on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    drawIcon(
      canvasRef.current,
      iconDisabled,
      iconScale,
      shadowState,
      iconShadowAngle
    );
  }, [iconDisabled, iconScale, shadowState, iconShadowAngle]);

  const [fontFamily, setFontFamily] = useState("Oswald");

  // draw text on canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    drawText(
      canvasRef.current,
      fontStyle,
      fontWeight,
      fontSize,
      fontFamily,
      text,
      iconDisabled
    );
  }, [fontStyle, fontWeight, fontSize, fontFamily, text, iconDisabled]);

  const [openTab, setTab] = useState("General");

  interface Map {
    [key: string]: string;
  }

  const fontFamilyObj: Map = {
    Oswald: "Oswald",
    Bonbon: "Bonbon",
    Lora: "Lora",
    Roboto: "Roboto",
  };

  const changeFont = (title: string) => {
    WebFont.load({
      google: {
        families: [fontFamilyObj[title]],
      },
      active() {
        setFontFamily(title);
      },
    });
  };

  const changeTab = (title: string) => {
    setTab(title);
  };

  const changeFontStyleItalic = () => {
    CanvasCtx.fontStyleItalic.updateValue(!CanvasCtx.fontStyleItalic.value);
  };

  return (
    <div className={className}>
      <div className="col customize-tab col-xs">
        <h1>Customize</h1>
        <p>Create your custom panel by controling settings in each tab.</p>
        <Button
          title="General"
          clickHandler={changeTab}
          icon={ButtonIcons.settings}
          activeTab={openTab}
        />
        <Button
          title="Effects"
          clickHandler={changeTab}
          icon={ButtonIcons.wand}
          activeTab={openTab}
        />
        <Button
          title="Colors"
          clickHandler={changeTab}
          icon={ButtonIcons.brush}
          activeTab={openTab}
        />
        <Button
          title="Positioning"
          clickHandler={changeTab}
          icon={ButtonIcons.position}
          activeTab={openTab}
        />
        <Tab title="General" opened={openTab}>
          <InputElement inputElementName={InputElementTypes.inputText} />
          <InputElement inputElementName={InputElementTypes.fontSize} />
          <InputElement inputElementName={InputElementTypes.fontWeight} />
          <div className="select-wrapper">
            <label htmlFor="fontFamily">Font Family</label>
            <select
              id="fontFamily"
              onChange={(e) => changeFont(e.target.value)}
              value={fontFamily}
            >
              <option value="Oswald">Oswald</option>
              <option value="Bonbon">Bonbon</option>
              <option value="Lora">Lora</option>
              <option value="Roboto">Roboto</option>
            </select>
          </div>
          <button onClick={() => changeFontStyleItalic()}>Style Italic</button>
          <div className="Icon">
            <span>Icon </span>
            <label>
              Disable Icon{" "}
              <input
                type="checkbox"
                onChange={(e) => setIconState(e.target.checked)}
              />
            </label>
          </div>
          <InputElement inputElementName={InputElementTypes.iconScale} />
          <div className="Icon">
            <span>Sahdow </span>
            <label>
              Enable Icon Shadow
              <input
                type="checkbox"
                checked={shadowState}
                onChange={(e) => setIconShadowState(e.target.checked)}
              />
            </label>
          </div>
          <InputElement inputElementName={InputElementTypes.iconShadowAngle} />
        </Tab>
        <Tab title="Effects" opened={openTab}>
          <InputElement inputElementName={InputElementTypes.inputText} />
          <InputElement inputElementName={InputElementTypes.fontSize} />
        </Tab>
        <Tab title="Colors" opened={openTab}>
          <InputElement inputElementName={InputElementTypes.inputText} />
          <InputElement inputElementName={InputElementTypes.fontSize} />
          <InputElement inputElementName={InputElementTypes.fontWeight} />
          <InputElement inputElementName={InputElementTypes.fontWeight} />
          <InputElement inputElementName={InputElementTypes.fontWeight} />
        </Tab>
        <Tab title="Positioning" opened={openTab}>
          <InputElement inputElementName={InputElementTypes.inputText} />
          <InputElement inputElementName={InputElementTypes.fontSize} />
          <InputElement inputElementName={InputElementTypes.inputText} />
          <InputElement inputElementName={InputElementTypes.fontSize} />
        </Tab>
      </div>
      <div className="col demonstration-tab">
        <h2>Live View & Download</h2>
        <p>Check your design and download transparent .PNG panels.</p>
        <div className="canvasWraper">
          <canvas ref={canvasRef} width={320} height={85} />
        </div>
      </div>
      <a href={imgSrc} download="your-image.png" onClick={saveImage}>
        Save image
      </a>
    </div>
  );
}

export default Styling(App);
