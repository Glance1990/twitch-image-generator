import { ColorPickerProps } from './ColorPicker.props'

// Styles
import Styling from './ColorPicker.styles'

function ColorPicker({
    color,
    onChangeHandler,
    className,
}: ColorPickerProps): JSX.Element {
    return (
        <span className={`${className} color-inputs`}>
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
    )
}

export default Styling(ColorPicker)
