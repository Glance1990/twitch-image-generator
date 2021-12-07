import { useContext } from "react";
import CanvasContext from "../../store/canvas-context";

// Types
import { InputElementProps } from "./InputElement.props";

// Styles
import Styling from "./InputElement.styles";

const InputElement = ({ inputElementName }: InputElementProps) => {
  const CanvasCtx = useContext(CanvasContext);
  console.log(CanvasCtx, inputElementName);

  const { value, label, type, updateValue, inputMin, inputMax, inputStep } =
    CanvasCtx[inputElementName];

  return (
    <label>
      {label}
      <input
        type={type}
        min={inputMin}
        max={inputMax}
        step={inputStep}
        name={inputElementName}
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      />
      {type !== "text" ? <output name={label}>{value}</output> : null}
    </label>
  );
};

export default InputElement;
