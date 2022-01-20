import { ColorPickerProps } from "./ColorPicker.props";

// Styles
import Styling from "./ColorPicker.styles";

const ColorPicker = ({
  color,
  onChangeHandler,
}: ColorPickerProps): JSX.Element => {
  return (
    <span>
      <input
        type="color"
        value={color}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <input
        type="text"
        value={color}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
    </span>
  );
};

export default Styling(ColorPicker);
