import "./App.css";
import { useRef, useEffect, useState, useContext } from "react";

// Components
import InputElement from "./components/InputElement/InputElement";
import Tab from "./components/Tab/Tab";
import ColorPicker from "./components/ColorPicker/ColorPicker";

// Store
import CanvasContext from "./store/canvas-context";
import Button from "./components/Button/Button";

// Canvas draw methods
import {
  drawIcon,
  drawText,
  saveCanvasImage,
  drawBorder,
} from "./canvasMethods";

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
  const borderRadius = Number(CanvasCtx.borderRadius.value);
  const panelHeight = Number(CanvasCtx.panelHeight.value);
  const horizontalPositionText = Number(CanvasCtx.horizontalPositionText.value);
  const verticalPositionText = Number(CanvasCtx.verticalPositionText.value);
  const horizontalPositionIcon = Number(CanvasCtx.horizontalPositionIcon.value);
  const verticalPositionIcon = Number(CanvasCtx.verticalPositionIcon.value);

  const [imgSrc, setImageSrc] = useState("");
  const [color, updateColor] = useState("#d94545");
  const [textColor, updateTextColor] = useState("#ffffff");
  const [textBackgroundColor, updateTextBackgroundColor] = useState("#101220");
  const [shadowColor, updateShadowColor] = useState("#982525");
  const [iconColor, updateIconColor] = useState("#ffffff");

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
      iconShadowAngle,
      color,
      shadowColor,
      horizontalPositionIcon,
      verticalPositionIcon,
      iconColor
    );
    drawBorder(canvasRef.current, 5, borderRadius, "green");
  }, [
    iconDisabled,
    iconScale,
    shadowState,
    iconShadowAngle,
    color,
    shadowColor,
    iconColor,
    horizontalPositionIcon,
    verticalPositionIcon,
    panelHeight,
  ]);

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
      iconDisabled,
      horizontalPositionText,
      verticalPositionText,
      textBackgroundColor,
      textColor
    );
    drawBorder(canvasRef.current, 5, borderRadius, "green");
  }, [
    fontStyle,
    fontWeight,
    fontSize,
    fontFamily,
    text,
    iconDisabled,
    horizontalPositionText,
    verticalPositionText,
    panelHeight,
    textBackgroundColor,
    textColor,
  ]);

  // draw border
  useEffect(() => {
    if (!canvasRef.current) return;
    drawBorder(canvasRef.current, 5, borderRadius, "green");
  }, [borderRadius]);

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
          <h3>Text</h3>
          <InputElement inputElementName={InputElementTypes.inputText} />
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
          <InputElement inputElementName={InputElementTypes.fontWeight} />
          <InputElement inputElementName={InputElementTypes.fontSize} />
          <button onClick={() => changeFontStyleItalic()}>Style Italic</button>
          <hr />
          <h3>Icon</h3>
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
          <hr />
        </Tab>
        <Tab title="Effects" opened={openTab}>
          <h3>Shadow</h3>
          <div className="Icon">
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
          <hr />
          <h3>Border</h3>
          <InputElement inputElementName={InputElementTypes.borderRadius} />
        </Tab>
        <Tab title="Colors" opened={openTab}>
          <h3>Text</h3>
          <p>
            Text Color
            <ColorPicker color={textColor} onChangeHandler={updateTextColor} />
          </p>
          <hr />
          <h3>Background</h3>
          <p>
            Icon Background Color
            <ColorPicker
              color={shadowColor}
              onChangeHandler={updateShadowColor}
            />
          </p>
          <p>
            Text Background Color
            <ColorPicker
              color={textBackgroundColor}
              onChangeHandler={updateTextBackgroundColor}
            />
          </p>
          <hr />
          <h3>Icon</h3>
          <p>
            Icon Color
            <ColorPicker color={iconColor} onChangeHandler={updateIconColor} />
          </p>
          <hr />
          <h3>Effects</h3>
          <p>
            Shadow Color
            <ColorPicker color={color} onChangeHandler={updateColor} />
          </p>
          <hr />
        </Tab>
        <Tab title="Positioning" opened={openTab}>
          <h3>General</h3>
          <InputElement inputElementName={InputElementTypes.panelHeight} />
          <hr />
          <h3>Text</h3>
          <InputElement
            inputElementName={InputElementTypes.horizontalPositionText}
          />
          <InputElement
            inputElementName={InputElementTypes.verticalPositionText}
          />
          <hr />
          <h3>Icon</h3>
          <InputElement
            inputElementName={InputElementTypes.horizontalPositionIcon}
          />
          <InputElement
            inputElementName={InputElementTypes.verticalPositionIcon}
          />
        </Tab>
      </div>
      <div className="col demonstration-tab">
        <h2>Live View & Download</h2>
        <p>Check your design and download transparent .PNG panels.</p>
        <div className="canvasWraper">
          <canvas ref={canvasRef} width={320} height={panelHeight} />
        </div>
      </div>
      <a href={imgSrc} download="your-image.png" onClick={saveImage}>
        Save image
      </a>
    </div>
  );
}

export default Styling(App);
